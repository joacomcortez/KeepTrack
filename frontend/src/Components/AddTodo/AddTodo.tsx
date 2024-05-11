import React, { useState } from 'react'
import { TodoInt } from '../../types/todo' // Import the TodoInt type

interface Props {
   onSubmit: (newTodo: TodoInt) => void // Function to handle form submission
}

const NewTodoForm: React.FC<Props> = ({ onSubmit }) => {
   const [title, setTitle] = useState('')

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      // Check if title is not empty
      if (title.trim() !== '') {
         const newTodo: TodoInt = {
            title: title,
            check: false, // Assuming newly created todo is unchecked by default
            id: Date.now(), // Generate unique id for the todo
         }
         onSubmit(newTodo) // Emit event with new todo data
         setTitle('') // Clear input field after submission
      }
   }

   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value)
   }

   return (
      <form onSubmit={handleSubmit}>
         <input type="text" value={title} onChange={handleTitleChange} placeholder="Enter todo title" />
         <button type="submit">Add Todo</button>
      </form>
   )
}

export default NewTodoForm
