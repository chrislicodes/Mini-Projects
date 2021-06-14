import { Todo } from "../../entities/Todo";
import icons from "../../../img/sprites.svg";

export default class TodoView {
  render(todoObj: Todo): string {
    /**
     * renders todo object to the dom
     * @param todoObj {Todo} - todo - Object created with Todo class
     */
    if (!todoObj) return;

    const markup = this._generateMarkup(todoObj);

    return markup;
  }

  _generateMarkup(todoObj: Todo) {
    /**
     * generates the markup to render the todo
     * @param todoObj {Todo} - todo - Object created with Todo class
     */
    const { uuid, title, description } = todoObj;

    return `
    <article class="card-item" data-uuid=${uuid} draggable="true">
        <div class="card-item__header">
            <h3 class="card-item__title" contenteditable="true">${title}</h3>
            <div class="card-item__buttons">
                <button type="submit" data-tag="delete" class="btn-delete">
                    <svg>
                        <use xlink:href="${icons}#icon-bin"></use>
                    </svg>
                </button>
            </div>
        </div>
        <p class="card-item__description" contenteditable="true">${description}</p>
    </article>`;
  }
}
