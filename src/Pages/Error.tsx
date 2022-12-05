import { Button, Theme, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { LINKS } from 'constants/constants';
import { useUserSystemTheme } from 'hooks/useUserSystemTheme';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import bgError from '../assets/img/bgError-2.jpg';

const createStyles = (theme: Theme) => ({
  pageContainer: {
    height: 'calc(100vh - 114px)',
    backgroundColor: '#374a72',
    [theme.breakpoints.down(725)]: {
      height: 'calc(100vh - 187px)',
    },
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 179px)',
    },
  },
  title: {
    color: '#fff',
    [theme.breakpoints.down('md')]: {
      fontSize: '2rem',
      pt: '2rem',
    },
  },
  imageContainer: {
    width: '70vw',
    height: '60vh',
    margin: '0 auto',
    backgroundImage: `url(${bgError})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    [theme.breakpoints.down('md')]: {
      height: 'calc(100vh - 350px)',
    },
  },
  goToMainBtn: {
    display: 'block',
    margin: '0 auto',
  },
});

export const ErrorPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userTheme } = useUserSystemTheme();
  const styles = createStyles(userTheme);

  const resetClickHandler = () => {
    navigate(LINKS.welcome);
  };

  useEffect(() => {
    navigate(LINKS.error);
  }, [navigate]);

  return (
    <Container sx={styles.pageContainer} maxWidth={false}>
      <Typography variant="h2" sx={styles.title}>
        {t('pageNotFound')}
      </Typography>
      <Container sx={styles.imageContainer}></Container>
      <Button variant="contained" sx={styles.goToMainBtn} onClick={resetClickHandler}>
        {t('goMain')}
      </Button>
    </Container>
  );
};
