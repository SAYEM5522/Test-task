import React, { useEffect, useState } from 'react';
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
import HeaderText from './HeaderText';

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
  const { sectorData } = useSectorData("getsectors");
  const {loading, fetchFormData, formValue } = useFormData();
  const [formData, setFormData] = useState({name: '',agreeToTerms: false});
  const { selectedOptions, handleChange, renderSelectedOptions } = useSelectOptions();
  const isSaveDisabled = !formData.name || selectedOptions.length === 0 || !formData.agreeToTerms;
  useEffect(() => {
    if (formValue) {
      setFormData({
        name: formValue?.form?.name|| '',
        agreeToTerms: formValue?.form?.terms || false,
      });
    }
  }, [formValue]);

  const isModified = formValue && (formData.name !== formValue?.form?.name || formData.agreeToTerms !== formValue?.form?.terms);

  const handleInputChange = (e) => {
    setFormData({ ...formData, name: e.target.value })
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, agreeToTerms: e.target.checked })
  };

  const handleSave = async() => {
    if (!isSaveDisabled) {
      const data = {
        name: formData.name,
        terms: formData.agreeToTerms,
        sectors: selectedOptions,
      };

      const response = await fetchFormData(data,isModified,formValue?.form?._id);

      // Set form data with saved values after saving
      setFormData({
        name: response?.form?.name || '',
        agreeToTerms: response?.form?.terms || false,
      });
    } else {
      toast.warn('All the fields are required');
    }
  };
  return (
    <div>
      <HeaderText />
      <div class="mt-5">
    <label for="name" class="block text-sm text-left font-serif font-semibold text-gray-700 mb-1">Name</label>
    <input
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Type your full name..."
        class="appearance-none block w-full bg-white border border-gray-300 rounded-md py-3 px-3 leading-5 focus:outline-none focus:black focus:black focus:border-black sm:text-sm"
    />
</div>
      <div className="mt-5">
        <p className="text-left text-[16px] font-serif font-semibold ml-1 mb-1">Sectors</p>
        <FormControl className="w-full" sx={{ m: 1 }}>
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
        
          {!sectorData&&(
            <div className='flex items-center justify-center h-[160px]'>
            <CircularProgress/>
            </div>
          )}
           {sectorData?.sectors[0]?.sectors?.map((name,index) => (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                ))}
          
        
          
        </Select>
        </FormControl>
      </div>
      <div class="flex flex-row items-center mt-3">
    <input
        type="checkbox"
        id="agreeToTerms"
        checked={formData.agreeToTerms}
        onChange={handleCheckboxChange}
        name="agreeToTerms"
        class="appearance-none w-5 h-5 border border-gray-300 rounded-[50%] checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring focus:border-blue-300 mx-2"
    />
    <label for="agreeToTerms" class="text-left text-sm font-serif font-semibold text-gray-800 ">
        Agree to Terms
    </label>
</div>
      <button
        className={`w-full ${isSaveDisabled && 'cursor-not-allowed'} h-14 bg-black text-white mx-auto rounded-md mt-7`}
        onClick={handleSave}
      >
        {loading ? (
          <CircularProgress   size={25} />
        ) : (
          <p className="text-[16px] font-serif font-semibold">{isModified ? 'Update' : 'Save'}</p>
        )}
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
  );
};

export default MainForm;
