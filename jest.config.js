/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  setupFilesAfterEnv: ['./tooling/setupTests.ts'],
  modulePathIgnorePatterns: ['e2e'],
  moduleNameMapper: {
    '^@shared(.*)$': '<rootDir>/shared/$1',
    'package.json': '<rootDir>/package.json',
  },
};
