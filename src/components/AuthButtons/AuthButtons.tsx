import React from 'react';
import { Box, Button, SvgIcon } from '@mui/material';
import { ReactComponent as AddUser } from '../../assets/icons/addUser.svg';
import { ReactComponent as Login } from '../../assets/icons/login.svg';
import { NavLink } from 'react-router-dom';
import { LINKS } from '../../constants/constants';
import { useTranslation } from 'react-i18next';

const AuthButtons = () => {
  const { t } = useTranslation();

  const buttonStyles = {
    background: 'transparent',
    padding: '0px 5px 0px 5px',
    boxShadow: 'none',
    ml: 2,
    border: '1px solid transparent',
    '&:hover': {
      border: '1px solid white',
    },
  };

  return (
    <Box ml="auto">
      <NavLink to={LINKS.signIn} end style={{ textDecoration: 'none' }}>
        <Button variant="outlined" sx={buttonStyles}>
          <SvgIcon fontSize="small" sx={{ mr: 1 }}>
            <Login />
          </SvgIcon>
          {t('signIn')}
        </Button>
      </NavLink>

      <NavLink to={LINKS.signUp} end style={{ textDecoration: 'none' }}>
        <Button variant="outlined" sx={buttonStyles}>
          <SvgIcon fontSize="small" sx={{ mr: 1 }}>
            <AddUser />
          </SvgIcon>
          {t('signUp')}
        </Button>
      </NavLink>
    </Box>
  );
};

export default AuthButtons;
