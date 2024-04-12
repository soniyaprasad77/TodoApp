import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
      id: 1,
      text: "Learn Redux",
      completed: false, // Assuming default value for completed property
    },
  ],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload.text,
        completed: action.payload.completed || false, // Default value for completed
      };
      state.todos.push(todo);
      console.log(todo)
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    editTodo: (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[index].text = action.payload.text;
    },
    toggleCompleted: (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[index].completed = !state.todos[index].completed;
    },
  },
});

export const { addTodo, deleteTodo, editTodo, toggleCompleted } = todoSlice.actions;

export default todoSlice.reducer;
