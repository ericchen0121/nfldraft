import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Team from './routes/Team'
import Careers from './routes/Careers'
import Home from './routes/Home'
import Navbar from './atoms/Navbar'
import './App.css'
import 'preline/preline'
import { IStaticMethods } from 'preline/preline'
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods
  }
}

function App() {
  const location = useLocation()
  useEffect(() => {
    window.HSStaticMethods.autoInit()
  }, [location.pathname])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/team' element={<Team />} />
        <Route path='/careers' element={<Careers />} />
      </Routes>
    </>
  )
}

export default App
