import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <section id='home' className='h-screen bg-gradient-to-bl from-white to-sky px-4 border-b border-gray-300'>
      <div className='flex flex-col md:flex-row justify-center items-center h-full gap-8 max-w-6xl w-full mx-auto'>

        <div className='w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left'>
          <h1 className='text-2xl md:text-4xl font-roboto text-gray-500 font-bold animate-bounce leading-snug'>
            JobFit AI gets you <span className='text-blue-500'>Hired.</span>
          </h1>

          <div className='mt-6'>
            <Link to={'/chat'}>
              <button className='px-6 py-2 bg-blue-500 text-white rounded active:scale-90 transition-all duration-300 text-shadow-2xs shadow-sm hover:bg-blue-600'>
                Explore JobFit
              </button>
            </Link>

            <div className='mt-4 space-y-1 text-sm md:text-base'>
              <p className='text-gray-500'>✅ 39% more likely to land the job</p>
              <p className='text-gray-500'>⭐ 4.4 out of 5 | 500+ reviews</p>
            </div>
          </div>
        </div>

        <div className='w-full md:w-1/2 flex justify-center'>
          <img src="/Resumeimg.png" alt="Resume" className='max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl' />
        </div>
      </div>
    </section>
  )
}

export default Home
