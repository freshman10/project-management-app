import { Box, Button, Container, Typography } from '@mui/material';
import AboutUs from '../components/AboutUs/AboutUs';
import UsedTechnologies from 'components/UsedTechnologies/UsedTechnologies';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import bgLight from '../assets/img/bgLight.png';
import bgDark from '../assets/img/bgDark.png';
import { Theme } from '@mui/system';
import { useUserSystemTheme } from 'hooks/useUserSystemTheme';

export const Welcome = () => {
  const { theme, userTheme } = useUserSystemTheme();

  const createStyles = (currentTheme: Theme) => ({
    heroBG: {
      height: 680,
      backgroundImage: theme === 'light' ? `url(${bgLight})` : `url(${bgDark})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
    heroWrapper: {
      margin: '0 auto',
      h1: {
        pl: 3,
      },
      [currentTheme.breakpoints.down('md')]: {
        h1: {
          fontSize: '4rem',
        },
      },
      [currentTheme.breakpoints.between('xs', 'sm')]: {
        h1: {
          pl: 0,
          fontSize: '2.5rem',
        },
      },
    },
    sectionHeading: {
      [currentTheme.breakpoints.between('xs', 'md')]: {
        fontSize: '2rem',
        marginBottom: '0.6rem',
      },
    },
    teamAndTechnologiesWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      [currentTheme.breakpoints.down('md')]: {
        gap: 5,
      },
    },
    heroContainer: {
      width: 800,
      minHeight: 150,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      [currentTheme.breakpoints.down('md')]: {
        width: '100%',
        marginBottom: 5,
      },
      [currentTheme.breakpoints.between('xs', 'sm')]: {
        h5: {
          fontSize: '1.3rem',
        },
      },
    },
    heroBtn: {
      width: '150px',
    },
    aboutUsCintainer: {
      maxWidth: 1150,
      m: 0,
      paddingTop: '2rem',
      margin: '0 auto',
    },
  });

  const { t } = useTranslation();
  const styles = createStyles(userTheme as Theme);

  const aboutUsRef = useRef<HTMLDivElement | null>(null);
  const aboutUsClickHandler = () => {
    aboutUsRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      <Container sx={styles.heroBG} maxWidth={false}>
        <Box sx={styles.heroWrapper} maxWidth="xl">
          <Typography variant="h1" gutterBottom>
            Task Manager
          </Typography>
          <Container sx={styles.heroContainer} maxWidth={false}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {t('welcomeHero')}
            </Typography>
            <Button variant="contained" sx={styles.heroBtn} onClick={aboutUsClickHandler}>
              {t('heroAboutBtn')}
            </Button>
          </Container>
        </Box>
      </Container>
      <div ref={aboutUsRef} style={{ height: '2rem' }}></div>
      <Box sx={styles.teamAndTechnologiesWrapper}>
        <Container sx={styles.aboutUsCintainer} maxWidth={false}>
          <Typography variant="h2" sx={styles.sectionHeading}>
            {t('teamHeading')}
          </Typography>
          <AboutUs />
        </Container>
        <Container sx={{ margin: '0 auto' }}>
          <Typography variant="h2" sx={styles.sectionHeading}>
            {t('usedTechnologies')}
          </Typography>
          <UsedTechnologies />
        </Container>
      </Box>
    </main>
  );
};
