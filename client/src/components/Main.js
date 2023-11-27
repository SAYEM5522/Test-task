import React from 'react'
import MainForm from './form/MainForm'

const Main = () => {
  return (
    <div className='w-[45%] bg-[whitesmoke] h-screen mx-auto'>
      <div className='flex  h-full pt-5 px-5'>
        <MainForm/>
      </div>
    </div>
  )
}

export default Main