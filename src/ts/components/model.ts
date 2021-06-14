import { Todo } from "../entities/Todo";
import { Bucket } from "../entities/Bucket";

type AppState = {
  buckets: Bucket[];
};

export default class Model {
  #state: AppState = {
    buckets: [], //replace with HashMap
  };

  addBucket(
    this: Model,
    category: string = "New Bucket",
    items: Todo[] = [],
    uuid?: string
  ): Bucket {
    /**
     * Adds a bucket to the model
     * @param title {string} - title of the container
     * @param items {Todo[]} - array of Todo items
     */
    const newBucket = new Bucket(category, items, uuid);
    this.#state.buckets = [...this.#state.buckets, newBucket];

    this.setLocalStorageData();
    return newBucket;
  }

  get buckets(): Bucket[] {
    return this.#state.buckets;
  }

  private _findBucket(this: Model, bucketID: string): Bucket {
    return this.#state.buckets.find((bucket) => bucket.uuid === bucketID);
  }

  private _findTodo(this: Model, bucket: Bucket, todoID: string) {
    return bucket.items.find((todo) => todo.uuid === todoID);
  }

  setLocalStorageData(): void {
    localStorage.setItem(
      "buckets",
      JSON.stringify(this.buckets.map((bucket) => bucket.toJSON()))
    );
  }

  getLocalStorageData(this: Model): void {
    const buckets = JSON.parse(localStorage.getItem("buckets"));

    if (!buckets) {
      //add first bucket if there is no data in localStorage
      this.addBucket();
    } else {
      //initialize the Bucket and Todo Objects
      buckets.forEach((bucket: Bucket) =>
        this.addBucket(
          bucket.category,
          bucket.items.map(
            (todo) => new Todo(todo.title, todo.description, todo.uuid)
          ),
          bucket.uuid
        )
      );
    }
  }

  addTodoToBucket(
    this: Model,
    bucketID: string,
    todoTitle: string = "New Todo",
    todoDescription: string = "Todo Description"
  ): Todo {
    const targetBucket = this._findBucket(bucketID);
    const newTodo = new Todo(todoTitle, todoDescription);

    targetBucket.addItemToBucket(newTodo, true);

    this.setLocalStorageData();
    return newTodo;
  }

  removeTodoFromBucket(this: Model, bucketID: string, todoID: string): void {
    const targetBucket = this._findBucket(bucketID);
    targetBucket.removeItemFromBucket(todoID);

    this.setLocalStorageData();
  }

  changeBucketTitle(this: Model, bucketID: string, newTitle: string): void {
    const targetBucket = this._findBucket(bucketID);
    targetBucket.category = newTitle;
    this.setLocalStorageData();
  }

  changeTodoTitle(
    this: Model,
    bucketID: string,
    todoID: string,
    newTitle: string
  ): void {
    const targetBucket = this._findBucket(bucketID);
    const targetTodo = this._findTodo(targetBucket, todoID);
    targetTodo.title = newTitle;

    this.setLocalStorageData();
  }

  changeTodoDescription(
    this: Model,
    bucketID: string,
    todoID: string,
    newDescription: string
  ): void {
    const targetBucket = this._findBucket(bucketID);
    const targetTodo = this._findTodo(targetBucket, todoID);
    targetTodo.description = newDescription;

    this.setLocalStorageData();
  }

  moveTodoToAnotherBucket(
    this: Model,
    bucketID: string,
    todoID: string,
    targetBucketID: string
  ) {
    const originBucket = this._findBucket(bucketID);
    const todo = originBucket.items.find((todo) => todo.uuid === todoID);
    const targetBucket = this._findBucket(targetBucketID);

    originBucket.removeItemFromBucket(todo.uuid);
    targetBucket.addItemToBucket(todo);

    this.setLocalStorageData();
  }
}
