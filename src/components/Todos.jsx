import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, toggleCompleted, editTodo } from "../features/TodoSlice";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editingText, setEditingText] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    setEditingText(todo.Text);
    setEditingId(id);
  };

  const handleEditChange = (e) => {
    setEditingText(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(editTodo({ id: editingId, newText: editingText }));
    setEditingText("");
    setEditingId(null);
  };

  return (
    <>
      <ul className="list-none  ">
        {todos.map((todo) => (
          <li
            className={`mt-4  flex  items-center bg-zinc-800 px-4 py-2 rounded w-full ${
              todo.completed ? "text-gray-400 line-through" : "text-white"
            }`}
            key={todo.id}
          >
            <div className="flex w-3/4 justify-evenly sm:justify-between">

           
            {editingId === todo.id ? (
              <form onSubmit={handleEditSubmit} className="flex w-3/4 sm:w-full sm:justify-between justify-evenly">
                <input
                  type="text"
                  className="bg-gray-800 rounded border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mr-4 sm:w-2/4 w-2/4"
                  placeholder="Enter a Todo..."
                  value={editingText}
                  onChange={handleEditChange}
                />
                <button type="submit">📁</button>
               
              </form>
            ) : (
              <>
                <div>{todo.Text}</div>
                {!todo.completed && (
                  <button onClick={() => handleEdit(todo.id)}>✏️</button>
                )}
              </>
            )}
             </div>
            <div className="flex  justify-end w-1/4">
              <button
                onClick={() => dispatch(toggleCompleted(todo.id))}
                className="text-white border-0 bg-green-400 hover:bg-green-700 py-1 px-4 focus:outline-none rounded text-md "
              >
                {todo.completed ? "↺" : "✔️"}
              </button>
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-white border-0 py-1 px-4 focus:outline-none  rounded text-md"
              >
               ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;