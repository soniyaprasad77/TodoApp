import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTodo,
  editTodo,
  toggleCompleted,
} from "../features/todo/todoSlice.js";

function TodoItem() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos); // Corrected selector
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  //console.log( "editable : " + isTodoEditable);
  const handleEditChange = (e, id) => {
    const newText = e.target.value;
    dispatch(editTodo({ id, text: newText }));
  };


  return (
    <div>
      {todos.map((todo) => (
        <div
          key={todo.id} // Make sure to provide a unique key when rendering lists
          className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
            todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
          }`}
          style={{ marginBottom: '10px' }}
        >
          <input
            type="checkbox"
            className="cursor-pointer"
            checked={todos.completed}
            onChange={() => dispatch(toggleCompleted({ id: todo.id }))}
          />
         {console.log(todo.completed)}
          <input
            type="text"
            className={`border outline-none w-full bg-transparent rounded-lg ${
              isTodoEditable ? "border-black/10 px-2" : "border-transparent"
            } ${todos.completed ? "line-through" : ""}`}
            value={todo.text}
            onChange={(e) => handleEditChange(e, todo.id)} // Corrected onChange function
            readOnly={!isTodoEditable}
          />
         {console.log(todo.text)}
         <button
            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
            onClick={() => {
              if (todo.completed) return;

              if (isTodoEditable) {
                setIsTodoEditable(false); // Exiting edit mode
              } else {
                setIsTodoEditable(true); // Entering edit mode
              }
            }}
            disabled={todo.completed}
          >
            {isTodoEditable ? "✔" : "✏️"}
          </button>


          {/* Delete Todo Button */}
          <button
            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
            onClick={() => dispatch(deleteTodo({ id: todo.id }))} // Corrected onClick function
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
}

export default TodoItem;
