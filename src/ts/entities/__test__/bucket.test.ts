import Todo from "../todo";
import Bucket from "../bucket";

describe("Bucket Test", () => {
  it("should create an empty bucket", () => {
    const bucket = new Bucket("New Bucket");

    expect(bucket.title).toBe("New Bucket");
    expect(bucket.items).toEqual([]);
    expect(bucket.id).toBeDefined();
  });

  it("should add todo entity to bucket", () => {
    const bucket = new Bucket("New Bucket");

    bucket.addItemToBucket(new Todo("", "", ""));
    expect(bucket.items.length).toBeGreaterThan(0);
    expect(bucket.items[0]).toBeInstanceOf(Todo);

    bucket.addItemToBucket(new Todo("", "Test", ""));

    expect(bucket.items[0].title).toBe("Test");

    bucket.addItemToBucket(new Todo("", "Test End", ""), true);

    expect(bucket.items[bucket.items.length - 1].title).toBe("Test End");
  });

  it("should remove todo entity from bucket", () => {
    const bucket = new Bucket("New Bucket");

    bucket.addItemToBucket(new Todo("", "", ""));
    const id = bucket.items[0].id;

    bucket.removeItemFromBucket(id);
    expect(bucket.items).toEqual([]);
  });

  it("should rename the bucket", () => {
    const bucket = new Bucket("New Bucket");

    bucket.changeBucketTitle("Changed Title");

    expect(bucket.title).toBe("Changed Title");
  });
});
