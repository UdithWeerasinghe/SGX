
// TodoTask.tsx

import React, { useState, ChangeEvent } from "react";
import { ITask } from "../Interfaces";

interface Props {
  task: ITask;
  completeTask(taskNameToDelete: string): void;
  editTask(task: ITask): void;
}

const TodoTask = ({ task, completeTask, editTask }: Props) => {
  const [editedTask, setEditedTask] = useState<ITask>({ ...task });
  const [isEditing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
    editTask(editedTask); // Pass the edited task to the parent component
  };

  const handleSaveClick = () => {
    setEditing(false);
    editTask(editedTask); // Pass the edited task to the parent component
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: name === "deadline" ? Number(value) : value,
    }));
  };

  return (
    <div className="task">
      {isEditing ? (
        <div className="content">
          <input
            type="text"
            name="taskName"
            value={editedTask.taskName}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="deadline"
            value={editedTask.deadline}
            onChange={handleInputChange}
          />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <>
          <div className="content">
            <span>{task.taskName}</span>
            <span>{task.deadline}</span>
          </div>
          <button onClick={() => completeTask(task.taskName)}>X</button>
          <button onClick={handleEditClick}>Edit</button>
        </>
      )}
    </div>
  );
};

export default TodoTask;



