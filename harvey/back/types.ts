export enum UITodoFilterState {
  all = "all",
  progress = "progress",
  done = "done",
}

export enum TodoState {
  created = "created",
  progress = "progress",
  done = "done",
}

export enum PageState {
  view = "view",
  edit = "edit",
}

export interface TodoOnPage {
  key: string;
  content: string;
  state: TodoState;
  pageState: PageState;
}

class Uuid {
  generateUUID() {
    let d = new Date().getTime(),
      d2 = (performance && performance.now && performance.now() * 1000) || 0;
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = Math.random() * 16;
      if (d > 0) {
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === "x" ? r : (r & 0x7) | 0x8).toString(16);
    });
  }
}

export class Todo extends Uuid {
  key: string;
  content: string;
  state: TodoState;

  constructor(content: string, state: TodoState) {
    super();
    this.key = this.generateUUID();
    this.content = content;
    this.state = state;
  }

  update(content: string, state: TodoState): void {
    this.content = content;
    this.state = state;
  }

  public static wrap(content: string, state: TodoState, key: string) {
    const target = new Todo(content, state);
    target.key = key;
    return target;
  }
}
