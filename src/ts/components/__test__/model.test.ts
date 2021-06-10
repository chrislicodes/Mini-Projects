import Model from "../model";
import Bucket from "../../entities/bucket";
import Todo from "../../entities/todo";

describe("Model", () => {
  it("should initialize an empty model", () => {
    const model = new Model();

    expect(model.buckets).toEqual([]);
  });

  it("should create a bucket", () => {
    const model = new Model();
    model.addBucket("Test");

    expect(model.buckets.length).toBeGreaterThan(0);
    expect(model.buckets[0]).toBeInstanceOf(Bucket);
    expect(model.buckets[0].title).toBe("Test");

    model.addBucket("Test2");

    expect(model.buckets.length).toBeGreaterThan(1);
    expect(model.buckets[1]).toBeInstanceOf(Bucket);
    expect(model.buckets[1].title).toBe("Test2");
  });

  it("should add a todo to a bucket", () => {
    const model = new Model();
    model.addBucket("Test");
    model.addBucket("Test2");

    expect(model.buckets.length).toBeGreaterThan(1);

    const bucketID = model.buckets[0].id;
    model.addTodoToBucket(bucketID, "Test Title", "Test Description");

    expect(model.buckets[0].items.length).toBeGreaterThan(0);
    expect(model.buckets[0].items[0]).toBeInstanceOf(Todo);
    expect(model.buckets[0].items[0].category).toBe(model.buckets[0].title);

    const bucketID2 = model.buckets[1].id;

    model.addTodoToBucket(bucketID2, "Test Title", "Test Description");
    expect(model.buckets[1].items.length).toBeGreaterThan(0);
    expect(model.buckets[1].items[0]).toBeInstanceOf(Todo);
    expect(model.buckets[1].items[0].category).toBe(model.buckets[1].title);
  });

  it("should remove a todo from a bucket", () => {
    const model = new Model();
    model.addBucket("Test");
    model.addBucket("Test2");

    const bucketID = model.buckets[1].id;
    const firstTodoID = model.addTodoToBucket(
      bucketID,
      "Test Title",
      "Test Description"
    );

    const secondTodoID = model.addTodoToBucket(
      bucketID,
      "Test Title 2",
      "Test Description 2"
    );

    model.removeTodoFromBucket(bucketID, firstTodoID);

    expect(model.buckets[1].items[0].id).toBe(secondTodoID);
  });
});
