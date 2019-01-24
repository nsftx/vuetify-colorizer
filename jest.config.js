module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js}',
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
