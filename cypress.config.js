const { defineConfig } = require('cypress');
const fs = require('fs-extra');
const mochawesome = require('cypress-mochawesome-reporter/plugin');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    jsonDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    embeddedScreenshots: true,
    saveAllAttempts: false,
  },
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    supportFile: 'cypress/support/e2e.js',
    video: true,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      const { beforeRunHook } = require('cypress-mochawesome-reporter/lib');
      on('before:run', async (details) => {
        beforeRunHook(details);

        const reportsPath = 'cypress/reports/mochawesome';
        if (!fs.existsSync(reportsPath)) {
          await fs.mkdirp(reportsPath);
        }
        await fs.emptyDir(reportsPath);
        console.log('Pasta de reports limpa antes de rodar os testes!');

        const screenshotsPath = 'cypress/screenshots';
        if (!fs.existsSync(screenshotsPath)) {
          await fs.mkdirp(screenshotsPath);
        }
        await fs.emptyDir(screenshotsPath);
        console.log('Pasta de screenshots limpa antes de rodar os testes!');
      });
      return mochawesome(on, config);
    },
  },
  browser: 'chrome'
});
