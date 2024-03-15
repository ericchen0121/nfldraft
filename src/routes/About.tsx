import React from 'react'

const About = () => {
  return (
    <div className='snap-x snap-mandatory h-screen w-screen flex overflow-y-hidden'>
      <div className='snap-always snap-start bg-yellow-200 flex-shrink-0 h-screen w-screen flex items-center justify-center text-5xl'>
        1
      </div>
      <div className='snap-always snap-start bg-blue-200 flex-shrink-0 h-screen w-screen flex items-center justify-center text-5xl'>
        2
      </div>
      <div className='snap-always snap-start bg-green-200 flex-shrink-0 h-screen w-screen flex items-center justify-center text-5xl'>
        3
      </div>
      <div className='snap-always snap-start bg-green-200 flex-shrink-0 h-screen w-screen flex items-center justify-center text-5xl'>
        4
      </div>
      <div className='snap-always snap-start bg-green-200 flex-shrink-0 h-screen w-screen flex items-center justify-center text-5xl'>
        5
      </div>
    </div>
  )
}

export default About
