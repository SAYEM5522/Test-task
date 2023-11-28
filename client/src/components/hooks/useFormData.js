import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'https://test-task-uygg.onrender.com/form/';

const useFormData = () => {
  const [formValue, setFormValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchFormData = async (data,type,id) => {
    setLoading(true);
    try {
      if(type){
        const response = await axios.post(`${BASE_URL}/updateForm/${id}`,{
          name:data.name,
          sectors:data.sectors,
          terms:data.terms
        });
        toast.success("Form update successfylly")
        setFormValue(response.data);
        setLoading(false)
      }else{
        const response = await axios.post(`${BASE_URL}/createform`,{
          name:data.name,
          sectors:data.sectors,
          terms:data.terms
        });
        toast.success("Form saved successfylly")
        setFormValue(response.data);
        setLoading(false)
      }
      
      
    } catch (error) {
      console.error('Error fetching word data:', error);
      toast(error.message)
      setLoading(false);
    }
  };
  return {loading,fetchFormData,formValue };
};

export default useFormData;
