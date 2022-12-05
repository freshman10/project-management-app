import { Avatar, Theme, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useUserSystemTheme } from 'hooks/useUserSystemTheme';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface IAboutUsElementProps {
  name: string;
  avatar: string;
  revert: boolean;
}

export const AboutUsElement = ({ name, avatar, revert }: IAboutUsElementProps) => {
  const createStyles = (theme: Theme) => ({
    avatar: {
      width: 100,
      height: 100,
      [theme.breakpoints.between('xs', 'sm')]: {
        width: 70,
        height: 70,
      },
    },
    teamItem: {
      display: 'flex',
      flexDirection: revert ? 'row' : 'row-reverse',
      gap: '10%',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        gap: '5%',
      },
    },
    textName: {
      textAlign: 'center',
      [theme.breakpoints.down('md')]: {
        fontSize: '1.5rem',
      },
    },
    text: {
      [theme.breakpoints.down('md')]: {
        fontSize: '1rem',
        textAlign: 'justify',
      },
    },
  });
  const { t } = useTranslation();
  const { userTheme } = useUserSystemTheme();
  const styles = createStyles(userTheme);

  return (
    <Box sx={styles.teamItem}>
      <Box>
        <Avatar src={avatar} sx={styles.avatar}></Avatar>
        <Typography variant="h4" sx={styles.textName}>
          {t(`name${name}`)}
        </Typography>
      </Box>
      <Typography variant="h6" sx={styles.text}>
        {t(`about${name}`)}
      </Typography>
    </Box>
  );
};
