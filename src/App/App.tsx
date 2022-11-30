import React from 'react';
import { LINKS } from 'constants/constants';
import { ErrorPage } from 'Pages/Error';
import { Search } from 'Pages/Search';
import { Welcome } from 'Pages/Welcome';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout/Layout';
import Board from '../features/Board/Board';
import { themeLight } from 'theme/themeLight';
import { themeDark } from 'theme/themeDark';
import { useUserSystemTheme } from 'hooks/useUserSystemTheme';
import Settings from 'features/Settings';
import Main from 'features/Main';
import Authentication from 'features/Authentication';

export const App = () => {
  const { theme } = useUserSystemTheme();

  return (
    <>
      <ThemeProvider theme={theme === 'light' ? themeLight : themeDark}>
        <CssBaseline>
          <ToastContainer autoClose={2000} />
          <Routes>
            <Route path={LINKS.welcome} element={<Layout />}>
              <Route index path={LINKS.welcome} element={<Welcome />} />
              <Route path={LINKS.search} element={<Search />} />
              <Route path={LINKS.main} element={<Main />} />
              <Route path={LINKS.settings} element={<Settings />} />
              <Route path={`${LINKS.main}/:boardId`} element={<Board />} />
            </Route>
            <Route path={LINKS.signIn} element={<Authentication />} />
            <Route path={LINKS.signUp} element={<Authentication />} />
            <Route path={LINKS.error} element={<ErrorPage />} />
          </Routes>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
};
