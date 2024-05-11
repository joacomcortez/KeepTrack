// import { current } from '@reduxjs/toolkit'
import axios from 'axios'
import { useSessionUser } from '../Store/userStore'
import { FolderInt } from '../types/folder'
import { TodoInt } from '../types/todo'
import { Signup } from '../types/user'

export interface User {
   username: string
   id: number | undefined
}

export async function postLogin(username: string, password: string): Promise<any | undefined> {
   let response
   try {
      console.log('antes')
      response = (
         await axios.post('http://localhost:3001/users/login', {
            username,
            password,
         })
      ).data as any
      console.log('dspues')
   } catch (err: any) {}

   return response
}

export async function getTodos(id: number): Promise<FolderInt[]> {
   const response = await axios.get(`http://localhost:3001/users/${id}/todos`)
   return response.data
}
export async function createFolder(userId: number, title: string): Promise<FolderInt> {
   const response = await axios.post(`http://localhost:3001/folders?`, { userId, title })
   return response.data
}

export async function createTodo(folderId: number, title: string): Promise<TodoInt> {
   const response = await axios.post(`http://localhost:3001/todos?`, { folderId, title })
   return response.data
}
export async function createUser(username: string, password: string): Promise<any | undefined> {
   const response = await axios.post('http://localhost:3001/users', { username, password })
   return response.data
}
export async function markCheckMark(id: number): Promise<TodoInt> {
   const response = await axios.put(`http://localhost:3001/todos/${id}/checkMarks`)
   return response.data
}
export async function updateTodo(id: number, title: string): Promise<TodoInt> {
   const response = await axios.put(`http://localhost:3001/todos/${id}`, { title })
   return response.data
}
