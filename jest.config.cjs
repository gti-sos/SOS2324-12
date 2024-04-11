module.exports = {
    preset: 'jest-playwright-preset',
    testMatch: ["<rootDir>/tests/jest/**/*.test.cjs"],
    testEnvironment: "node",
    setupFilesAfterEnv: ["expect-playwright"],
    coverageDirectory: "coverage",
    collectCoverage: true,
    collectCoverageFrom: [
        "<rootDir>/tests/jest/**/*.test.cjs", 
    ],
  };
  