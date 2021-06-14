import { generateUUID } from "./generateUUID";

export class Todo {
  /**
   * Represents a single Todo
   * @param title {string} - title of the todo
   * @param description {string} - description of the todo
   */
  #uuid: string;
  #title: string;
  #description: string;

  constructor(
    title: string,
    description: string,
    uuid: string = generateUUID()
  ) {
    this.#title = title;
    this.#description = description;
    this.#uuid = uuid;
  }

  toJSON() {
    return {
      uuid: this.#uuid,
      title: this.#title,
      description: this.#description,
    };
  }

  get title() {
    return this.#title;
  }

  get uuid() {
    return this.#uuid;
  }

  get description() {
    return this.#description;
  }

  set description(newDescription: string) {
    this.#description = newDescription;
  }

  set title(newTitle: string) {
    this.#title = newTitle;
  }
}
