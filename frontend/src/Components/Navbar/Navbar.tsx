import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
// import ChecklistIcon from '@mui/icons-material/Checklist'
import { useNavigate } from 'react-router-dom'

import './Navbar.css'

import { useSessionUser } from '../../Store/userStore'
import Logout from '../../User/Logout'
function Navbar() {
   const navigate = useNavigate()
   const user = useSessionUser()
   function handleLogout() {
      navigate('/logout')
   }
   return (
      <div className="navbarContainer">
         <div className="navbarInfo">
            <div className="userInfo">
               {/* <button className="Todos" onClick={goToList}>
                  <ChecklistIcon />
               </button> */}
               <div className="userName">{user?.username}</div>
               <div className="logout" onClick={handleLogout}>
                  <LogoutIcon />
               </div>
            </div>
         </div>
      </div>
   )
}

export default Navbar
