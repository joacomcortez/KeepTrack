import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { useState } from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { postLogin } from './userService'
import { updateSessionUser } from '../Store/userStore'
import { userInfo } from 'os'

function Login() {
   const navigate = useNavigate()
   const goToCreateUser = () => navigate('/signup')

   const [error, setError] = useState<string>('')
   const [user, setUser] = useState<string>('')
   const [password, setPassword] = useState<string>('')

   async function handleForm(e: any) {
      e.preventDefault()
      const test = await postLogin(user, password)
      if (test) {
         updateSessionUser(test.user)
         navigate('/home')
      } else {
         setError('Log in error, rewrite username and password')
         setUser('')
      }
   }

   return (
      <div className="wrapper">
         <div className="text-center mt-4 name">Keep Track :)</div>
         <form onSubmit={(e) => handleForm(e)} className="p-3 mt-3">
            <div className="form-field d-flex align-items-center">
               <span className="far fa-user"></span>
               <input
                  autoFocus
                  type="text"
                  autoComplete="off"
                  value={user}
                  onChange={(e: any) => setUser(e.target.value)}
                  name="userName"
                  id="userName"
                  placeholder="Username"
               />
            </div>
            <div className="form-field d-flex align-items-center">
               <span className="fas fa-key"></span>
               <input
                  type="password"
                  name="password"
                  id="pwd"
                  placeholder="Password"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
               />
            </div>
            <div className="error">{error}</div>
            <button className="btn mt-3" type="submit">
               Login
            </button>
            <button className="btn-mt-4" onClick={goToCreateUser}>
               {' '}
               Create accout
            </button>
         </form>
      </div>
   )
}

export default Login
