import { linkChecker } from "../src/client/js/linkChecker";
describe("Testing the regex URL validation functionality", () => {
  test("Making sure linkChecker is defined", () => {
    expect(linkChecker).toBeDefined();
  });

  test("Making sure a valid URL returns true", () => {
    expect(linkChecker("www.github.com")).toBeTruthy();
  });

  test("Making sure an invalid URL returns false", () => {
    expect(linkChecker("Hello There")).toBeFalsy();
  });
});
