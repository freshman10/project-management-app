import React from 'react';
import { Box, Button, styled, SvgIcon } from '@mui/material';

const StyledAuthButton = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  border: '1px solid',
  borderRadius: '10px',
}));

const Authentication = () => {
  return (
    <>
      <Button variant={'outlined'} sx={{ color: 'white' }}>
        <SvgIcon fontSize={'small'} sx={{ mr: 1 }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" />
          </svg>
        </SvgIcon>
        Sign in
      </Button>
      <Button variant={'outlined'} sx={{ ml: 2, color: 'white' }}>
        <SvgIcon fontSize={'small'} sx={{ mr: 1 }}>
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 64.000000 64.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
              fill="#FFFFFF"
              stroke="none"
            >
              <path d="M172 580 c-81 -50 -95 -163 -28 -219 14 -12 11 -17 -22 -41 -40 -28 -67 -75 -78 -129 -6 -26 -3 -31 13 -31 14 0 22 11 31 44 21 79 102 128 188 112 29 -6 34 -11 28 -24 -36 -86 -29 -150 25 -203 112 -113 296 -12 267 146 -18 93 -136 153 -219 110 -15 -8 -34 -12 -42 -9 -12 5 -10 12 10 36 31 36 39 68 31 112 -18 95 -124 145 -204 96z m117 -34 c47 -25 63 -83 37 -135 -35 -66 -137 -66 -172 0 -47 91 44 182 135 135z m235 -265 c26 -27 31 -39 31 -81 0 -43 -5 -54 -33 -82 -47 -48 -117 -48 -164 0 -28 28 -33 39 -33 81 0 52 25 92 70 112 37 16 96 3 129 -30z" />
              <path d="M420 250 c0 -27 -3 -30 -30 -30 -23 0 -30 -4 -30 -20 0 -16 7 -20 30 -20 27 0 30 -3 30 -30 0 -23 4 -30 20 -30 16 0 20 7 20 30 0 27 3 30 30 30 23 0 30 4 30 20 0 16 -7 20 -30 20 -27 0 -30 3 -30 30 0 23 -4 30 -20 30 -16 0 -20 -7 -20 -30z" />
            </g>
          </svg>
        </SvgIcon>
        Sign up
      </Button>
    </>
  );
};

export default Authentication;
