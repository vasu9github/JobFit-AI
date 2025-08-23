import React from 'react'

const Home = () => {
  return (
    <section id='home' className='h-screen bg-gradient-to-bl from-white to-sky'>
      <div className='flex justify-center items-center h-full'>

        <div className='w-1/2 flex flex-col justify-center items-center text-center'>
          <h1 className='text-4xl font-roboto font-bold animate-bounce'>
            JobFit AI gets you <span className='text-blue-500'>Hired.</span>
          </h1>
          <div className='mt-6'>
            <button className='px-6 py-2 bg-blue-500 text-white rounded active:scale-90 transition-all duration-300 text-shadow-2xs shadow-sm hover:bg-blue-600'>
              Explore JobFit
            </button>
            <div className='mt-4'>
                <p className='text-gray-500'>✅39% more likely to land the job</p>
                <p className='text-gray-500'>⭐4.4 out of 5 | 500+ reviews</p>
            </div>
          </div>
        </div>

        <div className='w-1/2 flex justify-center'>
          <img src="/Resumeimg.png" alt="Resume" className='max-w-3xl' />
        </div>
      </div>
    </section>
  )
}

export default Home
