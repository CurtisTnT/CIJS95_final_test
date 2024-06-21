import { useEffect, useState } from "react";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";

import "./App.css";
import FormInput from "./components/FormInput";
import CheckBoxInput from "./components/CheckBoxInput";

const TAB_ITEMS = [
  { id: 1, label: "All" },
  { id: 2, label: "Active" },
  { id: 3, label: "Completed" },
];

function App() {
  const [selectedTab, setSelectedTab] = useState(TAB_ITEMS[0]);
  const [tasks, setTasks] = useState([]);
  const activeTasks = tasks.filter(({ isCompleted }) => !isCompleted);
  const completedTasks = tasks.filter(({ isCompleted }) => isCompleted);

  useEffect(() => {
    const tasks = localStorage.getItem("task");
    if (tasks) {
      setTasks(JSON.parse(tasks));
    }
  }, []);

  const handleAddTask = (taskDetail) => {
    const newTasks = [
      ...tasks,
      { id: uuidv4(), label: taskDetail, isCompleted: false },
    ];

    setTasks(newTasks);
    localStorage.setItem("task", JSON.stringify(newTasks));
  };

  const handleOnCheck = (selectedTask) => {
    const newTasks = tasks.map((prevTask) =>
      selectedTask.id === prevTask.id
        ? {
            ...prevTask,
            isCompleted: !prevTask.isCompleted,
          }
        : prevTask
    );

    setTasks(newTasks);
    localStorage.setItem("task", JSON.stringify(newTasks));
  };

  const handleDeleteTask = (selectedTask) => {
    const isConfirm = confirm(
      `Do you want to delete task: ${selectedTask.label}?`
    );

    if (isConfirm) {
      const newTasks = tasks.filter(({ id }) => selectedTask.id !== id);

      setTasks(newTasks);
      localStorage.setItem("task", JSON.stringify(newTasks));
    }
  };

  const handleDeleteAllTasks = () => {
    const isConfirm = confirm("Do you want to delete all completed tasks?");

    if (isConfirm) {
      setTasks([]);
      localStorage.setItem("task", JSON.stringify([]));
    }
  };

  return (
    <main className="app-container">
      <div>
        <h1 className="app-title">#todo</h1>

        <div className="tab-container">
          {TAB_ITEMS.map((tab) => {
            const { id, label } = tab;
            const isSelected = selectedTab.id === id;
            return (
              <button
                key={id}
                type="button"
                className={clsx("tab-btn", {
                  active: isSelected,
                })}
                onClick={() => setSelectedTab(tab)}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="content-ctn">
          {selectedTab.id === 1 && (
            <>
              <FormInput onAddTask={handleAddTask} />
              <div className="tasks-container">
                {tasks.length ? (
                  tasks.map((task) => (
                    <CheckBoxInput
                      key={task.id}
                      {...task}
                      onCheck={() => handleOnCheck(task)}
                    />
                  ))
                ) : (
                  <p>There is no tasks, please add a new one!</p>
                )}
              </div>
            </>
          )}

          {selectedTab.id === 2 && (
            <>
              <FormInput onAddTask={handleAddTask} />
              <div className="tasks-container">
                {activeTasks.length ? (
                  activeTasks.map((task) => (
                    <CheckBoxInput
                      key={task.id}
                      {...task}
                      onCheck={() => handleOnCheck(task)}
                    />
                  ))
                ) : (
                  <p>There is no active tasks, please add a new one!</p>
                )}
              </div>
            </>
          )}

          {selectedTab.id === 3 && (
            <div className="tasks-container">
              {completedTasks.length ? (
                <>
                  {completedTasks.map((task) => (
                    <CheckBoxInput
                      key={task.id}
                      {...task}
                      isCompletedTab
                      onCheck={() => handleOnCheck(task)}
                      onDeleteTask={() => handleDeleteTask(task)}
                    />
                  ))}
                  <button
                    type="button"
                    className="delete-all-btn"
                    onClick={handleDeleteAllTasks}
                  >
                    Delete all
                  </button>
                </>
              ) : (
                <p>
                  There is no completed tasks, please complete your active tasks
                  or add a new task!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
