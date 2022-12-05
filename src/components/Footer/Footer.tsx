import { Box, Link, Typography } from '@mui/material';
import React from 'react';
import { ReactComponent as Logo } from '../../assets/icons/RSLogo.svg';
import { OUR_GITHUB_NICKNAMES, REACT_COURSE_LINK } from 'constants/constants';
import { GithubPanel } from 'components/GithubPanel/GithubPanel';
import { Theme } from '@mui/system';
import { useUserSystemTheme } from 'hooks/useUserSystemTheme';

const createStyles = (theme: Theme) => ({
  footerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    columnGap: '3rem',
    flexWrap: 'wrap',
    height: '50px',
    zIndex: '0',
    pt: 2,
    [theme.breakpoints.between('xs', 725)]: {
      height: '120px',
      maxWidth: '360px',
      margin: '0 auto',
      pt: 1.5,
    },
  },
  text: {
    [theme.breakpoints.between('xs', 'md')]: {
      lineHeight: '1rem',
      fontSize: '1rem',
    },
  },
  githubs: {
    [theme.breakpoints.between('xs', 'md')]: {},
  },
});

export const Footer = () => {
  const { userTheme } = useUserSystemTheme();
  const styles = createStyles(userTheme);

  return (
    <Box position="sticky" sx={styles.footerContainer}>
      <Link href={REACT_COURSE_LINK}>
        <Logo />
      </Link>
      <GithubPanel nicknames={OUR_GITHUB_NICKNAMES} />
      <Typography variant="h6" sx={styles.text}>
        2022
      </Typography>
    </Box>
  );
};
