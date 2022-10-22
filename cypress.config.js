const { defineConfig } = require("cypress");
const { name: projectId } = require("./package.json");

module.exports = defineConfig({
  projectId,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
