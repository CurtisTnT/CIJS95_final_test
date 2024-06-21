import { useRef, useState } from "react";

export default function FormInput(props) {
  const { onAddTask } = props;
  const [taskDetail, setTaskDetail] = useState("");
  const inputRef = useRef(null);

  const handleAddTask = () => {
    if (!taskDetail.trim()) {
      alert("Task details must not be blank!");
      return;
    }
    onAddTask(taskDetail.trim());
    setTaskDetail("");
    inputRef.current.focus();
  };

  return (
    <div className="form-input-ctn">
      <input
        ref={inputRef}
        type="text"
        className="input"
        placeholder="add details"
        value={taskDetail}
        onChange={(e) => setTaskDetail(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
      />

      <button type="button" onClick={handleAddTask}>
        Add
      </button>
    </div>
  );
}
