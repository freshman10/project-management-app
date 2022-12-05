import React from 'react';
import { Box } from '@mui/material';
import BoardHeader from '../../components/BoardHeader/BoardHeader';
import ColumnsWrapper from '../../components/ColumnsWrapper/ColumnsWrapper';

const Board = () => {
  return (
    <Box component="main" sx={{ paddingLeft: '10px' }}>
      <BoardHeader />
      <ColumnsWrapper />
    </Box>
  );
};

export default Board;
