import { TodoData } from "./TodoEvent";
import { createTodoItem } from "./template";
export class TodoDom {
  private container: HTMLElement;
  constructor(container: HTMLElement) {
    this.container = container;
  }
  protected initContainer(list: TodoData[] = []) {
    let htmlFragment: DocumentFragment = document.createDocumentFragment();
    list.forEach((itemData) => {
      const item = createTodoItem(itemData);
      const div = document.createElement("div");
      div.innerHTML = item;
      htmlFragment.append(div);
    });
    this.container.appendChild(htmlFragment);
  }
  protected addItem(data: TodoData) {
    const item = createTodoItem(data);
    const div = document.createElement("div");
    div.className = "todo-item";
    div.innerHTML = item;
    this.container.appendChild(div);
  }
  protected removeItem(id: number) {
    const checkboxItem = this.container.querySelector(`[data-id="${id}"]`);
    if (checkboxItem) {
      checkboxItem.parentElement.remove();
    }
  }
  protected changeItemComplete(id: number) {
    const checkboxItem = this.container.querySelector(`[data-id="${id}"]`);
    checkboxItem.nextElementSibling.classList.toggle("completed");
  }
}
