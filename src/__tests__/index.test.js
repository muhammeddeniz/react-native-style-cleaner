const { findUnusedStyles } = require("../styleChecker");

describe("Style Checker Tests", () => {
  test("findUnusedStyles function should return an array", () => {
    const result = findUnusedStyles("./test-fixtures/App.js");
    expect(Array.isArray(result)).toBe(true);
  });

  test("should throw an error for a non-existent file", () => {
    expect(() => {
      findUnusedStyles("./non-existent-file.js");
    }).toThrow();
  });

  test("should correctly identify unused styles", () => {
    const result = findUnusedStyles("./test-fixtures/App.js");
    const expectedUnusedStyles = ["unusedClass", "unusedStyle"];
    expect(result).toEqual(expect.arrayContaining(expectedUnusedStyles));
  });
});
