import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "__test__"
  ],
  coverageDirectory: "./coverage",
  testEnvironment: "node"
};

export default config;