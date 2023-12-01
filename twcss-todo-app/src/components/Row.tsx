type Todo = {
    id: string;
    task: string;
    isCompleted: boolean;
  };
  
  type TodoProps = {
    todo: Todo;
    handleDeleteTodo: (id: string) => void;
    handleCheckTodo: (id: string) => void;
  };
  
  export const Row = ({
    todo: { task, isCompleted, id },
    handleDeleteTodo,
    handleCheckTodo,
  }: TodoProps) => {
    return (
      <div
        className={`flex transition duration-200 mb-2 w-full rounded  p-4 justify-between items-center ${
          isCompleted ? 'bg-gray-200 ' : 'bg-green-300/50'
        }`}
      >
        <p
          className={`ml-2  text-xl font-sans font-normal first-letter:capitalize
           ${isCompleted ? 'text-gray-600/50 line-through' : 'text-gray-900/50'}
          `}
        >
          {task}
        </p>
        <div className='flex items-center justify-between w-1/6 mr-2'>
          <button
            className='flex justify-center font-semibold text-white transition duration-75 rounded h-7 w-7 bg-red-400/50 item-center hover:bg-red-500/50'
            aria-label='Delete a todo'
            onClick={() => handleDeleteTodo(id)}
          >
            x
          </button>
          <input
            className='h-7 w-7'
            type='checkbox'
            checked={isCompleted}
            onChange={() => handleCheckTodo(id)}
          />
        </div>
      </div>
    );
  };

  export {};
