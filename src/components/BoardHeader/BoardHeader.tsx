import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled } from '@mui/material/styles';

const StyledBoardBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

const BoardHeader = () => {
  return (
    <>
      <StyledBoardBox pt={3}>
        <Button variant="outlined" startIcon={<ChevronLeftIcon />}>
          back
        </Button>
        <Typography fontSize={18}>here will be board name</Typography>
      </StyledBoardBox>
      <Typography mt={1}>here will be board description</Typography>
    </>
  );
};

export default BoardHeader;
