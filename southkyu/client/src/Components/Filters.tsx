export default function Filters() {
  return (
    <div className="count-container">
      <span className="todo-count">
        총 <strong>0</strong> 개
      </span>
      <ul className="filters">
        <li>
          <a className="all selected" href="#/">
            전체보기
          </a>
        </li>
        <li>
          <a className="active" href="#/active">
            해야할 일
          </a>
        </li>
        <li>
          <a className="completed" href="#/completed">
            완료한 일
          </a>
        </li>
      </ul>
    </div>
  );
}
