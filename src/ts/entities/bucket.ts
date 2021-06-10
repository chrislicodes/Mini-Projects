import Todo from "./todo";

export default class Bucket {
  readonly id = new Date().getTime();
  items: Todo[] = [];

  constructor(public title: string = "New Bucket") {
    this.title = title;
  }

  addItemToBucket(this: Bucket, todo: Todo) {
    this.items = [...this.items, todo];
  }

  deleteItemFromBucket(id: number) {
    this.items = this.items.filter((todo) => todo.id !== id);
  }
}
