/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import '../stylesheet/Login.css'
import '../stylesheet/CreateUser.css'
import { createUser } from './userService'
function CreateUser() {
   //recursos
   const navigate = useNavigate()
   const [user, setUser] = useState<string>('')
   const [password, setPassword] = useState<string>('')
   const [picture, setPicture] = useState<File>()
   //funcion para ejecutar

   function handleForm(e: any) {
      e.preventDefault()
      const test = createUser(user, password, picture)
      if (user !== undefined) {
         navigate('/')
      }
   }
   return (
      <div className="wrapper">
         <div className="text-center mt-4 name">Calera</div>
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
               <input type="password" name="password" id="pwd" placeholder="Password" />
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
            <p className="uploadpicture">Upload profile picture</p>
            <div className="picture">
               <input
                  type="file"
                  onChange={(e: any) => {
                     setPicture(e.target.files[0])
                  }}
                  accept="image/*"
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
