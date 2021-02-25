const { Todo } = require("./todo");

describe("Entities Test Suite", () => {
  test("should create a new Todo Entity", () => {
    const now = new Date();
    const todo = new Todo("My new todo", now, "coding");
    expect(todo.description).toBe("My new todo");
    expect(todo.dateToComplete).toBe(now);
    expect(todo.category).toBe("coding");
  });

  test("should complete a Todo Entity", () => {
    const now = new Date();
    const todo = new Todo("My new todo", now, "coding");
    expect(todo.completed).toBeFalsy();

    todo.completeTask();
    expect(todo.completed).toBeTruthy();
  });

  test("should incomplete a Todo Entity", () => {
    const now = new Date();
    const todo = new Todo("My new todo", now, "coding");
    todo.completeTask();

    todo.incompleteTask();
    expect(todo.completed).toBeFalsy();
  });
});
