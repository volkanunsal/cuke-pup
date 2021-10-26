module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
      isolatedModules: true,
    },
  },
  roots: ['./src'],
  moduleDirectories: ['src', 'node_modules'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  moduleNameMapper: {},
  transform: {
    '^.+\\.(ts|js)x?$': 'ts-jest',
  },
  transformIgnorePatterns: [],
};
