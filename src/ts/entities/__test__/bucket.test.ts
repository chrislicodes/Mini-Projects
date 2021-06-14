import { Todo } from "../Todo";
import { Bucket } from "../Bucket";

describe("Bucket", () => {
  it("should create an empty bucket", () => {
    const bucket = new Bucket("New Bucket");

    expect(bucket.category).toBe("New Bucket");
    expect(bucket.items).toEqual([]);
    expect(bucket.uuid).toBeDefined();
  });

  it("should create a bucket with given todos", () => {
    const todo1 = new Todo("Title", "Description");
    const todo2 = new Todo("Title", "Description");

    const bucket = new Bucket("New Bucket", [todo1, todo2]);

    expect(bucket.items).toEqual([todo1, todo2]);
  });

  it("should add todo to end of bucket", () => {
    const bucket = new Bucket("New Bucket");

    bucket.addItemToBucket(new Todo("", ""));
    expect(bucket.items.length).toBeGreaterThan(0);
    expect(bucket.items[0]).toBeInstanceOf(Todo);

    bucket.addItemToBucket(new Todo("Test2", ""));

    expect(bucket.items[1].title).toBe("Test2");

    bucket.addItemToBucket(new Todo("Test", ""), false);
    expect(bucket.items[2].title).toBe("Test");
  });

  it("should add todo to front of bucket", () => {
    const bucket = new Bucket("New Bucket");

    bucket.addItemToBucket(new Todo("", "Test Front2"), true);
    bucket.addItemToBucket(new Todo("", "Test Front"), true);
    expect(bucket.items[0].description).toBe("Test Front");
  });

  it("should remove todo entity from bucket", () => {
    const bucket = new Bucket("New Bucket");

    bucket.addItemToBucket(new Todo("", ""));
    const uuid = bucket.items[0].uuid;

    bucket.removeItemFromBucket(uuid);
    expect(bucket.items).toEqual([]);
  });

  it("should rename the bucket", () => {
    const bucket = new Bucket("New Bucket");

    bucket.category = "Changed Title";

    expect(bucket.category).toBe("Changed Title");
  });
});
