class Controller {
  constructor() {
    this.validator = new Validator();
    this.todoView = new TodoView();
    this.model = new Model();

    //Publisher Subscriber Pattern
    this.todoView.addSubmitHandler(this.processInput);
  }

  //Event Handlers
  processInput = (data) => {
    const { description, date, time, category } = data;

    try {
      //validate data
      this.validator.validateInputFormData(description, category);

      //Add todo to model
      this.model.addTodo(
        description,
        formatToValidDateString(date, time),
        category
      );

      //clear todo view
      this.todoView.clearView();

      //rerender the todo state
      const todos = this.model.returnTodoData();
      todos.forEach((todo) => this.todoView.render(todo));
    } catch (err) {
      console.error(err);
    }
  };
}

const app = new Controller();
