import React from "react";
import { TodoState } from "../../types";

interface Props {
  todoStateFilter: TodoState | undefined;
  showTodosByState: (
    e: React.MouseEvent<HTMLElement>,
    state?: TodoState
  ) => void;
}

const ITEM_MAP = [
  {
    label: "전체보기",
    state: undefined,
  },
  {
    label: "새로운 일",
    state: TodoState.created,
  },
  {
    label: "하고 있는 일",
    state: TodoState.progress,
  },
  {
    label: " 완료한 일",
    state: TodoState.done,
  },
];

function FilterItems(props: Props) {
  const { todoStateFilter, showTodosByState } = props;
  return (
    <>
      {ITEM_MAP.map(({ label, state }, index) => {
        return (
          <li key={index}>
            <button
              className={`${todoStateFilter === state && "selected"}`}
              onClick={(e) => showTodosByState(e, state)}
            >
              {label}
            </button>
          </li>
        );
      })}
    </>
  );
}

export default FilterItems;
