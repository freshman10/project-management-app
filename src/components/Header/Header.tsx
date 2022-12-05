import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link, useNavigate } from 'react-router-dom';
import { LINKS } from 'constants/constants';
import { ReactComponent as Logo } from '../../assets/icons/PMALogo.svg';
import { useUserSystemTheme } from 'hooks/useUserSystemTheme';
import { Theme, useScrollTrigger } from '@mui/material';
import NavLinks from 'components/NavLinks/NavLinks';
import { useCustomTheme } from 'hooks/useCustomTheme';
import { useAuth } from 'hooks/useAuth';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { setTheme } from 'theme/themeSlice';
import AuthButtons from 'components/AuthButtons/AuthButtons';
import LanguageButton from 'components/LanguageButton/LanguageButton';
import { User } from 'components/User/User';
import { BurgerMenu } from 'components/BurgerMenu/BurgerMenu';

const Header = () => {
  const { theme } = useCustomTheme();
  const { token } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const tokenLS = localStorage.getItem('credentials');
  const trigger = useScrollTrigger({ threshold: 70, disableHysteresis: true });

  useEffect(() => {
    if (!token && !tokenLS) {
      navigate(LINKS.welcome);
    }
  }, [navigate, token, tokenLS]);

  const handleThemeChange = () => {
    if (theme === 'light') {
      dispatch(setTheme('dark'));
      localStorage.setItem('theme', 'dark');
    } else {
      dispatch(setTheme('light'));
      localStorage.setItem('theme', 'light');
    }
  };

  const createStyles = (theme: Theme) => ({
    logoText: {
      [theme.breakpoints.down('md')]: {
        display: 'none',
        ml: 1,
      },
    },
  });
  const { userTheme } = useUserSystemTheme();
  const styles = createStyles(userTheme);

  return (
    <AppBar
      position="sticky"
      sx={{ zIndex: '1', background: `${trigger ? '#032040' : '#063970'}`, p: 0 }}
    >
      <Container maxWidth="xl" sx={{ m: '0 auto' }}>
        <Toolbar disableGutters>
          <Link to={LINKS.welcome} style={{ textDecoration: 'none', color: 'white' }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, gap: 2 }}>
              <Logo />
              <Typography sx={styles.logoText}>Task Manager</Typography>
            </Box>
          </Link>
          {token ? (
            <>
              <Link to={LINKS.welcome} style={{ textDecoration: 'none', color: 'white' }}>
                <Box sx={{ display: { xs: 'flex', md: 'none' }, m: '0 auto' }}>
                  <Logo />
                  <Typography sx={styles.logoText}>Task Manager</Typography>
                </Box>
              </Link>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <BurgerMenu />
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <NavLinks />
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <User />
                <IconButton sx={{ ml: 1 }} onClick={handleThemeChange}>
                  <DarkModeIcon />
                </IconButton>
              </Box>
            </>
          ) : (
            <>
              <Link to={LINKS.welcome} style={{ textDecoration: 'none', color: 'white' }}>
                <Box sx={{ display: { xs: 'flex', md: 'none' }, m: '0 auto' }}>
                  <Logo />
                  <Typography sx={styles.logoText}>Task Manager</Typography>
                </Box>
              </Link>
              <AuthButtons />
            </>
          )}
          <LanguageButton />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
