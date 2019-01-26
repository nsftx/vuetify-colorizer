module.exports = {
  collectCoverage: true,
  coverageDirectory: './test/coverage',
  collectCoverageFrom: [
    'src/**/*.{js}',
  ],
  coverageReporters: [
    'text',
    'lcov',
    'json',
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'vue',
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  snapshotSerializers: [
    'jest-serializer-vue',
  ],
  testMatch: [
    '**/src/**/*.spec.(js|jsx|ts|tsx)',
  ],
  testURL: 'http://localhost/',
};
