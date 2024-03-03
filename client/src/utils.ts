import { TodoData } from "./TodoEvent";
import { getList, addTodo, removeTodo, updateTodo } from "./api";
export const getAll = (
  /**当前装饰的函数的类容器 */
  _target: any,
  /**被装饰的函数的名称 */
  _propertyKey: string,
  /**描述属性 */
  descriptor: PropertyDescriptor
) => {
  const _original = descriptor.value;

  descriptor.value = async function () {
    const { error, data } = await getList();
    if (error) return;
    return _original.call(this, data);
  };
};
export const addData = (
  /**当前装饰的函数的类容器 */
  _target: any,
  /**被装饰的函数的名称 */
  _propertyKey: string,
  /**描述属性 */
  descriptor: PropertyDescriptor
) => {
  const _original = descriptor.value;
  descriptor.value = async function (todoData: TodoData) {
    const { error, data } = await addTodo(todoData);
    if (error) return;
    return _original.call(this, data);
  };
};
export const removeData = (
  /**当前装饰的函数的类容器 */
  _target: any,
  /**被装饰的函数的名称 */
  _propertyKey: string,
  /**描述属性 */
  descriptor: PropertyDescriptor
) => {
  const _original = descriptor.value;
  descriptor.value = async function (id: number) {
    const { error, data } = await removeTodo(id);
    if (error) return;
    return _original.call(this, +data.id);
  };
};
export const updateData = (
  /**当前装饰的函数的类容器 */
  _target: any,
  /**被装饰的函数的名称 */
  _propertyKey: string,
  /**描述属性 */
  descriptor: PropertyDescriptor
) => {
  const _original = descriptor.value;
  descriptor.value = async function (id: number) {
    const { error, data } = await updateTodo(id);
    if (error) return;
    return _original.call(this, +data.id);
  };
};
