import Todo from "../todo";

describe("Todo Entity", () => {
  it("should create a Todo object", () => {
    const todo = new Todo("", "New Todo", "Todo Description");

    expect(todo.title).toBe("New Todo");
    expect(todo.description).toBe("Todo Description");
    expect(todo.category).toBe("");

    expect(todo).toBeInstanceOf(Todo);
  });

  it("should change the todo title", () => {
    const todo = new Todo("", "New Todo", "Todo Description");
    todo.changeTodoTitle("changed title");

    expect(todo.title).toBe("changed title");
  });

  it("should change the todo description", () => {
    const todo = new Todo("", "New Todo", "Todo Description");
    todo.changeTodoDescription("changed description");

    expect(todo.description).toBe("changed description");
  });
});
