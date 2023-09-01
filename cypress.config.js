const { defineConfig } = require('cypress');

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'https://notes-serverless-app.com',
    env: {
      viewportWidthBreakpoint: 768,
    },
    requestTimeout: 10000,
    video: false,
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
  },
});
