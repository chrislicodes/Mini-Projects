import { Todo } from "./Todo";
import { generateUUID } from "./generateUUID";

export class Bucket {
  #uuid: string;
  #category: string;
  #items: Todo[];

  constructor(
    category: string,
    items: Todo[] = [],
    uuid: string = generateUUID()
  ) {
    this.#category = category;
    this.#items = items;
    this.#uuid = uuid;
  }

  addItemToBucket(this: Bucket, todo: Todo, toFront = false) {
    if (!toFront) this.#items = [...this.#items, todo];
    if (toFront) this.#items = [todo, ...this.#items];
  }

  removeItemFromBucket(uuid: string) {
    this.#items = this.#items.filter((todo) => todo.uuid !== uuid);
  }

  toJSON() {
    return {
      uuid: this.#uuid,
      category: this.#category,
      items: this.#items.map((todo) => todo.toJSON()),
    };
  }

  set category(newCategory: string) {
    this.#category = newCategory;
  }

  get uuid() {
    return this.#uuid;
  }

  get items() {
    return this.#items;
  }

  get category() {
    return this.#category;
  }
}
