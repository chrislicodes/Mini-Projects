import Todo from "./todo";
import { generateID } from "../utils/utils.js";

export default class Bucket {
  readonly id: string = generateID();
  items: Todo[] = [];

  constructor(public title: string = "New Bucket") {
    this.title = title;
  }

  addItemToBucket(this: Bucket, todo: Todo) {
    this.items = [...this.items, todo];
  }

  removeItemFromBucket(id: string) {
    this.items = this.items.filter((todo) => todo.id !== id);
  }
}
