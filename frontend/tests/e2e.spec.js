import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || "https://conexion-local.vercel.app";
const DEFAULT_EMAIL = process.env.PLAYWRIGHT_USER_EMAIL || "alemerchann@gmail.com";
const DEFAULT_PASSWORD = process.env.PLAYWRIGHT_USER_PASSWORD || "";

async function login(
    page,
    correo = DEFAULT_EMAIL,
    password = DEFAULT_PASSWORD,
) {
    await page.goto(`${BASE_URL}/login`);
    // Esperar a que el formulario esté listo
    await expect(page.locator('input[name="correo"]')).toBeVisible({
        timeout: 15000,
    });
    await page.fill('input[name="correo"]', correo);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    // Render puede tardar hasta 50s en despertar — aumentamos timeout
    await expect(page.locator('a[href="/dashboard"]')).toBeVisible({
        timeout: 60000,
    });
}

test("PE-01: Registro e inicio de sesión", async ({ page }) => {
    // Registro con usuario nuevo
    const email = `test${Date.now()}@test.com`;
    const password = "123456";

    await page.goto(`${BASE_URL}/registro`);
    await expect(page.locator('input[name="nombre"]')).toBeVisible({
        timeout: 15000,
    });
    await page.fill('input[name="nombre"]', "Usuario Test");
    await page.fill('input[name="correo"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    // Esperar redirección al login
    await expect(page.locator("h1")).toHaveText("Bienvenido de nuevo", {
        timeout: 15000,
    });

    // Login con el usuario recién creado
    await page.fill('input[name="correo"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    // Verificar que el login fue exitoso
    await expect(page.locator('a[href="/dashboard"]')).toBeVisible({
        timeout: 60000,
    });
});

test("PE-02: Creación y búsqueda de negocio", async ({ page }) => {
    await login(page);

    await page.goto(`${BASE_URL}/negocios/nuevo`);
    await expect(page.locator('input[name="nombre"]')).toBeVisible({
        timeout: 10000,
    });
    await page.fill('input[name="nombre"]', "Negocio Playwright");
    await page.selectOption('select[name="categoria"]', "Tecnología");
    await page.click('button[type="submit"]');

    await page.waitForURL(`${BASE_URL}/negocios`, { timeout: 8000 });
    await page.fill('input[placeholder*="Buscar"]', "Negocio Playwright");
    await page.waitForTimeout(500);
    await expect(page.locator("text=Negocio Playwright").first()).toBeVisible();
});

test("PE-03: Gestión de disponibilidad de producto", async ({ page }) => {
    await login(page);

    await page.goto(`${BASE_URL}/productos`);
    await expect(page.locator('.badge, [class*="badge"]').first()).toBeVisible({
        timeout: 10000,
    });
});
