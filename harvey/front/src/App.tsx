import React, { useEffect, useState } from "react";

import "./App.css";
import HeaderOne from "./components/common/HeaderOne";
import { TodoState, Todo, PageState, TodoOnPage } from "./types";
import TodoList from "./components/todo/TodoList";

import { ENTER_KEY } from "./utils/constants";
import { getTodos, addTodo } from "./utils/apis";
import TodoItem from "./components/todo/TodoItem";
import FilterList from "./components/filter/FilterList";
import FilterItems from "./components/filter/FilterItems";

function App() {
  const [todoStateFilter, setTodoStateFilter] = useState<TodoState | undefined>(
    undefined
  );
  const [todoInput, setTodoInputTodo] = useState("");
  const [todos, setTodos] = useState<Array<TodoOnPage>>([]);

  const onChangetodoInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setTodoInputTodo(e.target.value);
  };
  const onTypeEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ENTER_KEY && todoInput) {
      await addTodo(todoInput);
      setTodos(await getTodos(todoStateFilter));
    }
    console.log(e);
  };

  const showTodosByState = async (
    e: React.MouseEvent<HTMLElement>,
    state?: TodoState
  ) => {
    e.preventDefault();
    setTodoStateFilter(state);
    if (state === null) {
      setTodos(await getTodos());
      return;
    }
    setTodos(await getTodos(state));
  };

  useEffect(() => {
    (async () => {
      setTodos(await getTodos());
    })();
  }, []);

  return (
    <div className="App">
      <section className="todoapp">
        <div>
          <HeaderOne>TODOS</HeaderOne>
          <input
            className="new-todo"
            placeholder="할일을 추가해주세요"
            autoFocus
            value={todoInput}
            onKeyUp={onTypeEnter}
            onChange={onChangetodoInput}
          />
        </div>
        <TodoList>
          {todos.map(({ key, content, state, pageState }: TodoOnPage) => {
            return (
              <TodoItem
                {...{
                  key,
                  todoId: key,
                  content,
                  state,
                  pageState,
                  todos,
                  setTodos,
                  todoStateFilter,
                }}
              />
            );
          })}
        </TodoList>
        <FilterList totalCount={todos?.length || 0}>
          <FilterItems
            todoStateFilter={todoStateFilter}
            showTodosByState={showTodosByState}
          ></FilterItems>
        </FilterList>
      </section>
    </div>
  );
}

export default App;
