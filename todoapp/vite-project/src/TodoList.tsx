import React, {useState} from "react";

export const TodoList = () => {
  return (
    <div className="main-container">
        <h1>TodoList</h1>
        <ul>
            <li>item 1</li>
            <li>item 2</li>
        </ul>
        <input type="text" placeholder= "Add todo item" />
            <button>Add</button>
    </div>
  );
};
