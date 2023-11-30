
// App.tsx

import React, { FC, ChangeEvent, useState } from "react";
import TodoTask from "./components/TodoTask";
import { ITask } from "./Interfaces";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [editTask, setEditTask] = useState<ITask | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    if (name === "task") {
      setTask(value);
    } else {
      setDeadline(Number(value));
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadline(0);
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName !== taskNameToDelete;
      })
    );
  };

  const editExistingTask = (editedTask: ITask): void => {
    setEditTask(editedTask);
  };

  const saveEditedTask = (): void => {
    if (editTask) {
      const updatedList = todoList.map((task) =>
        task.taskName === editTask.taskName ? editTask : task
      );

      setTodoList(updatedList);
      setEditTask(null);
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 App">
      <div className="flex items-center justify-between p-4 header bg-tomato">
        <div className="flex inputContainer">
          <input
            type="text"
            placeholder="Task..."
            name="task"
            value={task}
            onChange={handleChange}
            className="p-2 border border-blue-300 rounded-l-md"
          />
          <input
            type="number"
            placeholder="Deadline (in Days)..."
            name="deadline"
            value={deadline}
            onChange={handleChange}
            className="p-2 border border-green-300 rounded-r-md"
          />
        </div>
        <button onClick={addTask} className="px-4 py-2 bg-white rounded-md text-tomato">
          Add Task
        </button>
      </div>
      <div className="p-4 todoList">
        {todoList.map((task: ITask) => (
          <TodoTask key={task.taskName} task={task} completeTask={completeTask} editTask={editExistingTask} />
        ))}
      </div>
      {editTask && (
        <div className="p-4 editContainer">
          <button onClick={saveEditedTask} className="px-4 py-2 text-white rounded-md bg-tomato">
            Save Edited Task
          </button>
        </div>
      )}
    </div>
  );
};

export default App;



