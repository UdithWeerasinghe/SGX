//import PlusIcon from '../assets/plus.svg';

import { ChangeEvent, FormEvent } from 'react';


export type AddTodoProps = {
  task: string;
  handleSubmitTodo: (e: FormEvent) => void;
  handleChange: (e: ChangeEvent) => void;
};

export const AddTodo = ({
  task,
  handleSubmitTodo,
  handleChange,
}: AddTodoProps) => {
  return (
    <form
      className='flex items-center justify-between w-full mb-2'
      onSubmit={handleSubmitTodo}
    >
      <input
        className='flex-1 py-2 pl-5 mr-2 text-gray-900 rounded outline-none drop-shadow'
        type='text'
        name='task'
        value={task}
        onChange={handleChange}
      />
      <button type='submit' aria-label='Add todo'>
      <span className="plus-icon">+</span>
      

      </button>
    </form>
  );
};

export {};
