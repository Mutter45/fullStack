import { TodoData } from './typing';
/**
 * 创建待办事项
 * @param {TodoData} data - 待办事项数据
 * @returns {string} - 待办事项的HTML字符串
 */
export function createTodoItem({ content, complete, id }: TodoData): string {
  return `
  <div class="todo-item">
    <input type="checkbox"  data-id="${id}" ${complete ? 'checked' : ''} />
    <span class="${complete ? 'completed' : ''}">${content}</span>
    <button data-id="${id}">删除</button>
  </div>
  `;
}
