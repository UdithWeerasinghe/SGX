import React from "react";
import { ITask } from "../Interfaces";

interface Props {
  task: ITask;
  completeTask(taskNameToDelete: string): void;
  editTask(task: ITask): void;
}

const TodoTask = ({ task, completeTask,editTask }: Props) => {
  return (
    <div className="task">
      <div className="content">
        <span>{task.taskName}</span>
        <span>{task.deadline}</span>
      </div>
      <div>
        <button onClick={() => editTask(task)}>Edit</button>
        <button onClick={() => completeTask(task.taskName)}>X</button>
      </div>
    </div>
  );
};

export default TodoTask;
  