import { Todo } from "../Todo";

describe("Todo", () => {
  it("should create a Todo object", () => {
    const todo = new Todo("New Todo", "Todo Description");

    expect(todo.title).toBe("New Todo");
    expect(todo.description).toBe("Todo Description");
    expect(todo.uuid).toBeDefined();
  });

  it("should change the todo title", () => {
    const todo = new Todo("New Todo", "Todo Description");
    todo.title = "changed title";

    expect(todo.title).toBe("changed title");
  });

  it("should change the todo description", () => {
    const todo = new Todo("New Todo", "Todo Description");
    todo.description = "changed description";

    expect(todo.description).toBe("changed description");
  });
});
