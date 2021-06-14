import Model from "./model";
import BucketView from "./views/bucketView";

export default class Controller {
  #model = new Model();
  #view = new BucketView();

  init(this: Controller): void {
    //check for, load, render stored data
    this.#model.getLocalStorageData();
    this._renderBuckets();

    //subscribe to events
    this.#view.addBucketClickHandler(this.addNewBucket.bind(this));
    this.#view.addTodoClickHandler(this.addNewTodoToBucket.bind(this));
    this.#view.addTodoClickDeleteHandler(this.removeTodoFromBucket.bind(this));
    this.#view.addBucketTitleChangeHandler(
      this.handleBucketTitleChange.bind(this)
    );
    this.#view.addTodoTitleChangeHandler(this.handleTodoTitleChange.bind(this));
    this.#view.addTodoDescriptionChangeHandler(
      this.handleTodoDescriptionChange.bind(this)
    );
    this.#view.addDragDropHandler(this.handleDragAndDrop.bind(this));
  }

  _renderBuckets(this: Controller): void {
    this.#view.clear();
    this.#model.buckets.forEach((bucket) => this.#view.render(bucket));
    this.#view.renderAddBucketButton();
  }

  addNewBucket(this: Controller): void {
    this.#model.addBucket();
    this._renderBuckets();
  }

  addNewTodoToBucket(this: Controller, bucketID: string): void {
    this.#model.addTodoToBucket(bucketID);
    this._renderBuckets();
  }

  removeTodoFromBucket(
    this: Controller,
    bucketID: string,
    todoID: string
  ): void {
    this.#model.removeTodoFromBucket(bucketID, todoID);
    this._renderBuckets();
  }

  handleBucketTitleChange(
    this: Controller,
    bucketID: string,
    newTitle: string
  ): void {
    this.#model.changeBucketTitle(bucketID, newTitle);
  }

  handleTodoTitleChange(
    this: Controller,
    bucketID: string,
    todoID: string,
    newTitle: string
  ): void {
    this.#model.changeTodoTitle(bucketID, todoID, newTitle);
  }

  handleTodoDescriptionChange(
    this: Controller,
    bucketID: string,
    todoID: string,
    newDescription: string
  ): void {
    this.#model.changeTodoDescription(bucketID, todoID, newDescription);
  }

  handleDragAndDrop(
    this: Controller,
    bucketID: string,
    todoID: string,
    targetBucketID: string
  ) {
    if (bucketID !== targetBucketID) {
      this.#model.moveTodoToAnotherBucket(bucketID, todoID, targetBucketID);
      this._renderBuckets();
    }
  }
}
