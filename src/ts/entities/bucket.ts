import Todo from "./todo";
import { generateID } from "../utils/utils";

export default class Bucket {
  readonly id: string = generateID();
  items: Todo[] = [];

  constructor(public title: string, items: Todo[] = []) {
    this.title = title;
    this.items = items;
  }

  addItemToBucket(this: Bucket, todo: Todo, toEnd = false) {
    if (toEnd) this.items = [...this.items, todo];
    if (!toEnd) this.items = [todo, ...this.items];
  }

  removeItemFromBucket(id: string) {
    this.items = this.items.filter((todo) => todo.id !== id);
  }

  changeBucketTitle(newTitle: string) {
    this.title = newTitle;
  }
}
