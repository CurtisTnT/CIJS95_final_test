import clsx from "clsx";
import { BsTrash } from "react-icons/bs";

export default function CheckBoxInput(props) {
  const { id, label, isCompleted, isCompletedTab, onCheck, onDeleteTask } =
    props;

  return (
    <div className="check-box-input-ctn">
      <input
        type="checkbox"
        name={id}
        id={id}
        checked={isCompleted}
        onChange={onCheck}
      />
      <label htmlFor={id} className={clsx({ "is-completed": isCompleted })}>
        {label}
      </label>
      <button
        type="button"
        className={clsx({ invisible: !isCompletedTab })}
        onClick={onDeleteTask}
      >
        <BsTrash size={18} />
      </button>
    </div>
  );
}
