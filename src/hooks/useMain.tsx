import { useAppSelector } from './useAppSelector';

export const useMain = () => {
  return useAppSelector((state) => state.mainState);
};
