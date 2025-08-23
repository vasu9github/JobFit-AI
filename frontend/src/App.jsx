import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
const App = () => {
  return (
    <main>
      <Navbar/>
      <Home/>
      <About/>
    </main>
  )
}

export default App