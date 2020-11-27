module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!src/utils/*',
    '!src/mock/**',
    '!src/tests/**',
    '!**/node_modules/**'
  ],
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  coverageDirectory: '<rootDir>/test/unit/coverage',
}
