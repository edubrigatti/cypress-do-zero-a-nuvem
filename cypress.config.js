const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {   
    baseUrl: 'http://127.0.0.1:8080/src/index.html'
  },
})


