import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
// import ChecklistIcon from '@mui/icons-material/Checklist'
import { useNavigate } from 'react-router-dom'

import './Navbar.css'

import { useSessionUser } from '../../Store/userStore'
function Navbar() {
   // const navigate = useNavigate()
   const user = useSessionUser()
   // function goToList() {
   //    navigate('/list')
   // }
   return (
      <div className="navbarContainer">
         <div className="navbarInfo">
            <div className="userInfo">
               {/* <button className="Todos" onClick={goToList}>
                  <ChecklistIcon />
               </button> */}
               <div className="userName">{user?.username}</div>
               <div className="logout">
                  <LogoutIcon />
               </div>
            </div>
         </div>
      </div>
   )
}

export default Navbar
