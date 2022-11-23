import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';
import {
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useGetBoardsQuery,
  useUpdateBoardMutation,
} from 'api/main.api';
import { BoardForm } from 'components/BoardForm/BoardForm';
import { BoardsContainer } from 'components/BoardsContainer/BoardsContainer';
import { ConfirmModal } from 'components/ConfirmModal/ConfirmModal';
import {
  setBoardID,
  setModalOption,
  toggleConfirmationWindow,
  toggleModalWindow,
} from 'features/mainSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAuth } from 'hooks/useAuth';
import { useMain } from 'hooks/useMain';
import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { BoardConfig, BoardFormOptions, ErrorObject } from 'types/types';

export const Main = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isModalOpen, modalOption, boardID, isConfirmationOpen } = useMain();
  const { user } = useAuth();
  const { data: boards = [], isLoading: isGetting, isFetching } = useGetBoardsQuery();
  const [
    createBoard,
    {
      isLoading: isCreating,
      isError: isCreatingFailed,
      error: creatingError,
      isSuccess: createSuccess,
      reset: createBordReset,
    },
  ] = useCreateBoardMutation();
  const [
    updateBoard,
    {
      isLoading: isUpdating,
      isError: isUpdatingFailed,
      error: updatingError,
      isSuccess: updateSuccess,
      reset: updateBordReset,
    },
  ] = useUpdateBoardMutation();
  const [
    deleteBoard,
    {
      isLoading: isDeleting,
      isError: isDeletingFailed,
      error: deletingError,
      isSuccess: deleteSuccess,
      reset: deleteBordReset,
    },
  ] = useDeleteBoardMutation();

  const toastErrorDisplay = (error: ErrorObject) => {
    toast.error(error?.data?.message || 'Something went wrong');
  };

  if (isUpdatingFailed) {
    toastErrorDisplay(updatingError as ErrorObject);
    updateBordReset();
  }
  if (isDeletingFailed) {
    toastErrorDisplay(deletingError as ErrorObject);
    deleteBordReset();
  }
  if (isCreatingFailed) {
    toastErrorDisplay(creatingError as ErrorObject);
    createBordReset();
  }

  if (createSuccess) {
    toast.success('Board has been created!');
    createBordReset();
  }

  if (updateSuccess) {
    toast.success('Board has been updated!');
    updateBordReset();
  }

  if (deleteSuccess) {
    toast.success('Board has been deleted!');
    deleteBordReset();
  }

  useEffect(() => {
    dispatch(setBoardID(''));
  }, [isFetching, dispatch]);

  const filterUserBoards = (data: BoardConfig[]): BoardConfig[] => {
    return data.filter(
      (board) => board.owner === user?._id || board.users.includes(user?._id || '')
    );
  };
  const userBoards = filterUserBoards(boards);
  const { title, description } = JSON.parse(
    userBoards.filter((board) => board._id === boardID)[0]?.title || '{}'
  );
  const handleButtonClick = () => {
    dispatch(setModalOption(BoardFormOptions.create));
    dispatch(toggleModalWindow(true));
  };

  const onDeleteBoard = () => {
    deleteBoard(boardID);
    dispatch(toggleConfirmationWindow(false));
  };

  const onExitConfirmationModal = () => {
    dispatch(toggleConfirmationWindow(false));
    dispatch(setBoardID(''));
  };
  const handleSubmit: SubmitHandler<FieldValues> = (values) => {
    switch (modalOption) {
      case BoardFormOptions.create:
        createBoard({ title: JSON.stringify(values), owner: user?._id || '', users: [] });
        dispatch(toggleModalWindow(false));
        break;
      case BoardFormOptions.edit:
        const { users, owner, _id } = userBoards.filter(({ _id }) => _id === boardID)[0];
        dispatch(toggleModalWindow(false));
        updateBoard({ title: JSON.stringify(values), owner, users, _id });
        break;
      default:
    }
  };

  const handleClickModal = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
  ) => {
    const target = (e.target as HTMLElement).closest('.top-level') as HTMLElement;
    if (target?.dataset.id === 'close') {
      dispatch(toggleModalWindow(false));
      dispatch(setBoardID(''));
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '1rem',
        width: '80vw',
        height: '81.7vh',
        margin: '0 auto',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: 7,
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
      }}
    >
      <Typography variant="h4">{t('Boards')}</Typography>
      <LoadingButton
        loading={isCreating}
        color="success"
        sx={{ width: 'fit-content', padding: '10px 10px' }}
        onClick={handleButtonClick}
      >
        {t('addBoard')}
      </LoadingButton>
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
            onClick: handleClickModal,
            onSubmit: handleSubmit,
            defaultValue: { title, description },
          }}
        />
      )}
      {isConfirmationOpen && (
        <ConfirmModal
          {...{
            question: t('questuionDelete'),
            onYesClick: onDeleteBoard,
            onNoClick: onExitConfirmationModal,
          }}
        />
      )}
    </Box>
  );
};
