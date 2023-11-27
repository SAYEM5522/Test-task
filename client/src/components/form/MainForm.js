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
  const { sectorData } = useSectorData();
  const { error, loading, fetchFormData, formValue } = useFormData();
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
    <div className="">
      <HeaderText />
      <div className="mt-5">
        <p className="text-left text-[16px] font-serif font-semibold ml-1 mb-1">Name</p>
        <input
          onChange={handleInputChange}
          type="text"
          name="name"
          value={formData.name}
          className="py-2 px-3 rounded-md bg-transparent w-full border"
          placeholder="type your name.."
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
          {sectorData?.sectors[0]?.sectors?.map((name,index) => (
            <MenuItem key={index} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
      </div>
      <div className="flex flex-row items-center">
        <label className="text-left text-[16px] font-serif font-semibold mx-2 mb-1">Agree to Terms:</label>
        <input
          type="checkbox"
          className="w-[20px] h-[20px]"
          checked={formData.agreeToTerms}
          onChange={handleCheckboxChange}
          name="agreeToTerms"
        />
      </div>
      <button
        className={`w-[80%] ${isSaveDisabled && 'cursor-not-allowed'} h-14 bg-black text-white mx-auto rounded-md mt-7`}
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
