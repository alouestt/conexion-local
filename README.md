# ConexiónLocal

**ConexiónLocal** es una plataforma web orientada a fortalecer la visibilidad digital de micronegocios locales en la ciudad de Medellín, permitiendo a los comerciantes registrar sus negocios y productos, y a los usuarios descubrirlos mediante herramientas de búsqueda geográfica e interacción.

---

## Descripción del proyecto

El proyecto surge como respuesta a la brecha digital que afecta a pequeños comerciantes, quienes, a pesar de ofrecer productos y servicios de calidad, no cuentan con presencia en canales digitales. ConexiónLocal propone una solución tecnológica accesible que facilita la conexión entre consumidores y negocios locales.

La plataforma permite registrar negocios, publicar productos, gestionar reseñas, y visualizar ubicaciones en un mapa interactivo, promoviendo así el desarrollo económico local mediante el uso de tecnologías web.

---

## Objetivos

### Objetivo general

Desarrollar una aplicación web que permita a los micronegocios locales mejorar su visibilidad digital y facilitar la interacción con potenciales clientes.

### Objetivos específicos

- Implementar un sistema de autenticación seguro mediante JWT.
- Desarrollar funcionalidades CRUD para negocios y productos.
- Integrar servicios de geolocalización para búsqueda de negocios cercanos.
- Permitir la gestión de reseñas por parte de los usuarios.
- Desplegar la aplicación en un entorno accesible en la nube.

---

## Funcionalidades principales

### Implementadas

- Registro e inicio de sesión de usuarios
- Consulta, creación y edición de negocios (con campo de categoría)
- Búsqueda de negocios por nombre y categoría con filtros en tiempo real
- Consulta, creación y edición de productos (con selector de negocio y disponibilidad)
- Gestión de disponibilidad de productos (disponible / agotado)
- Exploración pública del catálogo de negocios y productos sin necesidad de registro
- Mapa interactivo de negocios (Leaflet + OpenStreetMap, datos de demostración)
- Panel de usuario autenticado (dashboard)
- Rutas protegidas por autenticación; acciones de gestión ocultas a visitantes

### Planificadas

- Eliminación de negocios y productos
- Mapa conectado a la base de datos real
- Sistema de reseñas y calificaciones
- Panel de administración
- Carga de imágenes mediante Cloudinary
- Gestión de pedidos

---

## Tecnologías utilizadas

### Backend

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT (autenticación)
- Bcrypt (encriptación de contraseñas)

### Frontend

- React 18
- Vite
- React Router DOM
- Leaflet + React Leaflet (mapas interactivos)
- Axios (cliente HTTP)
- Context API (gestión de estado y autenticación)

### Herramientas y servicios

- Docker
- GitHub / GitHub Actions (CI/CD)
- Postman
- Figma
- Cloudinary
- Render / Railway (despliegue)
- Jest + Supertest (pruebas de integración)

---

## Estructura del proyecto

```bash
conexion-local/
│── backend/
│   ├── src/
│   │   ├── __tests__/
│   │   │   └── app.test.js
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── negocioController.js
│   │   │   └── productoController.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Negocio.js
│   │   │   └── Producto.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── negocioRoutes.js
│   │   │   └── productoRoutes.js
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Negocios.jsx
│   │   │   ├── CrearNegocio.jsx
│   │   │   ├── EditarNegocio.jsx
│   │   │   ├── Productos.jsx
│   │   │   ├── CrearProducto.jsx
│   │   │   ├── EditarProducto.jsx
│   │   │   └── MapaNegocios.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   ├── pages.css
│   │   │   ├── lista.css
│   │   │   ├── Navbar.css
│   │   │   ├── Home.css
│   │   │   ├── Dashboard.css
│   │   │   └── MapaNegocios.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
│── README.md
```

## Endpoints de la API

### Autenticación

