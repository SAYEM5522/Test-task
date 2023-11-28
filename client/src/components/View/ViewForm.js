import React from 'react'
import useSectorData from '../hooks/useSectorData';
import { CircularProgress } from '@mui/material';

const ViewForm = () => {
  const { sectorData,loading } = useSectorData("getAllForms");
  console.log(sectorData)
  return (
    <div>
      {
        loading?(
          <div className='flex items-center justify-center h-[450px]'>
            <CircularProgress size={30}/>
            </div>
        ):(
          <div className='flex items-start flex-row flex-wrap h-[480px] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden'>
           {
            sectorData?.form.map((item,index)=>{
              return(
                <div key={index} className='w-fit h-fit bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md m-3 cursor-pointer'>
                 <p className='text-lg font-serif text-left px-4 font-medium'> <strong>Name: </strong>{item?.name}</p>
                 <p className='text-left px-4 font-serif font-semibold text-lg'>Sectors:</p>
                 <div className='flex items-center flex-row flex-wrap px-3 py-1 mb-2'>
                  {
                    item?.sectors?.map((item,index)=>(
                      <div key={index} className='m-1 shadow rounded-lg'>
                        <p className=' p-1 text-[16px] font-medium '>{item}</p>
                      </div>
                    ))
                  }
                 </div>
                </div>
              )
            })
           }
          </div>
        )
      }
    </div>
  )
}

export default ViewForm