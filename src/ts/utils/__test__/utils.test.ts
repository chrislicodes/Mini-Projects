import { generateID } from "../utils";

describe("generate ID", () => {
  it("should generate an ID", () => {
    const id = generateID();

    expect(id.length).toBe(10);
  });
});
