import { Box } from '@mui/material';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export const Spinner = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        height: '100%',
      }}
    >
      <CircularProgress
        color="info"
        sx={{
          position: 'absolute',
          zIndex: '2',
          top: '40%',
          left: '50%',
        }}
      />
    </Box>
  );
};
