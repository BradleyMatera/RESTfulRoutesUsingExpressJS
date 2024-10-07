module.exports = {
  testMatch: ["**/?(*.)+(test).[jt]s?(x)"], // Looks for any test file ending with .test.js or .test.jsx
  testPathIgnorePatterns: ["/node_modules/", "/dist/"], // Ignore node_modules and dist folders
  moduleFileExtensions: ["js", "json", "jsx"], // Supported file extensions for imports in tests
  collectCoverage: true, // Collect test coverage
  coverageDirectory: "coverage", // Output directory for coverage
  coverageReporters: ["text", "lcov"], // Format for coverage report
  testEnvironment: "node", // Set test environment to Node.js
  
};