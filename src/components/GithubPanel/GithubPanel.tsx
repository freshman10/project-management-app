import { Box, Link, SvgIcon, Theme, Typography } from '@mui/material';
import { GITHUB_BASE } from 'constants/constants';
import { useUserSystemTheme } from 'hooks/useUserSystemTheme';
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';

const createStyles = (theme: Theme) => ({
  githubsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '0 5px',
    justifyContent: 'center',
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '280px',
    },
  },
  textWrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.1rem',
    flexWrap: 'wrap',
    p: '3px',
  },
  text: {
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: '0.8rem',
    },
  },
});

const GithubLine = ({ nickname }: { nickname: string }) => {
  const { userTheme } = useUserSystemTheme();
  const styles = createStyles(userTheme);
  return (
    <Link underline="hover" href={`${GITHUB_BASE}/${nickname}`} sx={styles.textWrapper}>
      <SvgIcon>
        <GitHubIcon />
      </SvgIcon>
      <Typography sx={styles.text}>{nickname}</Typography>
    </Link>
  );
};

export const GithubPanel = ({ nicknames }: { nicknames: string[] }) => {
  const { userTheme } = useUserSystemTheme();
  const styles = createStyles(userTheme);

  return (
    <Box sx={styles.githubsWrapper}>
      {nicknames.map((nickname) => (
        <GithubLine key={`github-${nickname}`} nickname={nickname} />
      ))}
    </Box>
  );
};
