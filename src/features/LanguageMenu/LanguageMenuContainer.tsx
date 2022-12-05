import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageMenu from './LanguageMenu';

interface ILanguageMenuContainerProps {
  anchorEl: null | HTMLElement;
  onClose: () => void;
}

const LanguageMenuContainer = ({ anchorEl, onClose }: ILanguageMenuContainerProps) => {
  const { i18n } = useTranslation();

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const handleClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    changeLang(target.id);
    onClose();
  };

  return <LanguageMenu onClick={handleClick} anchorEl={anchorEl} onClose={onClose} />;
};

export default LanguageMenuContainer;
