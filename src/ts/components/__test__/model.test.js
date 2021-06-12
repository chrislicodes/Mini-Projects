import Model from "../model";
import Bucket from "../../entities/bucket";
import Todo from "../../entities/todo";

class LocalStorageMock {
  store = {};

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

describe("Model", () => {
  it("should initialize an empty model", () => {
    const model = new Model();

    expect(model.buckets).toEqual([]);
  });

  it("should add a bucket to model", () => {
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
    ).id;

    const secondTodoID = model.addTodoToBucket(
      bucketID,
      "Test Title 2",
      "Test Description 2"
    ).id;

    model.removeTodoFromBucket(bucketID, firstTodoID);

    expect(model.buckets[1].items[0].id).toBe(secondTodoID);
  });

  it("should rename a specific bucket", () => {
    const model = new Model();
    const bucketID = model.addBucket("Test").id;

    model.changeBucketTitle(bucketID, "Changed Title");

    expect(model.buckets[0].title).toBe("Changed Title");
  });

  it("should should change the todo title in a specific bucket", () => {
    const model = new Model();
    model.addBucket();
    model.addBucket();

    const bucketID = model.addBucket().id;
    const todoID = model.addTodoToBucket(bucketID).id;

    model.changeTodoTitle(bucketID, todoID, "changed title");

    expect(model.buckets[2].items[0].title).toBe("changed title");
  });

  it("should should change the todo description ia specific bucket", () => {
    const model = new Model();
    model.addBucket();
    model.addBucket();

    const bucketID = model.addBucket().id;
    const todoID = model.addTodoToBucket(bucketID, "test", "test").id;

    model.changeTodoDescription(bucketID, todoID, "changed description");

    expect(model.buckets[2].items[0].description).toBe("changed description");
  });

  it("should set the localStorage with the current data", () => {
    const model = new Model();
    const bucket = model.addBucket();
    const todo = model.addTodoToBucket(
      bucket.id,
      "Test Title",
      "Test Description"
    );

    model.setLocalStorageData();

    const data = JSON.parse(localStorage.getItem("buckets"));

    expect(data[0].id).toBe(bucket.id);
    expect(data[0].title).toBe(bucket.title);
    expect(data[0].items[0].id).toBe(todo.id);
    expect(data[0].items[0].title).toBe(todo.title);
    expect(data[0].items[0].description).toBe(todo.description);
  });

  it("should get the current data from localStorage", () => {
    const model1 = new Model();
    const bucket = model1.addBucket();

    model1.addTodoToBucket(bucket.id, "Test Title", "Test Description");

    model1.setLocalStorageData();
    const model2 = new Model();

    model2.getLocalStorageData();
    expect(model2).toEqual(model1);
  });

  it("should add an empty bucket if there is no current data in localStorage", () => {
    const model = new Model();
    localStorage.clear();

    model.getLocalStorageData();

    expect(model.buckets.length).toBe(1);
  });

  it("should move a todo item from one bucket to another", () => {
    const model = new Model();
    const bucket1 = model.addBucket();
    const bucket2 = model.addBucket();

    const todoID = model.addTodoToBucket(
      bucket1.id,
      "Bucket 1 title",
      "Bucket 1 Description"
    ).id;

    model.moveTodoToAnotherBucket(bucket1.id, todoID, bucket2.id);

    expect(model.buckets[1].items[0]).toBeInstanceOf(Todo);
  });
});
