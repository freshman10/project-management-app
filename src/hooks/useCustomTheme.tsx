import { useAppSelector } from './useAppSelector';

export const useCustomTheme = () => {
  return useAppSelector((state) => state.themeState);
};
