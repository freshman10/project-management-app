import { Box, Link, Typography } from '@mui/material';
import React from 'react';
import { ReactComponent as Logo } from '../../assets/icons/RSLogo.svg';
import { OUR_GITHUB_NICKNAMES, REACT_COURSE_LINK } from 'constants/constants';
import { GithubPanel } from 'components/GithubPanel/GithubPanel';

export const Footer = () => {
  return (
    <Box
      position="sticky"
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        columnGap: '3rem',
        flexWrap: 'wrap',
        height: '50px',
        zIndex: '1',
      }}
    >
      <Link href={REACT_COURSE_LINK}>
        <Logo />
      </Link>
      <Typography variant="h6">2022</Typography>
      <GithubPanel nicknames={OUR_GITHUB_NICKNAMES} />
    </Box>
  );
};
