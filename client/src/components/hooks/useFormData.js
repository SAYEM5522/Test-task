import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'https://test-task-uygg.onrender.com/form/';

const useFormData = () => {
  const [formValue, setFormValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
        setError(null)
      }else{
        const response = await axios.post(`${BASE_URL}/createform`,{
          name:data.name,
          sectors:data.sectors,
          terms:data.terms
        });
        toast("Form saved successfylly")
        setFormValue(response.data);
        setLoading(false)
        setError(null)
      }
      
      
    } catch (error) {
      console.error('Error fetching word data:', error);
      toast(error.message)
      setError(error);
      setLoading(false);
    }
  };
  return {loading, error,fetchFormData,formValue };
};

export default useFormData;
