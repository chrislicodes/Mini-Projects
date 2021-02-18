class TodoView {
  _inputForm = document.querySelector(".input-form");
  _inputText = document.querySelector(".input-form__description");
  _todoContainer = document.querySelector(".todo-list");
  _lang = navigator.language;

  render(todoObj) {
    /**
     * renders todo object to the dom
     * @param todoObj {Todo} - todo - Object created with Todo class
     */
    if (!todoObj) return;

    const markup = this._generateMarkup(todoObj);

    this._todoContainer.insertAdjacentHTML("beforeEnd", markup);
  }

  clearView() {
    this._todoContainer.innerHTML = "";
  }

  _generateMarkup(todoObj) {
    /**
     * generates the markup to render the todo
     * @param todoObj {Todo} - todo - Object created with Todo class
     */
    let { id, category, description, dateToComplete } = todoObj;

    const dateFormat = formatDate(dateToComplete);
    const timeFormat = formatTime(dateToComplete);

    return `
    <li class="todo-list-item" data-id=${id}>
      <article class="todo-list-item-content">
          <div class="icon-container">
              <svg class="todo-icon">
                  <use xlink:href="./img/sprites.svg#${category}"></use>
              </svg>
          </div>

          <div class="todo-description">
              <h3>${description}</h3>
              <time datetime="${dateToComplete}">${dateFormat} - ${timeFormat}</time>
          </div>

          <button type="submit" data-tag="complete" class="btn-complete">
              <svg>
                  <use xlink:href="./img/sprites.svg#icon-checkmark"></use>
              </svg>
          </button>
          <button type="submit" data-tag="delete" class="btn-delete">
              <svg>
                  <use xlink:href="./img/sprites.svg#icon-cross"></use>
              </svg>
          </button>
      </article>
  </li>`;
  }

  addSubmitHandler(handler) {
    this._inputForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(this._inputForm);
      const data = {};

      //populate data-object
      formData.forEach((value, key) => (data[key] = value));

      //clean input Form
      this._inputText.value = "";

      console.log(data);

      //pass data to controller
      handler(data);
    });
  }
}
