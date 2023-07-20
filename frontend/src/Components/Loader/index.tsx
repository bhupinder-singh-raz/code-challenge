import React from 'react';
import { Box, CircularProgress, useTheme } from '@mui/material';
import { LoaderContainerStyle } from './styles';


const LoaderComponent: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={LoaderContainerStyle(theme)}>
      <CircularProgress />
    </Box>
  );
};


export default React.memo(LoaderComponent);