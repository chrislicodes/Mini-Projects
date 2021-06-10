import Todo from "../entities/todo";
import Bucket from "../entities/bucket";

interface AppState {
  buckets: Bucket[];
}

export default class Model {
  #state: AppState = {
    buckets: [],
  };

  addBucket(title: string = "New Bucket"): void {
    /**
     * Adds a bucket to the model
     * @param title {string} - title of the container
     */
    this.#state.buckets = [...this.#state.buckets, new Bucket(title)];
  }

  private _findBucket(bucketID: string): Bucket {
    return this.#state.buckets.find((bucket) => bucket.id === bucketID);
  }

  addTodoToBucket(
    bucketID: string,
    todoTitle: string = "New Todo",
    todoDescription: string = "Todo Description"
  ): string {
    const targetBucket = this._findBucket(bucketID);
    const newTodo = new Todo(targetBucket.title, todoTitle, todoDescription);

    targetBucket.addItemToBucket(newTodo);

    return newTodo.id;
  }

  removeTodoFromBucket(bucketID: string, todoID: string): void {
    const targetBucket = this._findBucket(bucketID);
    targetBucket.removeItemFromBucket(todoID);
  }

  get buckets(): Bucket[] {
    return this.#state.buckets;
  }
}
