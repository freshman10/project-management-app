import React from 'react';
import { Menu, MenuItem, Typography } from '@mui/material';

interface ILanguageMenuProps {
  anchorEl: null | HTMLElement;
  onClose: () => void;
  onClick: (event: React.MouseEvent) => void;
}

const LanguageMenu = ({ anchorEl, onClose, onClick }: ILanguageMenuProps) => (
  <Menu
    sx={{ mt: '2.5rem' }}
    id="lang-menu"
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={Boolean(anchorEl)}
    onClose={onClose}
  >
    <MenuItem id="en" onClick={onClick}>
      <Typography id="en" textAlign="center">
        en
      </Typography>
    </MenuItem>
    <MenuItem id="ru" onClick={onClick}>
      <Typography id="ru" textAlign="center">
        ru
      </Typography>
    </MenuItem>
  </Menu>
);

export default LanguageMenu;
