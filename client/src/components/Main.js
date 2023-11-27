import React from 'react'
import MainForm from './form/MainForm'

const Main = () => {
  return (
    <div className='w-full flex items-center h-screen justify-center'>
      <div className=' 2xl:w-[50%] xl:w-[50%] lg:w-[50%] md:w-[65%] sm:w-[80%] w-[95%] h-fit bg-white rounded-md shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]  py-14 px-10'>
        <MainForm/>
      </div>
    </div>
  )
}

export default Main