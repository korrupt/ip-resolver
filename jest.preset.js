const nxPreset = require('@nx/jest/preset').default;

module.exports = { ...nxPreset, coveragePathIgnorePatterns: ['.*\.entity\.ts', '.*\/index\.ts'] };
