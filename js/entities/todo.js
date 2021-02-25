const Categories = Object.freeze({
  household: "household",
  coding: "coding",
  finance: "finance",
});

class Todo {
  /**
   * Represents a single Todo
   * @param description {string} - description of the todo
   * @param dateToComplete {Date} - date the todo must be completed
   * @param {("coding" | "finance" | "household")} category {string} - category of the todo
   */
  constructor(description, dateToComplete, category) {
    this.description = description;
    this.dateToComplete = dateToComplete;
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

module.exports = {
  Categories,
  Todo
};
