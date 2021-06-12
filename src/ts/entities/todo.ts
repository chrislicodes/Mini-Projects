import { generateID } from "../utils/utils";

export default class Todo {
  /**
   * Represents a single Todo
   * @param title {string} - title of the todo
   * @param description {string} - description of the todo
   * @param category {string} - category of the todo
   */
  readonly id: string = generateID();
  readonly dateOfCreation: Date = new Date();

  constructor(
    public category: string,
    public title: string,
    public description: string
  ) {
    this.title = title;
    this.description = description;
    this.category = category;
  }

  changeTodoTitle(this: Todo, newTitle: string): void {
    this.title = newTitle;
  }

  changeTodoDescription(this: Todo, newDescription: string): void {
    this.description = newDescription;
  }
}
