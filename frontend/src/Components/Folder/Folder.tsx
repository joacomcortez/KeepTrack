import React, { useState } from 'react'
import './folder.css'
import { TodoInt } from '../../types/todo'
import { FolderInt } from '../../types/folder'
import AddIcon from '@mui/icons-material/Add'
import TextField from '@mui/material/TextField'
import { createTodo, markCheckMark } from '../../User/userService'

interface Props {
   folder: FolderInt
   updateFolder: (updatedFolder: FolderInt) => void
}

function Folder(props: Props) {
   const [showPopup, setShowPopup] = useState(false)
   const [newTodoTitle, setNewTodoTitle] = useState('')

   async function handleSubmit(e: React.FormEvent) {
      e.preventDefault()
      try {
         if (newTodoTitle.trim() !== '') {
            const newTodo = await createTodo(props.folder.id, newTodoTitle)
            const updatedTodos = [...props.folder.todos, newTodo]
            props.updateFolder({
               ...props.folder,
               todos: updatedTodos,
            })
            setNewTodoTitle('')
            setShowPopup(false)
         }
      } catch (err) {
         console.error('Error creating todo:', err)
      }
   }
   async function handleCheckbox(id: number) {
      let response
      try {
         console.log('el id del todo es', id)
         response = await markCheckMark(id)
      } catch (err: any) {
         console.log('Error marking checkMark: ', err)
      }
      return response
   }
   return (
      <div className="container">
         <div className="title">{props.folder.title}</div>
         <div className="List">
            {props.folder.todos && props.folder.todos.length > 0 ? (
               props.folder.todos.map((todo: TodoInt) => (
                  <div className="eachTodo" key={todo.id}>
                     <span>{todo.title}</span>
                     <input
                        type="checkbox"
                        checked={todo.check}
                        onChange={() => {
                           handleCheckbox(todo.id)
                        }}
                     />
                  </div>
               ))
            ) : (
               <div>Add your first To do!</div>
            )}
         </div>
         <div onClick={() => setShowPopup(true)}>{showPopup == false && <AddIcon />}</div>
         {showPopup && (
            <div className="popup">
               <form className="popupContent" onSubmit={handleSubmit}>
                  <TextField
                     className="enterTodoTitle"
                     onChange={(e) => setNewTodoTitle(e.target.value)}
                     value={newTodoTitle}
                     id="standard-basic"
                     label="enter title"
                     variant="standard"
                  />
                  <div className="popupButtons">
                     <button type="button" onClick={() => setShowPopup(false)}>
                        Cancel
                     </button>
                     <button type="submit">Add Todo</button>
                  </div>
               </form>
            </div>
         )}
      </div>
   )
}

export default Folder
