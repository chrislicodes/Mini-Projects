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

    try {
      const todo = this._createTodo(description, date, category);

      const prevState = [...this.#state.todos];
      const newTodos = [todo, ...prevState];

      this.#state.todos = newTodos;
    } catch (err) {
      console.error(err);
    }
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
    todoObj.completeTask();
  }

  returnTodoData() {
    return this.#state.todos;
  }

  _createTodo(description, date, category) {
    try {
      this._validateData(description, category);
      return new Todo(description, date, category);
    } catch (err) {
      throw err;
    }
  }

  _validateData(description, category) {
    /**
     * Validates formdata
     * @param description {string} - description of todo
     * @param category {string} - category of the todo
     */
    const validCategories = ["coding", "finance", "household"];

    //checks if someone removes required attribute, if there was some input
    if (!description || !category) {
      throw new Error("Enter a description and category");
    }

    //check if category names haven't been changed
    if (!validCategories.includes(category)) {
      throw new Error(`${category} is not a valid category.`);
    }

    //checks for special symbols in input text
    if (description.match(/[^\w\*]/)) {
      throw new Error("Don't use special characters in description.");
    }
  }
}

const model = new Model();
