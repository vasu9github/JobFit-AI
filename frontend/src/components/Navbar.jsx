import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className='fixed top-0 left-0 z-50 w-full backdrop-blur-md bg-gradient-to-r from-white to-sky'>
      <div className='flex justify-between items-center max-w-6xl mx-auto px-4 py-3'>
        <div className='flex items-center'>
          <img width={70} src="/logo.png" alt="" />
          <h1 className='text-xl font-roboto font-semibold'>JobFit-AI</h1>
        </div>
        <div className='hidden md:flex items-center gap-6'>
          <a href="#home" className='hover:text-blue-500'>Home</a>
          <a href="#about" className='hover:text-blue-500'>About</a>
          <a href="#services" className='hover:text-blue-500'>Services</a>
          <a href="#contact" className='hover:text-blue-500'>Contact</a>
          <button className='px-3 py-1.5 bg-blue-500 text-white rounded active:scale-90 transition-all duration-300 shadow-sm hover:bg-blue-600'>
            Login/Signup
          </button>
        </div>

        <button
          className='md:hidden text-gray-700'
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 h-screen w-2/3 bg-gradient-to-b from-white to-sky shadow-lg transform transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden flex flex-col pt-6`}
      >

        <div className="flex justify-end pr-6">
          <button onClick={() => setIsOpen(false)} className="text-gray-700">
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col items-center gap-6 mt-10">
          <a href="#home" onClick={() => setIsOpen(false)} className='hover:text-blue-500 font-roboto text-lg'>Home</a>
          <a href="#about" onClick={() => setIsOpen(false)} className='hover:text-blue-500 font-roboto text-lg'>About</a>
          <a href="#services" onClick={() => setIsOpen(false)} className='hover:text-blue-500 font-roboto text-lg'>Services</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className='hover:text-blue-500 font-roboto text-lg'>Contact</a>
          <button className='px-3 py-1.5 bg-blue-500 text-white rounded active:scale-90 transition-all duration-300 shadow-sm hover:bg-blue-600'>
            Login/Signup
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
