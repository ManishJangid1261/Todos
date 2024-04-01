import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
};

export const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        Text: action.payload.todo,
        completed: action.payload.completed,
      };
      state.todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    editTodo: (state, action) => {
      const { id, newText } = action.payload;
      state.todos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, Text: newText } : todo
      );
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    toggleCompleted: (state, action) => {
      const id = action.payload;
      state.todos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    removeTodo: (state, action) => {
      const id = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
});

export const { addTodo, removeTodo, editTodo, toggleCompleted } = TodoSlice.actions;

export default TodoSlice.reducer;