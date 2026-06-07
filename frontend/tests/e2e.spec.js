import { test, expect } from "@playwright/test";

/**
 * URL base del sistema bajo prueba.
 * Se puede sobreescribir mediante variable de entorno PLAYWRIGHT_BASE_URL.
 */
const BASE_URL =
    process.env.PLAYWRIGHT_BASE_URL || "https://conexion-local.vercel.app";

/**
 * Credenciales del usuario de prueba.
 * Se pueden sobreescribir mediante variables de entorno.
 */
const DEFAULT_EMAIL =
    process.env.PLAYWRIGHT_USER_EMAIL || "alemerchann@gmail.com";
const DEFAULT_PASSWORD = process.env.PLAYWRIGHT_USER_PASSWORD || "159753";

/**
 * Función auxiliar de inicio de sesión reutilizable entre pruebas.
 * Navega al login, completa las credenciales y verifica que el enlace
 * "Mi panel" sea visible en el navbar como confirmación de sesión activa.
 *
 * @param {import('@playwright/test').Page} page - Página de Playwright
 * @param {string} correo - Correo del usuario
 * @param {string} password - Contraseña del usuario
 */
async function login(
    page,
    correo = DEFAULT_EMAIL,
    password = DEFAULT_PASSWORD,
) {
    await page.goto(`${BASE_URL}/login`);
    await expect(page.locator('input[name="correo"]')).toBeVisible({
        timeout: 15000,
    });
    await page.fill('input[name="correo"]', correo);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    // Render (plan gratuito) puede tardar hasta 50s en despertar — timeout extendido
    await expect(page.locator('a[href="/dashboard"]')).toBeVisible({
        timeout: 60000,
    });
}

/**
 * PE-01: Registro e inicio de sesión
 * Verifica que un usuario nuevo puede registrarse y luego iniciar sesión
 * correctamente, con sesión persistida en el navbar.
 */
test("PE-01: Registro e inicio de sesión", async ({ page }) => {
    const email = `test${Date.now()}@test.com`;
    const password = "123456";

    // Paso 1-3: Navegar a /registro y completar el formulario
    await page.goto(`${BASE_URL}/registro`);
    await expect(page.locator('input[name="nombre"]')).toBeVisible({
        timeout: 15000,
    });
    await page.fill('input[name="nombre"]', "Usuario Test");
    await page.fill('input[name="correo"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    // Paso 4: Verificar redirección automática al login tras el registro
    await expect(page.locator("h1")).toHaveText("Bienvenido de nuevo", {
        timeout: 15000,
    });

    // Paso 5: Iniciar sesión con las credenciales recién registradas
    await page.fill('input[name="correo"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    // Verificar que el enlace "Mi panel" aparece en el navbar (sesión activa)
    await expect(page.locator('a[href="/dashboard"]')).toBeVisible({
        timeout: 60000,
    });
});

/**
 * PE-02: Creación y búsqueda de negocio
 * Verifica que un usuario autenticado puede crear un negocio y que este
 * aparece correctamente en el listado al buscarlo por nombre.
 */
test("PE-02: Creación y búsqueda de negocio", async ({ page }) => {
    // Paso 1: Iniciar sesión
    await login(page);

    // Paso 2: Crear un negocio con nombre y categoría
    await page.goto(`${BASE_URL}/negocios/nuevo`);
    await expect(page.locator('input[name="nombre"]')).toBeVisible({
        timeout: 10000,
    });
    await page.fill('input[name="nombre"]', "Negocio Playwright");
    await page.selectOption('select[name="categoria"]', "Tecnología");
    await page.click('button[type="submit"]');

    // Paso 3: Esperar redirección automática al listado de negocios
    await page.waitForURL(`${BASE_URL}/negocios`, { timeout: 8000 });

    // Paso 4: Buscar el negocio por nombre y verificar que aparece en resultados
    await page.fill('input[placeholder*="Buscar"]', "Negocio Playwright");
    await page.waitForTimeout(500); // Esperar el debounce de 300ms
    await expect(page.locator("text=Negocio Playwright").first()).toBeVisible();
});

/**
 * PE-03: Gestión de disponibilidad de producto
 * Verifica que un vendedor puede crear un producto agotado, ver su etiqueta
 * visual correspondiente, editarlo a disponible y confirmar el cambio en UI.
 */
test("PE-03: Gestión de disponibilidad de producto", async ({ page }) => {
    // Paso 1: Iniciar sesión
    await login(page);

    // Crear negocio de prueba para asociar el producto
    await page.goto(`${BASE_URL}/negocios/nuevo`);
    await page.fill('input[name="nombre"]', "Negocio PE03");
    await page.selectOption('select[name="categoria"]', "Tecnología");
    await page.click('button[type="submit"]');
    await page.waitForURL(`${BASE_URL}/negocios`, { timeout: 8000 });

    // Paso 2: Crear producto con disponibilidad en estado agotado
    await page.goto(`${BASE_URL}/productos/nuevo`);
    // Esperar a que el selector de negocios se pueble con datos del servidor
    await page.waitForFunction(() => {
        const sel = document.querySelector('select[name="negocioId"]');
        return sel && sel.options.length > 1;
    });
    await page.fill('input[name="nombre"]', "Producto PE03");
    await page.fill('input[name="precio"]', "5000");
    await page.selectOption('select[name="negocioId"]', {
        label: "Negocio PE03",
    });
    // Desmarcar el checkbox para registrar el producto como agotado
    const checkbox = page.locator('input[name="disponible"]');
    if (await checkbox.isChecked()) await checkbox.uncheck();
    await page.click('button[type="submit"]');
    await page.waitForURL(`${BASE_URL}/productos`, { timeout: 8000 });

    // Paso 3: Verificar que la etiqueta "Agotado" es visible en el listado
    await expect(page.locator("text=Agotado").first()).toBeVisible({
        timeout: 5000,
    });

    // Paso 4: Editar el producto cambiando su disponibilidad a disponible
    await page.locator('a[href*="/editar"]').first().click();
    const checkboxEdit = page.locator('input[name="disponible"]');
    if (!(await checkboxEdit.isChecked())) await checkboxEdit.check();
    await page.click('button[type="submit"]');
    await page.waitForURL(`${BASE_URL}/productos`, { timeout: 8000 });

    // Paso 5: Verificar que la etiqueta cambió a "Disponible"
    await expect(page.locator("text=Disponible").first()).toBeVisible({
        timeout: 5000,
    });
});
