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

  //State of the app
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

    //Set the date in the input form to current date
    inputDate.setAttribute("value", new Date().toISOString().slice(0, 10));
  }

  addTodo(todoObj) {
    /**
     * adds a todo to the state of the app
     * @param todoObj {Todo} - todo - Object created with Todo class   *
     */
    todoObj.pos = this.#state.todos.length + 1;
    this.#state.todos.push(todoObj);
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
    let { id, category, description, date, pos } = todoObj;
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

    taskContainer.insertAdjacentHTML("beforeend", markup);
  }

  returnTodo(id) {
    return this.#state.todos.find((el) => el.id === +id);
  }

  logTodos() {
    console.log(this.#state.todos);
  }
}
class Todo {
  /**
   * Represents a single Todo
   * @param title {string} - title of the todo
   * @param date {Date} - date the todo must be completed
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
    console.log(this);
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
  app.renderTodo(newTodo);
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

let dragged;

const processDragStart = function (e) {
  e.target.classList.add("hold");
  dragged = e.target;
};

const processDragEnd = function (e) {
  e.target.classList.remove("hold");
};

const processDragEnter = function (e) {
  const target = e.target;
  const taskEL = target.closest(".task");
  if (taskEL && taskEL !== dragged) taskEL.classList.add("dragover");
};

const processDragLeave = function (e) {
  const target = e.target;
  const taskEL = target.closest(".task");
  if (taskEL && taskEL === target && taskEL !== dragged) {
    taskEL.classList.remove("dragover");
  }
};

const processDragOver = function (e) {
  e.preventDefault();
};

const processDragDrop = function (e) {
  e.preventDefault();
  const target = e.target;
  const taskEL = target.closest(".task");

  if (taskEL && taskEL !== dragged) {
    const taskElTodo = app.returnTodo(taskEL.dataset.id);
    const taskElPos = taskElTodo.pos;

    const dragTodo = app.returnTodo(dragged.dataset.id);
    const dragPos = dragTodo.pos;

    console.log("BEFORE");
    console.log(taskElTodo);
    console.log(dragTodo);

    const insertPos = taskElPos > dragPos ? "afterEnd" : "beforeBegin";

    taskEL.insertAdjacentElement(insertPos, dragged);
    taskEL.classList.remove("dragover");

    dragTodo.pos = taskElPos;
    taskElTodo.pos = insertPos === "afterEnd" ? taskElPos - 1 : taskElPos + 1;

    console.log("AFTER");
    console.log(taskElTodo);
    console.log(dragTodo);

    console.log(app.logTodos());
  }
};

// const getDragAfterElement = function (mouseY) {
//   const tasks = Array.from(document.querySelectorAll(".task:not(.hold)"));

//   return tasks.reduce(
//     (closest, child) => {
//       const box = child.getBoundingClientRect();

//       //get the center
//       const offset = mouseY - box.top - box.height / 2;

//       if (offset < 0 && offset > closest.offset) {
//         return { offset: offset, element: child };
//       } else {
//         return closest;
//       }
//     },
//     { offset: Number.NEGATIVE_INFINITY }
//   ).element;
// };

const app = new App();
app.init();
