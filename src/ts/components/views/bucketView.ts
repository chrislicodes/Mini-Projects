import Bucket from "../../entities/bucket";
import TodoView from "./todoView";
import icons from "../../../img/sprites.svg";

export default class BucketView {
  #parent = document.querySelector(".container-grid");
  #todoView = new TodoView();

  render(bucketObj: Bucket): void {
    /**
     * renders bucket object to the dom
     * @param bucketObj {Bucket} - bucketObj
     */
    if (!bucketObj) return;

    const markup = this._generateMarkup(bucketObj);

    this.#parent.insertAdjacentHTML("afterbegin", markup);
  }

  _generateMarkup(bucketObj: Bucket): string {
    /**
     * generates the markup to render the bucket
     * @param bucketObj {Bucket} - bucketObj
     */
    const { id, title, items } = bucketObj;

    return `
    <section class="task-container" data-id=${id} >
      <header class="task-container__header">
          <div class="container-info">
              <h2 class="task-headline" contenteditable="true">${title}</h2>
              <div class="task-count">${items.length}</div>
          </div>
          <button class="btn-add">+</button>
      </header>
      <div class="task-container__cards">
      ${
        items.length > 0
          ? items.map((todo) => this.#todoView.render(todo)).join("")
          : "<p>Everything done here!</p>"
      }
      </div>       
    </section>`;
  }

  clear(): void {
    /**
     * clears view
     */
    this.#parent.innerHTML = `
     <button class="container-grid__add-container">
        <svg>
            <use xlink:href="${icons}#icon-plus"></use>
        </svg>
        <p>Add Task - Bucket</p>
    </button>`;
  }

  addBucketClickHandler(handler: Function) {
    /**
     * Eventlistener for click on add Bucket button
     * @param handler {Function} - Function which responds to the Event
     */
    this.#parent.addEventListener("click", function (e) {
      e.preventDefault();
      const target = e.target as HTMLElement;
      if (target.classList[0] !== "container-grid__add-container") return;
      e.preventDefault();
      handler();
    });
  }

  addTodoClickHandler(handler: Function) {
    /**
     * Eventlistener for click on add Todo button
     * @param handler {Function} - Function which responds to the Event
     */
    this.#parent.addEventListener("click", function (e) {
      e.preventDefault();
      const target = e.target as HTMLElement;
      if (target.classList[0] !== "btn-add") return;
      const bucket = target.closest(".task-container") as HTMLElement;
      const bucketID = bucket.dataset.id;
      handler(bucketID);
    });
  }

  addTodoClickDeleteHandler(handler: Function) {
    /**
     * Eventlistener for click on delete todo button
     * @param handler {Function} - Function which responds to the Event
     */
    this.#parent.addEventListener("click", function (e) {
      e.preventDefault();
      const target = e.target as HTMLElement;
      const closestBtn = target.closest(".btn-delete");
      if (!closestBtn) return;

      const bucket = target.closest(".task-container") as HTMLElement;
      const bucketID = bucket.dataset.id;

      const todo = target.closest(".card-item") as HTMLElement;
      const todoID = todo.dataset.id;

      handler(bucketID, todoID);
    });
  }

  addBucketTitleChangeHandler(handler: Function) {
    /**
     * Eventlistener for input event for bucket title change
     * @param handler {Function} - Function which responds to the Event
     */
    this.#parent.addEventListener("input", function (e) {
      const target = e.target as HTMLElement;
      if (target.classList[0] !== "task-headline") return;

      const newTitle = target.innerText;

      const bucket = target.closest(".task-container") as HTMLElement;
      const bucketID = bucket.dataset.id;
      handler(bucketID, newTitle);
    });
  }

  private _todoInfoChangeHandler(e: Event, handler: Function) {
    /**
     * Function to process todo change
     * @param e {Event} - fired Event
     * @param handler {Function} - Function which responds to the Event
     */
    const target = e.target as HTMLElement;

    const newText = target.innerText;

    const bucket = target.closest(".task-container") as HTMLElement;
    const bucketID = bucket.dataset.id;

    const todo = target.closest(".card-item") as HTMLElement;
    const todoID = todo.dataset.id;

    handler(bucketID, todoID, newText);
  }

  addTodoTitleChangeHandler(handler: Function) {
    this.#parent.addEventListener("input", (e) => {
      const target = e.target as HTMLElement;
      if (target.classList[0] !== "card-item__title") return;

      this._todoInfoChangeHandler(e, handler);
    });
  }

  addTodoDescriptionChangeHandler(handler: Function) {
    this.#parent.addEventListener("input", (e) => {
      const target = e.target as HTMLElement;
      if (target.classList[0] !== "card-item__description") return;

      this._todoInfoChangeHandler(e, handler);
    });
  }

  // Drag and Drop Eventhandler

  addDragDropHandler(handler: Function) {
    this._addDragStartHandler();
    this._addDragEndHandler();
    this._addDragOverHandler();
    this._addDragEnterHandler();
    this._addDragLeaveHandler();
    this._addDropHandler(handler);
  }

  private _addDragStartHandler() {
    /**
     * Connecting Data to the drag event at start
     */
    this.#parent.addEventListener(
      "dragstart",
      (e: DragEvent) => {
        const todo = e.target as HTMLElement;
        const todoID = todo.dataset.id;

        const bucket = todo.closest(".task-container") as HTMLElement;
        const bucketID = bucket.dataset.id;

        todo.style.opacity = "0.3";
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", `${bucketID}, ${todoID}`);
      },
      false
    );
  }

  private _addDragEndHandler() {
    /**
     * Restore old styles
     */
    this.#parent.addEventListener("dragend", (e: DragEvent) => {
      const todo = e.target as HTMLElement;
      todo.style.opacity = "1";
    });
  }

  private _addDragOverHandler() {
    /**
     * prevent Default signals possible dropareas
     */
    this.#parent.addEventListener("dragover", (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList[0] === "task-container__cards") {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }
    });
  }

  private _addDragEnterHandler() {
    /**
     * prevent Default signals possible dropareas
     */
    this.#parent.addEventListener("dragenter", (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList[0] === "task-container__cards") {
        e.preventDefault();
        target.classList.add("task-container__cards-entered");
      }
    });
  }

  private _addDragLeaveHandler() {
    /**
     * restore old styles
     */
    this.#parent.addEventListener("dragleave", (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList[0] === "task-container__cards") {
        e.preventDefault();
        target.classList.remove("task-container__cards-entered");
      }
    });
  }

  private _addDropHandler(handler: Function) {
    /**
     * manage drop event
     * @param handler {Function} - Function which responds to the Event
     */
    this.#parent.addEventListener("drop", (e: DragEvent) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      const targetBucket = target.closest(".task-container") as HTMLElement;
      const targetBucketID = targetBucket.dataset.id;
      const [bucketID, todoID] = e.dataTransfer
        .getData("text/plain")
        .split(",")
        .map((item) => item.replace(" ", ""));

      target.classList.remove("task-container__cards-entered");
      handler(bucketID, todoID, targetBucketID);
    });
  }
}
