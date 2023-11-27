import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'https://test-task-uygg.onrender.com/form/';

const useFormData = () => {
  const [formValue, setFormValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchFormData = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/createform`,{
        name:data.name,
        sectors:data.sectors,
        terms:data.terms
      });
      toast("Form saved successfylly")
      setFormValue(response.data);
      setLoading(false)
      setError(null)
      
    } catch (error) {
      console.error('Error fetching word data:', error);
      toast(error.message)
      setError(error);
      setLoading(false);
    }
  };
  return {loading, error,fetchFormData };
};

export default useFormData;
