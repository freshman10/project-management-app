import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { PAGES } from '../../constants/constants';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditTaskModal from '../EditTaskModal/EditTaskModal';

interface INavLinksProps {
  onCloseBurger?: () => void;
}

const NavLinks = ({ onCloseBurger }: INavLinksProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (onCloseBurger) onCloseBurger();
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      alignItems="left"
      gap="1rem"
      m="0 auto"
      p="0 5px"
    >
      <Stack sx={{ cursor: 'pointer' }} direction="row" alignItems="center" onClick={handleOpen}>
        <AddIcon fontSize="small" />
        <Typography sx={{ color: { xs: 'grey.200', md: 'primary.contrastText' } }}>
          {t('newBoard')}
        </Typography>
      </Stack>
      {PAGES.map((page) => (
        <NavLink
          to={`/${page.toLowerCase()}`}
          style={({ isActive }) => ({
            textDecoration: isActive ? 'underline' : 'none',
            color: '#FF6753',
          })}
          key={page}
          data-id={page}
          onClick={onCloseBurger}
        >
          <Typography sx={{ color: { xs: 'grey.200', md: 'primary.contrastText' } }}>
            {t(page)}
          </Typography>
        </NavLink>
      ))}
      <EditTaskModal
        title=""
        order={0}
        description=""
        open={open}
        boardId=""
        columnId=""
        taskId=""
        onClose={handleClose}
        assignees={[]}
      />
    </Box>
  );
};

export default NavLinks;
