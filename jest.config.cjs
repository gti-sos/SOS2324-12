module.exports = {
    preset: 'jest-playwright-preset',
    testMatch: ['**/tests/e2e/**/*.test.cjs'],
    testEnvironment: "node",
    setupFilesAfterEnv: ["expect-playwright"],
    coverageDirectory: "coverage",
    collectCoverage: true,
    collectCoverageFrom: [
        "**/tests/e2e/**/*.test.cjs", 
    ],
  };
  