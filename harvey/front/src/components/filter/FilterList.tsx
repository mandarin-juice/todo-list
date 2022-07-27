import React from "react";

interface Props {
  totalCount: number;
  children: React.ReactElement;
}

function FilterList(props: Props) {
  const { totalCount, children } = props;
  return (
    <div className="count-container">
      <span className="todo-count">
        총 <strong>{totalCount}</strong> 개
      </span>
      <ul className="filters">{children}</ul>
    </div>
  );
}

export default FilterList;
