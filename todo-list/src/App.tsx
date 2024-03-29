// App.tsx

import React, { FC, ChangeEvent, useState } from "react";
import "./App.css";
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

  const saveEditedTask = (editedTask: ITask): void => {
    if (editedTask) {
      const updatedList = todoList.map((task) =>
        task.taskName === editedTask.taskName ? editedTask : task
      );

      setTodoList(updatedList);
      setEditTask(null);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task..."
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Deadline (in Days)..."
            name="deadline"
            value={deadline}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return (
            <TodoTask
              key={key}
              task={task}
              completeTask={completeTask}
              editTask={editExistingTask}
            />
          );
        })}
      </div>
      {editTask && (
        <div className="editContainer">
          <button onClick={() => saveEditedTask(editTask)}>
            Save Edited Task
          </button>
        </div>
      )}
    </div>
  );
};

export default App;



