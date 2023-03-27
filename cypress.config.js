const { defineConfig } = require("cypress")
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor")
const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://staging.lpitko.ru",
    //baseUrl: "http://santa-secret.ru",
    testIsolation: false,
    watchForFileChanges: false,
    pageLoadTimeout: 3000000,
    defaultCommandTimeout: 1000000,
    specPattern: "**/*.feature",
    setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      })
      on("file:preprocessor", bundler)
      addCucumberPreprocessorPlugin(on, config)

      return config
    },
  },
})
