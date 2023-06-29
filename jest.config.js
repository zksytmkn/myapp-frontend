module.exports = {
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: [
    'js',
    'vue',
    'json'
  ],
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.js$": "babel-jest"
  },
  globals: {
    "vue-jest": {
      esModule: true,
      pug: {
        doctype: 'html'
      },
      compiler: require('vue-template-compiler')
    }
  },
  transformIgnorePatterns: [
    "/node_modules/(?!vue|vue-router|vuex|vuex-persist|@nuxtjs)",
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue'
  ],
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/__tests__/setup.js'],
  testMatch: ['<rootDir>/__tests__/**/?(*.)+(spec|test).[jt]s?(x)'],
}
