import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://test-task-uygg.onrender.com/form/';

const useSectorData = () => {
  const [sectorData, setSectorData] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getsectors`);
      setSectorData(response.data);
      
    } catch (error) {
      console.error('Error fetching word data:', error);
    }
  };
  useEffect(()=>{
    fetchData()
  },[])
  return { sectorData,fetchData };
};

export default useSectorData;
