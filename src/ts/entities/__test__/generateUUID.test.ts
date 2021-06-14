import { generateUUID } from "../generateUUID";

describe("generate uuid", () => {
  it("should generate an uuid", () => {
    const uuid = generateUUID();

    expect(uuid.length).toBe(10);
  });
});
