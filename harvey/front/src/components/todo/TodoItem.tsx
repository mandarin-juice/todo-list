import React, { useState } from "react";
import { TodoOnPage, PageState, TodoState } from "../../types";
import {
  deleteTodoRequest,
  updateTodoRequest,
  getTodos,
} from "../../utils/apis";
import { TODO_STATE_EMOJI_MAP, ENTER_KEY } from "../../utils/constants";

interface FromParent {
  todos: Array<TodoOnPage>;
  setTodos: React.Dispatch<React.SetStateAction<Array<TodoOnPage>>>;
  todoStateFilter: TodoState | undefined;
  todoId: string;
}

function TodoItem(props: TodoOnPage & FromParent) {
  const {
    todoId,
    content,
    state,
    pageState,
    todos,
    setTodos,
    todoStateFilter,
  } = props;

  const [editingContent, setEditingContent] = useState<{
    [key: string]: string;
  }>({});

  const editContent = (targetKey: string) => {
    const targetIndex = todos.findIndex(({ key }) => key === targetKey);
    console.log("targetIndex", targetIndex);
    if (targetIndex === undefined) {
      return;
    } else {
      const targetTodo = todos[targetIndex];
      targetTodo.pageState = PageState.edit;
      const copiedTodos = todos.slice();
      copiedTodos[targetIndex] = targetTodo;
      setTodos(copiedTodos);

      editingContent[targetKey] = targetTodo.content;
      setEditingContent(editingContent);
    }
  };
  const deleteTodo = async (key: string) => {
    await deleteTodoRequest(key);
    setTodos(await getTodos(todoStateFilter));
  };
  const changeTodoStateState = async (key: string, state: TodoState) => {
    await updateTodoRequest(
      key,
      JSON.stringify({
        state,
      })
    );
    setTodos(await getTodos(todoStateFilter));
  };

  const showActionButtons = (state: TodoState, key: string) => {
    if (state === TodoState.created) {
      return (
        <>
          <button
            className="progress"
            onClick={() => changeTodoStateState(key, TodoState.progress)}
          ></button>
          <button
            className="done"
            onClick={() => changeTodoStateState(key, TodoState.done)}
          ></button>
        </>
      );
    }
    if (state === TodoState.progress) {
      return (
        <>
          <button
            className="new"
            onClick={() => changeTodoStateState(key, TodoState.created)}
          ></button>
          <button
            className="done"
            onClick={() => changeTodoStateState(key, TodoState.done)}
          ></button>
        </>
      );
    }
    if (state === TodoState.done) {
      return (
        <>
          <button
            className="new"
            onClick={() => changeTodoStateState(key, TodoState.created)}
          ></button>
          <button
            className="progress"
            onClick={() => changeTodoStateState(key, TodoState.progress)}
          ></button>
        </>
      );
    }
  };

  const changeEditingContent = (
    e: React.KeyboardEvent<HTMLInputElement>,
    key: string
  ) => {
    let target: {
      [key: string]: string;
    } = { ...editingContent };
    target[key] = e.target.value;
    setEditingContent(target);
  };

  const submitChangeEditingContent = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    key: string
  ) => {
    if (e.key !== ENTER_KEY) {
      return;
    }
    await updateTodoRequest(
      key,
      JSON.stringify({
        content: editingContent[key],
      })
    );
    setTodos(await getTodos(todoStateFilter));
  };

  return (
    <li key={todoId} className={pageState}>
      <div className="view">
        <span>{TODO_STATE_EMOJI_MAP[state]}</span>
        <label className="label" onClick={() => editContent(todoId)}>
          {content}
        </label>

        <div className="actions">
          {showActionButtons(state, todoId)}
          <button
            className="destroy"
            onClick={() => deleteTodo(todoId)}
          ></button>
        </div>
      </div>
      <input
        className="edit"
        value={editingContent[todoId]}
        onChange={(e: React.KeyboardEvent<HTMLInputElement>) =>
          changeEditingContent(e, todoId)
        }
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
          submitChangeEditingContent(e, todoId)
        }
      />
    </li>
  );
}

export default TodoItem;
