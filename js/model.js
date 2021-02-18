class Model {
  #state = {
    todos: [],
  };

  addTodo(description, date, category) {
    /**
     * Adds a todo to the state of the model
     * @param description {string} - description of the todo
     * @param date {Date} - date the todo must be completed
     * @param category {string} - category of the todo
     */
    const todo = new Todo(description, date, category);
    const newTodos = [todo, ...this.#state.todos];
    this.#state.todos = newTodos;
  }

  delTodo(todoID) {
    /**
     * deletes a todo from the state of the model
     * @param todoID {String} - ID of the todo to be deleted *
     */
    const newState = [...this.#state.todos];
    const todoIndex = prevState.findIndex((todoObj) => todoObj.id === todoID);

    prevState.splice(todoIndex, 1);

    this.#state.todos = newState;
  }

  completeTodo(todoID) {
    /**
     * marks a todo as completed
     * @param todoID {String} - ID of the todo to be completed*
     */
    const todoObj = this.#state.todos.find((todo) => todo.id === todoID);
    todoObj.completeTask();
  }

  incompleteTodo(todoID) {
    /**
     * set completed status of a todo to false
     * @param todoID {String} - ID of the todo to remove the completed status
     */
    const todoObj = this.#state.todos.find((todo) => todo.id === todoID);
    todoObj.incompleteTask();
  }

  returnTodoData() {
    return this.#state.todos;
  }
}
