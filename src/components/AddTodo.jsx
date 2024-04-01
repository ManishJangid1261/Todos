import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/TodoSlice';

function AddTodo() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    dispatch(addTodo({ todo: input, completed: false }));
    setInput('');
  };

  return (
    <form onSubmit={addTodoHandler} className="space-x-3 mt-12 ">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out sm:w-2/4 w-3/4"
        placeholder="Enter Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="text-white font-semibold bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-6 sm:mt-0"
      >
        Add Todo
      </button>
    </form>
  );
}

export default AddTodo;