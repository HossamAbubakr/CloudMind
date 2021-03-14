import { handleSubmit } from "../src/client/js/handleSubmit";
describe("Testing the submit functionality", () => {
  test("Making sure handleSubmit is defined", () => {
    expect(handleSubmit).toBeDefined();
  });
});