| Método | Ruta            | Descripción         |
| ------ | --------------- | ------------------- |
| POST   | `/api/register` | Registro de usuario |
| POST   | `/api/login`    | Inicio de sesión    |

### Negocios

| Método | Ruta                               | Descripción                                                    |
| ------ | ---------------------------------- | -------------------------------------------------------------- |
| GET    | `/api/negocios`                    | Listar todos los negocios                                      |
| GET    | `/api/negocios?nombre=&categoria=` | Filtrar negocios por nombre y/o categoría                      |
| GET    | `/api/negocios/:id`                | Obtener un negocio por ID                                      |
| POST   | `/api/negocios`                    | Crear un negocio (acepta `nombre`, `descripcion`, `categoria`) |
| PUT    | `/api/negocios/:id`                | Editar un negocio                                              |

### Productos

| Método | Ruta                 | Descripción                                                              |
| ------ | -------------------- | ------------------------------------------------------------------------ |
| GET    | `/api/productos`     | Listar todos los productos                                               |
| GET    | `/api/productos/:id` | Obtener un producto por ID                                               |
| POST   | `/api/productos`     | Crear un producto (acepta `nombre`, `precio`, `negocioId`, `disponible`) |
| PUT    | `/api/productos/:id` | Editar un producto (incluye actualización de disponibilidad)             |

---

## Instalación y ejecución

### Requisitos previos

- Node.js (v18 o superior)
- PostgreSQL
- Docker (opcional)

### Pasos

1. Clonar el repositorio:

```bash
git clone https://github.com/alouestt/conexion-local.git
cd conexion-local
```

2. Configurar variables de entorno del backend:

```bash
# Editar backend/.env con las credenciales de la base de datos
DB_NAME=conexion_local
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_DIALECT=postgres
JWT_SECRET=tu_clave_secreta
```

3. Instalar dependencias e iniciar el backend:

```bash
cd backend
npm install
npm run dev
```

El servidor quedará disponible en `http://localhost:3000`.

4. En otra terminal, instalar dependencias e iniciar el frontend:

```bash
cd frontend
npm install
npm run dev
```

5. Acceder a la aplicación:

```
http://localhost:5173
```

---

## Pruebas

El backend cuenta con pruebas de integración usando **Jest** y **Supertest**, que cubren los endpoints de autenticación, negocios y productos contra una base de datos real de prueba.

Para ejecutar las pruebas localmente:

```bash
cd backend
npm test
```

Para ejecutar con reporte de cobertura:

```bash
npm test -- --coverage
```

Se requiere tener PostgreSQL corriendo y las variables de entorno configuradas. El umbral mínimo de cobertura de líneas es del 60 %.

---

## CI/CD

El proyecto usa **GitHub Actions** para integración y entrega continua. El pipeline se activa en cada push o pull request a la rama `main` y ejecuta dos jobs en paralelo:

- **Backend**: instala dependencias, ejecuta ESLint y corre las pruebas con cobertura (requiere un servicio PostgreSQL).
- **Frontend**: instala dependencias, ejecuta ESLint y genera el build de producción.

El archivo de configuración se encuentra en [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

---

## Seguridad

El sistema implementa buenas prácticas de seguridad:

- Autenticación basada en JWT
- Encriptación de contraseñas con bcrypt
- Validación de datos con Joi
- Protección contra inyecciones SQL mediante Sequelize
- Rate limiting en endpoints públicos

---

## Metodología

El desarrollo del proyecto se basa en la metodología ágil Scrum, organizada en 6 Sprints de 2 semanas cada uno, lo que permite la entrega incremental de funcionalidades y la adaptación continua a los cambios.

---

## Despliegue

El proyecto está diseñado para ser desplegado en plataformas como:

- Render
- Railway

---

## Equipo de trabajo

- Product Owner
- Scrum Master
- Equipo de desarrollo (Full Stack)

---

## Licencia

Este proyecto se desarrolla con fines académicos.

---
