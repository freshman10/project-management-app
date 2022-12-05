import { IconButton } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import React, { useState } from 'react';
import LanguageMenu from 'features/LanguageMenu';

export const LanguageButton = () => {
  const [anchorElLang, setAnchorElLang] = useState<null | HTMLElement>(null);

  const handleOpenLangMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleCloseLangMenu = () => {
    setAnchorElLang(null);
  };

  return (
    <>
      <IconButton sx={{ p: 0 }} onClick={handleOpenLangMenu}>
        <LanguageIcon sx={{ fontSize: 30, color: '#f5f5f5' }} />
      </IconButton>
      <LanguageMenu onClose={handleCloseLangMenu} anchorEl={anchorElLang} />
    </>
  );
};

export default LanguageButton;
