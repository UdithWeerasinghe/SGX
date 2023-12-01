import { useState, ChangeEvent, FormEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Row } from './Row';
import { data } from '../todos';
import { AddTodo } from './AddTodo';

type Todo = {
  id: string;
  task: string;
  isCompleted: boolean;
};

export const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>(data);
  const [task, setTask] = useState('');

  const todoLength = todos.length;
  const hasTodos = todos.length > 0;
  const remainingTodos = todos.filter((todo) => !todo.isCompleted).length;

  const handleAddTodo = (todo: Todo) => {
    const updateTodos = [...todos, todo];
    setTodos(updateTodos);
    setTask('');
  };

  const handleSubmitTodo = (e: FormEvent) => {
    e.preventDefault();

    const todo = {
      id: uuidv4(),
      task: task,
      isCompleted: false,
    };

    task && handleAddTodo(todo);
  };

  const handleChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setTask(value);
  };

  const handleDeleteTodo = (id: string) => {
    const updateTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updateTodos);
  };

  const handleCheckTodo = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <section className='flex flex-col items-center max-w-2xl w-10/11 lg:w-1/2 xl:w-10/12'>
      <AddTodo
        task={task}
        handleSubmitTodo={handleSubmitTodo}
        handleChange={handleChange}
      />
      {todos.map((todo) => (
        <Row
          key={todo.id}
          todo={todo}
          handleDeleteTodo={handleDeleteTodo}
          handleCheckTodo={handleCheckTodo}
        />
      ))}

      {!hasTodos && (
        <p className='mb-5 text-xl text-red-500'>Please add a todo!</p>
      )}

      {hasTodos && (
        <p>{`[${remainingTodos} of ${todoLength}] todos remaining`}</p>
      )}
    </section>
  );
};

export {};
