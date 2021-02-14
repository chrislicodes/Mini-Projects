//Event Handlers
const processInput = function (data) {
  //Add todo to model
  model.addTodo(
    data.description,
    formatToValidDateString(data.date, data.time),
    data.category
  );

  //clear todo view
  todoView.clearView();

  //rerender the todo state
  const todos = model.returnTodoData();
  todos.forEach((todo) => todoView.render(todo));
};

//Publisher Subscriber Pattern
todoView.addSubmitHandler(processInput);
