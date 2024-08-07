import { TodoEvent } from './TodoEvent';
import { TodoData } from './typing';
((document) => {
  const todoContainer: HTMLElement = document.querySelector('.todo-container');
  const todoInput: HTMLInputElement = document.querySelector('.todo-input');
  const addTodo: HTMLElement = document.querySelector('.add-todo');
  /**
   * addItem
   * removeItem
   * changeItemComplete
   */
  const todoEvent = TodoEvent.create(todoContainer);
  function init() {
    bindEvents();
  }
  function handleTodoList(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const tagName = target.tagName.toLowerCase();
    const id = Number(target.dataset.id);
    if (tagName === 'button' || tagName === 'input') {
      switch (tagName) {
        case 'button':
          todoEvent.removeData(id);
          break;
        case 'input':
          todoEvent.changeDataComplete(id);
          break;
        default:
          break;
      }
    }
  }
  function handleAdd() {
    const value = todoInput.value.trim();
    if (!value) return;
    const data = <TodoData>{
      content: value,
    };
    todoEvent.addData(data);
    console.log(todoEvent.get());
    todoInput.value = '';
  }
  function bindEvents() {
    todoContainer.addEventListener('click', handleTodoList);
    addTodo.addEventListener('click', handleAdd);
  }
  init();
})(document);
