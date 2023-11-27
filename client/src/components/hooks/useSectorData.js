import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://test-task-uygg.onrender.com/form/';

const useSectorData = () => {
  const [sectorData, setSectorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/getsectors`);
      setSectorData(response.data);
      setLoading(false)
      setError(null)
      
    } catch (error) {
      console.error('Error fetching word data:', error);
      setError(error);
      setLoading(false);
    }
  };
  useEffect(()=>{
    fetchData()
  },[])
  return { sectorData, loading, error,fetchData };
};

export default useSectorData;
