import React from 'react'

const Navbar = () => {
  return (
    <section>
      <nav className='fixed top-0 left-0 z-50 w-full backdrop-blur-md bg-linear-to-bl from-white to-sky'>
        <div className='flex justify-between items-center max-w-6xl mx-auto py-1'>
          <h1 className='text-xl font-roboto font-semibold'>JobFit-AI</h1>

          <div className='flex items-center gap-6'>
            <a href="">Home</a>
            <a href="">About</a>
            <a href="">Services</a>
            <a href="">Contact</a>
            <button className='px-3 py-1.5 bg-blue-500 text-white rounded active:scale-90 transition-all duration-300 text-shadow-2xs shadow-sm hover:bg-blue-600'>
              Login/Signup
            </button>
          </div>
        </div>
      </nav>
    </section>
  )
}

export default Navbar
