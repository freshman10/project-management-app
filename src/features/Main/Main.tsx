import { Theme, Typography } from '@mui/material';
import { Box } from '@mui/system';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from '@reduxjs/toolkit/dist/query';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { BoardForm } from 'components/BoardForm/BoardForm';
import { BoardsContainer } from 'components/BoardsContainer/BoardsContainer';
import { ConfirmModal } from 'components/ConfirmModal/ConfirmModal';
import { useUserSystemTheme } from 'hooks/useUserSystemTheme';
import React from 'react';
import { FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BoardConfig, BoardFormOptions } from 'types/types';

interface MainProps {
  userBoards: BoardConfig[];
  isFetching: boolean;
  isGetting: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  updateBoard: MutationTrigger<
    MutationDefinition<
      BoardConfig,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        Record<string, unknown>,
        FetchBaseQueryMeta
      >,
      'boards',
      BoardConfig,
      'mainApi'
    >
  >;
  isModalOpen: boolean;
  modalOption: BoardFormOptions;
  title: string;
  description: string;
  onClickModal: (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => void;
  onSubmit: (values: FieldValues) => void;
  isConfirmationOpen: boolean;
  onDeleteBoard: () => void;
  onExitConfirmationModal: () => void;
}

export const Main = ({
  userBoards,
  isFetching,
  isGetting,
  isUpdating,
  isDeleting,
  updateBoard,
  isModalOpen,
  modalOption,
  title,
  description,
  onClickModal,
  onSubmit,
  isConfirmationOpen,
  onDeleteBoard,
  onExitConfirmationModal,
}: MainProps) => {
  const { t } = useTranslation();
  const { userTheme } = useUserSystemTheme();

  const createStyles = (theme: Theme) => ({
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: '1rem',
      width: '80vw',
      height: 'calc(100vh - 114px)',
      margin: '0 auto',
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        width: 5,
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
        borderRadius: 2,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#1976d2',
        outline: `1px solid slategrey`,
        borderRadius: 2,
      },
      [theme.breakpoints.down('sm')]: {
        width: 'calc(100vw - 20px)',
      },
    },
  });

  const styles = createStyles(userTheme);

  return (
    <Box sx={styles.pageContainer}>
      <Typography variant="h4">{t('Boards')}</Typography>
      <BoardsContainer
        boards={userBoards}
        isLoading={isFetching && isGetting}
        isDeleting={isDeleting}
        isEditing={isUpdating}
        update={updateBoard}
      />

      {isModalOpen && (
        <BoardForm
          {...{
            option: modalOption,
            onClick: onClickModal,
            onSubmit: onSubmit,
            defaultValue: { title, description },
          }}
        />
      )}
      <ConfirmModal
        open={isConfirmationOpen}
        question={t('questuionDelete')}
        onYesClick={onDeleteBoard}
        onNoClick={onExitConfirmationModal}
      />
    </Box>
  );
};
