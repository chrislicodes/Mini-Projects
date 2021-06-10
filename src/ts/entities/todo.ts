export default class Todo {
  /**
   * Represents a single Todo
   * @param title {string} - title of the todo
   * @param description {string} - description of the todo
   * @param category {string} - category of the todo
   * @param currentBucketPos {number} - current bucket position
   */
  readonly id = new Date().getTime();
  private readonly dateOfCreation: Date = new Date();
  completed = false;

  constructor(
    public category: string,
    public title: string = "New Todo",
    public description: string = "Todo Description"
  ) {
    this.title = title;
    this.description = description;
    this.category = category;
  }

  completeTask(this: Todo): void {
    this.completed = true;
  }

  incompleteTask(this: Todo): void {
    this.completed = false;
  }
}
