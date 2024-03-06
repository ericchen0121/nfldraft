import React from 'react'
import { Routes, Route } from 'react-router-dom'
import About from './routes/About'
import Careers from './routes/Careers'
import Home from './routes/Home'
import Navbar from './atoms/Navbar'
import logo from './logo.svg'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/careers' element={<Careers />} />
      </Routes>
    </>
  )
}

export default App
