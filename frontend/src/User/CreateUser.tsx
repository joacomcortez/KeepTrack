import * as React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './createUser.css'

import { createUser } from './userService'
import { updateSessionUser } from '../Store/userStore'
function CreateUser() {
   //recursos
   const navigate = useNavigate()
   const [user, setUser] = useState<string>('')
   const [password, setPassword] = useState<string>('')
   const [checkPass, setCheckPass] = useState<string>('')
   async function handleForm(e: any) {
      try {
         e.preventDefault()
         if (password == checkPass) {
            const response = await createUser(user, password)
            if (user !== undefined) {
               updateSessionUser(response.user)
               navigate('/home')
            }
         }
      } catch (err) {
         console.error('Error signing up:', err)
      }
   }
   return (
      <div className="wrapper">
         <div className="text-center mt-4 name">Keep Track</div>
         <form className="p-3 mt-3" onSubmit={(e) => handleForm(e)}>
            <div className="form-field d-flex align-items-center">
               <span className="far fa-user"></span>
               <input
                  autoFocus
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="Username"
                  autoComplete="off"
                  onChange={(e: any) => setUser(e.target.value)}
               />
            </div>
            <div className="form-field d-flex align-items-center">
               <span className="fas fa-key"></span>
               <input
                  type="password"
                  name="password"
                  id="pwd"
                  placeholder="Password"
                  onChange={(e: any) => setCheckPass(e.target.value)}
               />
            </div>
            <div className="form-field d-flex align-items-center">
               <span className="fas fa-key"></span>
               <input
                  type="password"
                  name="password"
                  id="pwd"
                  placeholder="Confirm password"
                  onChange={(e: any) => setPassword(e.target.value)}
               />
            </div>
            <button className="btn mt-3" type="submit">
               Submit
            </button>
         </form>
      </div>
   )
}

export default CreateUser
