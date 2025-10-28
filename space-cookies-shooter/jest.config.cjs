module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/tests'],
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@entities/(.*)$': '<rootDir>/src/entities/$1',
    '^@systems/(.*)$': '<rootDir>/src/systems/$1',
    '^@ui/(.*)$': '<rootDir>/src/ui/$1',
    '^@scenes/(.*)$': '<rootDir>/src/scenes/$1'
  }
};
