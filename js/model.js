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
    const newState = [...this.#state.todos];
    const todoIndex = newState.findIndex((todoObj) => todoObj.id === todoID);

    newState.splice(todoIndex, 1);

    this.#state.todos = newState;
  }

  completeTodo(todoID) {
    /**
     * marks a todo as completed
     * @param todoID {String} - ID of the todo to be completed*
     */
    const newState = [...this.#state.todos];
    const todoObj = newState.find((todo) => todo.id === todoID);

    todoObj.completeTask();

    this.#state.todos = newState;
  }

  incompleteTodo(todoID) {
    /**
     * set completed status of a todo to false
     * @param todoID {String} - ID of the todo to remove the completed status
     */
    const newState = [...this.#state.todos];
    const todoObj = newState.find((todo) => todo.id === todoID);

    todoObj.incompleteTask();

    this.#state.todos = newState;
  }

  returnTodoData() {
    return this.#state.todos;
  }
}
