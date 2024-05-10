import React from 'react'
import './Todo.css'
import Checkbox from '@mui/material/Checkbox'
import { TodoInt } from '../../types/todo'
interface TodoProps {
   todo: TodoInt
}
function Todo(props: TodoProps) {
   return (
      <div className="container">
         <Checkbox className="checkbox" />
         <div className="title">{props.todo.title}</div>
      </div>
   )
}

export default Todo
