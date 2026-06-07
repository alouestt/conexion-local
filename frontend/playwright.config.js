import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "./tests",
    timeout: 120000, // 2 min por test — Render puede tardar ~50s en despertar
    use: {
        headless: true,
        screenshot: "only-on-failure",
        video: "retain-on-failure",
    },
    reporter: [["list"], ["html", { open: "never" }]],
});
