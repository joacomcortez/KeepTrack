/* eslint-disable @typescript-eslint/no-unused-vars */
// import { current } from '@reduxjs/toolkit'
import axios from 'axios'
import { useSessionUser } from '../Store/userStore'
import { FolderInt } from '../types/folder'

export interface User {
   username: string
   id: number | undefined
   url: string
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
   const response = await axios.get(`http://localhost:3001/users/getTodos?id=${id}`)
   return response.data
}

export function createUser(username: string, password: string, picture?: File) {
   let data = new FormData()
   if (picture !== undefined) {
      data.append('image', picture, picture.name)
   }
   data.append('username', username)
   data.append('password', password)
   console.log(picture)
   try {
      axios.post('http://localhost:3000/user', data, {
         headers: { 'Content-Type': 'multipart/form-data' },
      })
   } catch (err: any) {
      console.log('error')
   }
}

export async function showUser(id: number | any) {
   let response
   try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      response = (await axios.get(`http://localhost:3000/user/${id}`)).data.user as User
   } catch (err: any) {
      console.log('error')
   }
}

interface Test {
   url: string
}
