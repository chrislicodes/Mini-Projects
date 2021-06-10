import Todo from "../todo";

describe("Todo Entity", () => {
  it("should create an empty Todo object", () => {
    const todo = new Todo("");

    expect(todo.title).toBe("New Todo");
    expect(todo.description).toBe("Todo Description");
    expect(todo.category).toBe("");

    expect(todo).toBeInstanceOf(Todo);
  });

  it("should create a complete Todo object", () => {
    const todo = new Todo("coding", "Title", "Description");

    expect(todo.title).toBe("Title");
    expect(todo.description).toBe("Description");
    expect(todo.category).toBe("coding");
  });

  it("should complete and incomplete the todo entity", () => {
    const todo = new Todo("Title", "Description", "coding");

    expect(todo.completed).toBeFalsy();

    todo.completeTask();
    expect(todo.completed).toBeTruthy();

    todo.incompleteTask();
    expect(todo.completed).toBeFalsy();
  });
});
