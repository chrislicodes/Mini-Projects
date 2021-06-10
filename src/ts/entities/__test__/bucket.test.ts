import Todo from "../todo";
import Bucket from "../bucket";

describe("Bucket Test", () => {
  it("should create an empty bucket", () => {
    const bucket = new Bucket();

    expect(bucket.title).toBe("New Bucket");
    expect(bucket.items).toEqual([]);
    expect(bucket.id).toBeGreaterThan(0);
  });

  it("should add todo entity to bucket", () => {
    const bucket = new Bucket();

    bucket.addItemToBucket(new Todo("", ""));
    expect(bucket.items.length).toBeGreaterThan(0);
    expect(bucket.items[0]).toBeInstanceOf(Todo);
  });

  it("should remove todo entity from bucket", () => {
    const bucket = new Bucket();

    bucket.addItemToBucket(new Todo("", ""));
    const id = bucket.items[0].id;

    bucket.deleteItemFromBucket(id);
    expect(bucket.items).toEqual([]);
  });
});
