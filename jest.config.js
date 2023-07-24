/** @returns {Promise<import('jest').Config>} */
module.exports = {
  rootDir: "./",
  projects: ["<rootDir>/packages/*/jest.config.js"],
  coverageDirectory: "<rootDir>/coverage/",
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
};
