const request = require("supertest");
const app = require("../app");
const sequelize = require("../config/database");

let token;

beforeAll(async () => {
    await sequelize.sync({ force: true });

    await request(app).post("/api/register").send({
        nombre: "María Test",
        correo: "maria@test.com",
        password: "abc123",
    });

    const res = await request(app).post("/api/login").send({
        correo: "maria@test.com",
        password: "abc123",
    });
    token = res.body.token;
});

afterAll(async () => {
    await sequelize.close();
});

// ── API raíz ──────────────────────────────────────────────────────────────────

describe("GET /", () => {
    test("responde con estado 200", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
    });
});

// ── Autenticación ─────────────────────────────────────────────────────────────

describe("POST /api/register", () => {
    test("registra un usuario nuevo exitosamente", async () => {
        const res = await request(app).post("/api/register").send({
            nombre: "Usuario Nuevo",
            correo: "nuevo@test.com",
            password: "abc123",
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.id).toBeDefined();
        expect(res.body.message).toMatch(/registrado/i);
    });

    test("rechaza correo duplicado con 409", async () => {
        await request(app).post("/api/register").send({
            nombre: "Duplicado",
            correo: "dup@test.com",
            password: "abc123",
        });
        const res = await request(app).post("/api/register").send({
            nombre: "Duplicado2",
            correo: "dup@test.com",
            password: "abc123",
        });
        expect(res.statusCode).toBe(409);
        expect(res.body.error).toMatch(/correo/i);
    });
});

describe("POST /api/login", () => {
    test("inicia sesión con credenciales correctas", async () => {
        const res = await request(app).post("/api/login").send({
            correo: "maria@test.com",
            password: "abc123",
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.usuario).toBeDefined();
        expect(res.body.token).toBeDefined();
    });

    test("retorna 401 con contraseña incorrecta", async () => {
        const res = await request(app).post("/api/login").send({
            correo: "maria@test.com",
            password: "incorrecta",
        });
        expect(res.statusCode).toBe(401);
    });

    test("retorna 404 con usuario inexistente", async () => {
        const res = await request(app).post("/api/login").send({
            correo: "noexiste@test.com",
            password: "abc123",
        });
        expect(res.statusCode).toBe(404);
    });
});

// ── Negocios ──────────────────────────────────────────────────────────────────

describe("Negocios", () => {
    test("GET /api/negocios retorna un array", async () => {
        const res = await request(app).get("/api/negocios");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("POST /api/negocios crea un negocio con categoría", async () => {
        const res = await request(app)
            .post("/api/negocios")
            .set("Authorization", `Bearer ${token}`)
            .send({
                nombre: "Tienda Test",
                descripcion: "Negocio de prueba",
                categoria: "Tecnología",
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.negocio).toBeDefined();
        expect(res.body.negocio.categoria).toBe("Tecnología");
    });

    test("GET /api/negocios?nombre= filtra correctamente", async () => {
        const res = await request(app).get("/api/negocios?nombre=Tienda");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    test("GET /api/negocios?categoria= filtra por categoría", async () => {
        const res = await request(app).get(
            "/api/negocios?categoria=Tecnolog%C3%ADa",
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    test("GET /api/negocios/:id retorna el negocio", async () => {
        const created = await request(app)
            .post("/api/negocios")
            .set("Authorization", `Bearer ${token}`)
            .send({ nombre: "Negocio ID Test", descripcion: "desc" });
        const id = created.body.negocio.id;
        const res = await request(app).get(`/api/negocios/${id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBe(id);
    });

    test("GET /api/negocios/:id retorna 404 si no existe", async () => {
        const res = await request(app).get("/api/negocios/99999");
        expect(res.statusCode).toBe(404);
    });
});

// ── Productos ─────────────────────────────────────────────────────────────────

describe("Productos", () => {
    let negocioId;

    beforeAll(async () => {
        const res = await request(app)
            .post("/api/negocios")
            .set("Authorization", `Bearer ${token}`)
            .send({ nombre: "Negocio para Productos", descripcion: "test" });
        negocioId = res.body.negocio.id;
    });

    test("GET /api/productos retorna un array", async () => {
        const res = await request(app).get("/api/productos");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("POST /api/productos crea un producto disponible", async () => {
        const res = await request(app)
            .post("/api/productos")
            .set("Authorization", `Bearer ${token}`)
            .send({ nombre: "Café orgánico", precio: 15000, negocioId, disponible: true });
        expect(res.statusCode).toBe(200);
        expect(res.body.producto.disponible).toBe(true);
    });

    test("POST /api/productos crea un producto agotado", async () => {
        const res = await request(app)
            .post("/api/productos")
            .set("Authorization", `Bearer ${token}`)
            .send({ nombre: "Producto agotado", precio: 8000, negocioId, disponible: false });
        expect(res.statusCode).toBe(200);
        expect(res.body.producto.disponible).toBe(false);
    });

    test("PUT /api/productos/:id actualiza disponibilidad", async () => {
        const created = await request(app)
            .post("/api/productos")
            .set("Authorization", `Bearer ${token}`)
            .send({ nombre: "Producto editable", precio: 3000, negocioId, disponible: true });
        const id = created.body.producto.id;
        const res = await request(app)
            .put(`/api/productos/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ nombre: "Producto editable", precio: 3000, negocioId, disponible: false });
        expect(res.statusCode).toBe(200);
        expect(res.body.producto.disponible).toBe(false);
    });
});
