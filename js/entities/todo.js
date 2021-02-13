class Todo {
  /**
   * Represents a single Todo
   * @param description {string} - description of the todo
   * @param date {Date} - date the todo must be completed
   * @param category {string} - category of the todo
   */

  constructor(description, date, category) {
    this.description = description;
    this.date = date;
    this.category = category;

    this.id = new Date().getTime();
    this.completed = false;
  }

  completeTask() {
    this.completed = true;
  }

  incompleteTask() {
    this.completed = false;
  }
}
