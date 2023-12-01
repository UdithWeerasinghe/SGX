import React, { FC, ChangeEvent, useState } from "react";
import "./App.css";
import TodoTask from "./components/TodoTask";
import { ITask } from "./Interfaces";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDealine] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [editingTask, setEditingTask] = useState<ITask | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDealine(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDealine(0);
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName !== taskNameToDelete;
      })
    );
  };

  const editTask = (task: ITask): void => {
    setEditingTask(task);
  };

  const updateTask = (): void => {
    if (editingTask) {
      const updatedList = todoList.map((t) =>
        t.taskName === editingTask.taskName ? editingTask : t
      );
      setTodoList(updatedList);
      setEditingTask(null);
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
        editTask={editTask}  
      />
    );
  })}
</div>

      {/* Edit Form */}
      {editingTask && (
        <div className="edit-form">
          <input
            type="text"
            value={editingTask.taskName}
            onChange={(e) =>
              setEditingTask({
                ...editingTask,
                taskName: e.target.value,
              })
            }
          />
          <input
            type="number"
            value={editingTask.deadline}
            onChange={(e) =>
              setEditingTask({
                ...editingTask,
                deadline: Number(e.target.value),
              })
            }
          />
          <button onClick={updateTask}>Save</button>
        </div>
      )}
    </div>
  );
};

export default App;


