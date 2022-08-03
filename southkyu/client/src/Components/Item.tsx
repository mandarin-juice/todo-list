import useMutation from "../hooks/useMutation";

export default function Item({ item, setState, data }: ItemProps) {
  const { title, id, isCompleted } = item;

  const [deleted] = useMutation<MutationResponse>(`/todo/${item.id}`, "DELETE");
  const [patch] = useMutation<MutationResponse>(`/todo/${item.id}`, "PATCH");
  const onChange = () => {
    const newData = data.map((item) => {
      if (item.id === id) {
        item.isCompleted = !item.isCompleted;
      }
      return item;
    });
    patch(id);
    setState((prev) => ({
      ...prev,
      data: newData,
    }));
  };

  const onClick = () => {
    const newData = data.filter((item) => item.id !== +id);
    deleted(id);
    setState((prev) => ({
      ...prev,
      data: newData,
    }));
  };

  return (
    <li className={isCompleted && `completed`}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={onChange}
          checked={isCompleted}
        />
        <label className="label">{title}</label>
        <button className="destroy" onClick={onClick}></button>
      </div>
    </li>
    // <li className="editing">
    //   <div className="view">
    //     <input className="toggle" type="checkbox" />
    //     <label className="label">수정중 타이틀</label>
    //     <button className="destroy"></button>
    //   </div>
    //   <input className="edit" value="수정중 타이틀" />
    // </li>
    // <li className="completed">
    //   <div className="view">
    //     <input className="toggle" type="checkbox" checked />
    //     <label className="label">완료된 타이틀</label>
    //     <button className="destroy"></button>
    //   </div>
    //   <input className="edit" value="완료된 타이틀" />
    // </li>
  );
}
