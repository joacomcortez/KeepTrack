import React from 'react'
import { useNavigate } from 'react-router'
import { cleanupSessionUser } from '../Store/userStore'
import '../stylesheet/Logout.css'

function Logout() {
   const navigate = useNavigate()
   function goHome() {
      cleanupSessionUser()
      navigate('/')
   }
   return (
      <div className="wrapperlogout">
         <p className="textlogout">Are you sure you want to log out?</p>
         <input type="submit" className="botonlogout" onClick={goHome} value="Yes" />
      </div>
   )
}

export default Logout
