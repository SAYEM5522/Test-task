import MainForm from './form/MainForm'
import React, { useState } from 'react'
import { data } from './form/Data'
import Layout from './form/Layout'

const Main = () => {
  const [acttiveIndex,setACtiveIndex]=useState(0)
  const ItemSelect=(index)=>{
    setACtiveIndex(index)
  }
  return (
    <div className='w-full flex items-center h-screen justify-center'>
      <div className=' 2xl:w-[50%] xl:w-[50%] lg:w-[60%] md:w-[70%] sm:w-[80%] w-[93%] h-[90%] bg-white rounded-md shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] py-3  px-10'>
      <div className='flex border w-fit flex-row  mx-auto rounded-md'>
      {
          data.map((item,index)=>{
            return(
             <div key={index} onClick={()=>ItemSelect(index)} className={`flex ${index===acttiveIndex?"bg-black text-white ":""} p-2 rounded-md cursor-pointer items-center`}>
              <p className='py-[2px] xl:px-20 lg:px-20 md:px-10 sm:px-10 px-3 font-medium xl:text-[16px] lg:text-[16px] md:text-[16px] sm:text-sm text-sm' >{item.name}</p>
             </div>
            )
          })
          
        }
      </div>
      <div className='pt-10'>
        <Layout index={acttiveIndex}/>
      </div>
      </div>
    </div>
  )
}

export default Main