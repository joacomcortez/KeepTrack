import React from 'react'
import './App.css'
import Login from './User/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Logout from './User/Logout'
import CreateUser from './User/CreateUser'

function App() {
   return (
      <>
         <div className="App">
            <Router>
               <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/signup" element={<CreateUser />} />
               </Routes>
            </Router>
         </div>
      </>
   )
}

export default App
