module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
    },
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
};
