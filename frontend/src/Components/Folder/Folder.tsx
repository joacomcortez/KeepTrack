import React, { useState } from 'react'
import './folder.css'
import { TodoInt } from '../../types/todo'
import { FolderInt } from '../../types/folder'
import AddIcon from '@mui/icons-material/Add'
import TextField from '@mui/material/TextField'
import EditIcon from '@mui/icons-material/Edit'
import { createTodo, markCheckMark, updateTodo } from '../../User/userService'

interface Props {
   folder: FolderInt
   updateFolder: (updatedFolder: FolderInt) => void
}

function Folder(props: Props) {
   const [showPopup, setShowPopup] = useState(false)
   const [newTodoTitle, setNewTodoTitle] = useState('')
   const [editingTodo, setEditingTodo] = useState<TodoInt | null>(null)
   const [editTodoTitle, setEditTodoTitle] = useState<string>('')

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

   async function handleEditTodo(todo: TodoInt) {
      setEditingTodo(todo)
      setEditTodoTitle(todo.title as string)
   }

   async function handleUpdateTodo() {
      if (editingTodo && editTodoTitle.trim() !== '') {
         try {
            const updatedTodo = await updateTodo(editingTodo.id, editTodoTitle)
            const updatedTodos = props.folder.todos.map((todo) =>
               todo.id === updatedTodo.id ? updatedTodo : todo
            )
            props.updateFolder({
               ...props.folder,
               todos: updatedTodos,
            })
            setEditingTodo(null)
            setEditTodoTitle('')
         } catch (err) {
            console.error('Error updating todo:', err)
         }
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
                     <div className="editTodo" onClick={() => handleEditTodo(todo)}>
                        <EditIcon />
                     </div>
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
         {editingTodo && (
            <div className="popup">
               <form className="popupContent" onSubmit={handleUpdateTodo}>
                  <TextField
                     className="enterTodoTitle"
                     onChange={(e) => setEditTodoTitle(e.target.value)}
                     value={editTodoTitle}
                     id="standard-basic"
                     label="enter new title"
                     variant="standard"
                  />
                  <div className="popupButtons">
                     <button type="button" onClick={() => setEditingTodo(null)}>
                        Cancel
                     </button>
                     <button type="submit">Update Todo</button>
                  </div>
               </form>
            </div>
         )}
      </div>
   )
}

export default Folder
