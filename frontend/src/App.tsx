import React from 'react'
import './App.css'
import Login from './User/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Home from './pages/Home/Home'

function App() {
   return (
      <>
         <div className="App">
            <Router>
               <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<Home />} />
               </Routes>
            </Router>
         </div>
      </>
   )
}

export default App
