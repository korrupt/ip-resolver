
/* eslint-disable */
export default {
  displayName: 'api-e2e',
  preset: '../../jest.preset.js',
  setupFiles: ['<rootDir>/src/support/test-setup.ts'],
  globalSetup: '<rootDir>/src/support/global-setup-standalone.ts',
  testEnvironment: 'node',
  testSequencer: '<rootDir>/src/support/sequencer.js',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/api-e2e',
  verbose: true,
};
