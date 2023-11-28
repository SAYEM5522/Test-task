import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { useState } from 'react';

export function useSelectOptions(initialOptions) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedOptions(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const renderSelectedOptions = (selected) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {selected.map((value) => (
        <Chip key={value} label={value} />
      ))}
    </Box>
  );

  return { selectedOptions, handleChange, renderSelectedOptions };
}