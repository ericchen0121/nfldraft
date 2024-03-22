import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Team from './routes/Team'
import Player from './routes/Player'
// import Home from './routes/Home'
import Navbar from './atoms/Navbar'
import './App.css'
import 'preline/preline'
import analytics from './utilities/analytics'

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
    analytics.page()
  }, [location.pathname])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Team />} />
        <Route path='/team' element={<Team />} />
        <Route path='/player' element={<Player />} />
      </Routes>
    </>
  )
}

export default App
