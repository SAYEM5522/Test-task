import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelectOptions } from '../hooks/useSelectOptions';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useSectorData from '../hooks/useSectorData';
import useFormData from '../hooks/useFormData';
import { CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const MainForm = () => {
  const {sectorData}=useSectorData()
  const {error,loading,fetchFormData}=useFormData()
  const [formData, setFormData] = useState({
    name: '',
    agreeToTerms: false,
  });
  const { selectedOptions, handleChange, renderSelectedOptions } =useSelectOptions();
  const isSaveDisabled = !formData.name || selectedOptions.length === 0 || !formData.agreeToTerms;
  const handleSave = () => {
    if(!isSaveDisabled){
      const data={
        name:formData.name,
        terms:formData.agreeToTerms,
        sectors:selectedOptions
      }
      fetchFormData(data)
    }
  };
  return (
    <div >
      <p className='font-serif font-medium text-lg text-center'>Please enter your name and pick the Sectors you are currently involved in.</p>
       <div className='mt-5'>
        <p className='text-left'>Name</p>
        <input onChange={(e) => setFormData({ ...formData, name: e.target.value })} type='text' className='py-2 px-3 rounded-md bg-transparent w-full border' placeholder='type your name..'/>
       </div>
       <div className='mt-5'>
        <p className='text-left'>Sectors</p>
        <FormControl className='w-full' sx={{ m: 1 }}>
        <InputLabel id="demo-multiple-chip-label">Sectors</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedOptions}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={renderSelectedOptions}
          MenuProps={MenuProps}
        >
          {sectorData?.sectors[0]?.sectors?.map((name,index) => (
            <MenuItem key={index} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
       </div>
       <div className='flex flex-row items-center'>
       <label className='mr-2'>Agree to Terms:</label>
      <input type="checkbox" className='w-[20px] h-[20px]' checked={formData.agreeToTerms} onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })} />
       </div>
      <button disabled={isSaveDisabled} className={`w-[80%] ${isSaveDisabled&&"cursor-not-allowed"} h-14 bg-white text-black mx-auto rounded-md mt-5`} onClick={handleSave}>
        {
          loading?(
            <CircularProgress size={22} />
          ):(
            <p>save</p>
          )
        }
      </button>
      <ToastContainer
      position="top-center"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />
    </div>
  )
}

export default MainForm