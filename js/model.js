class Model {
  #state = {
    todos: [],
  };

  addTodo(description, dateToComplete, category) {
    /**
     * Adds a todo to the state of the model
     * @param description {string} - description of the todo
     * @param dateToComplete {Date} - date the todo must be completed
     * @param category {string} - category of the todo
     */
    const todo = new Todo(description, dateToComplete, category);
    const newTodos = [todo, ...this.#state.todos];

    this.#state.todos = newTodos;
  }

  deleteTodo(todoID) {
    /**
     * deletes a todo from the state of the model
     * @param todoID {String} - ID of the todo to be deleted *
     */
    this.#state.todos = this.#state.todos.filter((todo) => todo.id !== todoID);
  }

  completeTodo(todoID) {
    /**
     * marks a todo as completed
     * @param todoID {String} - ID of the todo to be completed*
     */
    this.#state.todos = this.#state.todos.map((todo) =>
      todo.id === todoID ? todo.completeTask() : todo
    );
  }

  incompleteTodo(todoID) {
    /**
     * set completed status of a todo to false
     * @param todoID {String} - ID of the todo to remove the completed status
     */
    this.#state.todos = this.#state.todos.map((todo) =>
      todo.id === todoID ? todo.incompleteTask() : todo
    );
  }

  returnTodoData() {
    return this.#state.todos;
  }
}
