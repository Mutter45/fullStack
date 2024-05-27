import { TodoDom } from "./TodoDom";
import { TodoData } from "./typing";
import { getAll, addData, removeData, updateData } from "./utils";

export class TodoEvent extends TodoDom {
  private static instance: TodoEvent;
  protected list: TodoData[] = [];
  constructor(container: HTMLElement) {
    super(container);
    this.initData();
  }
  public get() {
    return this.list;
  }
  @getAll
  private initData(list: TodoData[] = []) {
    this.list = list;
    this.initContainer(this.list);
  }
  @addData
  public addData(data: TodoData) {
    if (this.list.some((item) => item.content === data.content)) {
      alert("该项已添加");
      return;
    }
    this.list.push(data);
    this.addItem(data);
  }
  @removeData
  public removeData(id: number) {
    this.list = this.list.filter((item) => item.id !== id);
    this.removeItem(id);
  }
  @updateData
  public changeDataComplete(id: number) {
    this.list = this.list.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });
    this.changeItemComplete(id);
  }
  public static create(container: HTMLElement) {
    if (!this.instance) {
      this.instance = new TodoEvent(container);
    }
    return this.instance;
  }
}
