const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");

module.exports = {
  preset: "jest-preset-angular",
  roots: ["<rootDir>/src/"],
  testMatch: ["**/+(*.)+(spec).+(ts)"],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/file-mock.js",
    "@store/(.*)": "<rootDir>/src/app/store/$1",
    "@core/(.*)": "<rootDir>/src/app/core/$1",
    "@shared/(.*)": "<rootDir>/src/app/shared/$1",
    "@env": "<rootDir>/__mocks__/@env/index.ts",
  },
  testPathIgnorePatterns: ["node_modules"],
  transformIgnorePatterns: ["node_modules/(?!@ngrx)", "^.+\\.js$"],
  transform: {
    "^.+\\.(ts|js|html)$": "ts-jest",
  },
  globals: {
    __PATH_PREFIX__: "",
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.html$",
      astTransformers: [
        "jest-preset-angular/build/InlineFilesTransformer",
        "jest-preset-angular/build/StripStylesTransformer",
      ],
    },
  },
  snapshotSerializers: [
    "jest-preset-angular/build/AngularSnapshotSerializer.js",
    "jest-preset-angular/build/HTMLCommentSerializer.js",
  ],
  setupFiles: [],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js", "<rootDir>/src/test.ts"],

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ["lcov", "text-summary"],

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
