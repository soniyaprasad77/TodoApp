import React from 'react'
import TodoForm from './components/TodoFrom'
import TodoItem from './components/TodoItem'
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos); // Corrected selector
  return (
    <>
    <div className="bg-[beige] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-black">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <TodoItem />
                   
                </div>
            </div>
    </>
  )
}

export default App
