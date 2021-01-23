"use strict";

//Element Selectors
const submitBtn = document.querySelector(".input-btn");
const inputForm = document.querySelector(".input-form");
const inputDate = document.querySelector(".input-date");
const inputText = document.querySelector(".input-text");

const taskContainer = document.querySelector(".tasks-container");

class App {
  /**
   * Initializes and manages the app state
   */
  #state = {
    todos: [],
  };

  init() {
    /**
     * Initializes the app
     */

    //Attach Event Listeners
    inputForm.addEventListener("submit", processInput);
    taskContainer.addEventListener("click", processClickEvent);

    //Drag - Events
    taskContainer.addEventListener("dragstart", processDragStart);
    taskContainer.addEventListener("dragend", processDragEnd);

    taskContainer.addEventListener("dragenter", processDragEnter);
    taskContainer.addEventListener("dragover", processDragOver);
    taskContainer.addEventListener("dragleave", processDragLeave);

    taskContainer.addEventListener("drop", processDragDrop);

    //Set date in the input form to current date
    inputDate.setAttribute("value", new Date().toISOString().slice(0, 10));
  }

  addTodo(todoObj) {
    /**
     * adds todo to the state of the app
     * @param todoObj {Todo} - todo - Object created with Todo class   *
     */

    this.#state.todos.unshift(todoObj);
    this._updateTodoPos();
    this.renderTodo(todoObj);
  }

  delTodo(todoEl) {
    /**
     * deletes a todo from the interface and from the app state
     * @param todoEl {HTMLElement} - DOM Object *
     */

    const elID = +todoEl.dataset.id;

    const todoIndex = this.#state.todos.findIndex(
      (todoObj) => todoObj.id === elID
    );

    this.#state.todos.splice(todoIndex, 1);

    todoEl.remove();
    this._updateTodoPos();
  }

  completeTodo(todoEl) {
    /**
     * marks a todo as completed and adds the "complete" class to the HTMLElement
     * @param todoEl {HTMLElement} - DOM Object *
     */
    const elID = +todoEl.dataset.id;

    let todoObj = this.#state.todos.find((todo) => todo.id === elID);
    todoObj.toggleCompleted();

    todoEl.classList.toggle("complete");
  }

  _renderState() {
    /**
     * Re-renders all todos within the state   *
     */
    taskContainer.innerHTML = "";
    this.#state.todos.forEach((todo) => this.renderTodo(todo));
  }

  renderTodo(todoObj) {
    /**
     * ToDo-Component, creates a single HTML component and inserts it to the DOM
     * @param todoObj {Todo} - todo - Object created with Todo class
     */
    let { id, category, description, date } = todoObj;
    const lang = navigator.language;

    //Formatting the date
    const dateFormat = new Intl.DateTimeFormat(lang, {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(date);

    const timeFormat = new Intl.DateTimeFormat(lang, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);

    let descLength = 30;

    //Formatting the description
    if (description.length > descLength)
      description = description.slice(0, descLength) + "...";

    const markup = `<div class="task" draggable="true" data-id=${id}>
    <div class="task__icon-container">
        <div class="task__icon">
            <svg>
                <use xlink:href="./img/sprites.svg#${category}"></use>
            </svg>
        </div>
    </div>
    <div class="task__text-container">
        <p class="task__description">${description}</p>
        <p class="task__date">${dateFormat} - ${timeFormat}</p>
    </div>
    <div class="task__btn-container">
        <button class="task__complete-btn" data-tag="complete">
            <svg>
                <use xlink:href="./img/sprites.svg#icon-checkmark"></use>
            </svg>
        </button>
        <button class="task__delete-btn" data-tag="delete">
            <svg>
                <use xlink:href="./img/sprites.svg#icon-cross"></use>
            </svg>
        </button>
    </div>
  </div>`;

    taskContainer.insertAdjacentHTML("afterBegin", markup);
  }

  returnTodo(id) {
    return this.#state.todos.find((el) => el.id === +id);
  }

  logState() {
    console.log(this.#state.todos);
  }

  swapTodos(id1, id2, order) {
    /**
     * Swaps todo position in the state
     * @param id1 {string} - first id of todo to be swapped
     * @param id2 {string} - second id of todo to be swapped
     * @param order {string} - string indicating if a todo should be inserted before or after
     */

    const todo1Ind = this.#state.todos.findIndex((el) => el.id === +id1);
    const todo2Ind = this.#state.todos.findIndex((el) => el.id === +id2);

    const frontEl = todo1Ind < todo2Ind ? todo1Ind : todo2Ind;
    const backEl = todo1Ind < todo2Ind ? todo2Ind : todo1Ind;

    let stateTodo = this.#state.todos;

    if (order === "beforeBegin") {
      const backTodo = stateTodo.splice(backEl, 1);
      stateTodo = [
        ...stateTodo.slice(0, frontEl),
        ...backTodo,
        ...stateTodo.slice(frontEl),
      ];
    }

    if (order === "afterEnd") {
      const frontTodo = stateTodo.splice(frontEl, 1);
      stateTodo = [
        ...stateTodo.slice(0, backEl),
        ...frontTodo,
        ...stateTodo.slice(backEl),
      ];
    }

    this.#state.todos = stateTodo;
    this._updateTodoPos();
  }

  _updateTodoPos() {
    this.#state.todos.forEach((todo, index) => (todo.pos = index + 1));
  }
}
class Todo {
  /**
   * Represents a single Todo
   * @param desc {string} - description of the todo
   * @param date {Date} - date the todo must be completed
   * @param cat {string} - category of the todo
   */
  constructor(desc, date, cat) {
    this.id = new Date().getTime();
    this.description = desc;
    this.date = date;
    this.category = cat;

    this.completed = false;
    this.pos = 0;
  }

  toggleCompleted() {
    this.completed = this.completed ? false : true;
  }
}

//Function to create a proper date object from Form Data
const formatDate = (date, time) => new Date(date + "T" + time + ":00Z");

const checkInput = function (data) {
  /**
   * Validates formdata
   * @param data {object} - object created from FormData
   */
  const validNames = ["time", "date", "description", "category"];
  const validCategories = ["coding", "finance", "household"];

  //check if the name tags haven't been changed
  for (const name of validNames) {
    if (!(name in data)) {
      throw new Error(`${name} field is missing.`);
    }
  }

  const { category } = data;

  //check if category names haven't been changed
  if (!validCategories.includes(category)) {
    throw new Error(`${category} is not a valid category.`);
  }
};

const processInput = function (e) {
  /**
   * Event Handler for Submit Event
   **/
  e.preventDefault();

  //create formData Object
  const formData = new FormData(inputForm);
  const data = {};

  //populate data-object
  formData.forEach((value, key) => (data[key] = value));

  //clean input Form
  inputText.value = "";

  //Validate Data
  try {
    checkInput(data);
  } catch (err) {
    // location.reload();
    console.error(err);
    return;
  }

  //Initialize a new todo object
  const newTodo = new Todo(
    data.description,
    formatDate(data.date, data.time),
    data.category
  );

  //add and render todo to the app
  app.addTodo(newTodo);
};

const processClickEvent = function (e) {
  /**
   * Event Handler for Click Event
   **/

  //get the closest button parent
  let event = e.target.closest("button");

  //guard clause - if there is no button parent, return
  if (!event) return;

  const tag = event.dataset.tag;
  const todo = event.closest(".task");

  if (tag === "delete") {
    app.delTodo(todo);
  }

  if (tag === "complete") {
    app.completeTodo(todo);
  }
};

//DRAG AND DROP LOGIC

let dragged;

const processDragStart = function (e) {
  e.target.classList.add("hold");

  //keeping track of dragged element
  dragged = e.target;
};

const processDragEnd = function (e) {
  e.target.classList.remove("hold");

  //clear dragged element
  dragged = undefined;
};

const processDragEnter = function (e) {
  const target = e.target;

  //needs optimization
  const taskEL = target.closest(".task");
  if (taskEL && taskEL !== dragged) taskEL.classList.add("dragover");
};

const processDragLeave = function (e) {
  const target = e.target;

  //needs optimization
  const taskEL = target.closest(".task");
  if (taskEL && taskEL === target && taskEL !== dragged) {
    taskEL.classList.remove("dragover");
  }
};

const processDragOver = function (e) {
  //preventing default to allow drop event
  e.preventDefault();
};

const processDragDrop = function (e) {
  //preventing default to allow drop event
  e.preventDefault();

  const target = e.target;
  const taskEL = target.closest(".task");

  //if dropped over another task besides the dragged one
  if (taskEL && taskEL !== dragged) {
    //get the ids
    const taskElID = taskEL.dataset.id;
    const dragID = dragged.dataset.id;

    //get the todos from the app-state
    const taskElTodo = app.returnTodo(taskElID);
    const dragTodo = app.returnTodo(dragID);

    //get the current position of the todos
    const taskElPos = taskElTodo.pos;
    const dragPos = dragTodo.pos;

    //if we move a todo up, we want to insert it before the target element, otherwise after it
    const insertPos = taskElPos > dragPos ? "afterEnd" : "beforeBegin";
    taskEL.insertAdjacentElement(insertPos, dragged);

    taskEL.classList.remove("dragover");

    //update the state
    app.swapTodos(taskElID, dragID, insertPos);

    app.logState();
  }
};

const app = new App();
app.init();
