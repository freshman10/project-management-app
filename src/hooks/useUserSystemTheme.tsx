import { useMediaQuery } from '@mui/material';
import { themeDark } from '../theme/themeDark';
import { themeLight } from '../theme/themeLight';
import { useCustomTheme } from './useCustomTheme';

export const useUserSystemTheme = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const userTheme = prefersDarkMode ? themeDark : themeLight;
  const { theme } = useCustomTheme();

  let appTheme;
  if (theme) {
    appTheme = theme === 'light' ? themeLight : themeDark;
  }

  return { theme, appTheme, userTheme };
};
