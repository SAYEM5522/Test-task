import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://test-task-uygg.onrender.com/form/';

const useSectorData = (endPoint) => {
  const [sectorData, setSectorData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/${endPoint}`);
      setSectorData(response.data);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching word data:', error);
      setLoading(false)

    }
  };
  useEffect(()=>{
    fetchData()
  },[])
  return { sectorData,fetchData,loading };
};

export default useSectorData;
