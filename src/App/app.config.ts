import { store } from './state/store';
import { setUser, setUserInfo } from '../features/authSlice';
import { setTheme } from 'theme/themeSlice';

export const init = (userTheme: string) => {
  const theme = localStorage.getItem('theme');
  const { token, login } = JSON.parse(localStorage.getItem('credentials') || '{}');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  store.dispatch(setTheme(theme ? theme : userTheme));
  store.dispatch(setUserInfo({ token, login }));
  store.dispatch(setUser(user));
};
