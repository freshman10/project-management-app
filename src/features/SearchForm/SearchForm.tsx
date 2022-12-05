import { SelectChangeEvent, TextField, Theme } from '@mui/material';
import { Box } from '@mui/system';
import { StatusChip } from 'components/StatusChip/StatusChip';
import { TasksContainer } from 'components/TasksContainer/TasksContainer';
import { useUserSystemTheme } from 'hooks/useUserSystemTheme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IColumn, ITaskConfig } from 'types/types';

interface SearchFormProps {
  onChangeSearchField: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  search: string;
  status: {
    all: string[];
    selected: string[];
    columns: IColumn[];
  };
  onChangeStatus: (event: SelectChangeEvent<string[]>) => void;
  tasks: ITaskConfig[];
}

export const SearchForm = ({
  onChangeSearchField,
  search,
  status,
  onChangeStatus,
  tasks,
}: SearchFormProps) => {
  const { t } = useTranslation();
  const { userTheme } = useUserSystemTheme();

  const createStyles = (theme: Theme) => ({
    searchPageWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
      marginTop: '1rem',
    },
    searchFormWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '20px',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        gap: '1rem',
      },
    },
    searchField: {
      flexGrow: '3',
      borderRadius: '3rem',
      height: '',
      width: '60vw',
      [theme.breakpoints.down('sm')]: {
        width: '95vw',
      },
    },
  });

  const styles = createStyles(userTheme);
  return (
    <Box sx={styles.searchPageWrapper}>
      <Box sx={styles.searchFormWrapper}>
        <TextField
          name="search"
          id="search"
          type="text"
          autoFocus
          variant="outlined"
          onChange={onChangeSearchField}
          value={search}
          placeholder={t('searchFieldPlaceholder') || ''}
          sx={styles.searchField}
          margin="normal"
        />
        <StatusChip all={status.all} selected={status.selected} onChange={onChangeStatus} />
      </Box>

      <TasksContainer tasks={tasks} />
    </Box>
  );
};
