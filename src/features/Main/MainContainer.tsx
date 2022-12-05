import { useDeleteBoardMutation, useGetBoardsQuery, useUpdateBoardMutation } from 'api/main.api';
import { INVALID_TOKEN } from 'constants/constants';
import { logout } from 'features/authSlice';
import { setBoardID, toggleConfirmationWindow, toggleModalWindow } from 'features/mainSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAuth } from 'hooks/useAuth';
import { useMain } from 'hooks/useMain';
import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BoardConfig, ErrorObject } from 'types/types';
import { Main } from './Main';

const MainContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isModalOpen, modalOption, boardID, isConfirmationOpen } = useMain();
  const { user } = useAuth();
  const {
    data: boards = [],
    isLoading: isGetting,
    isFetching,
    error: getBoardsError,
  } = useGetBoardsQuery();
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
  const { t } = useTranslation();

  const toastErrorDisplay = (error: ErrorObject) => {
    toast.error(error?.data?.message || t('somethingWentWrong'));
  };

  if (isUpdatingFailed) {
    toastErrorDisplay(updatingError as ErrorObject);
    updateBordReset();
  }
  if (isDeletingFailed) {
    toastErrorDisplay(deletingError as ErrorObject);
    deleteBordReset();
  }

  if (updateSuccess) {
    toast.success(t('successBoardUpdated'));
    updateBordReset();
  }

  if (deleteSuccess) {
    toast.success(t('successBoardDeleted'));
    deleteBordReset();
  }

  useEffect(() => {
    dispatch(setBoardID(''));
  }, [isFetching, dispatch]);

  const filterUserBoards = (data: BoardConfig[]): BoardConfig[] => {
    return data.filter((board) => {
      return board.owner === user?._id || board.users.includes(user?.login || '');
    });
  };
  const userBoards = filterUserBoards(boards);
  const { title, description } = JSON.parse(
    userBoards.filter((board) => board._id === boardID)[0]?.title || '{}'
  );

  const onDeleteBoard = () => {
    deleteBoard(boardID);
    dispatch(toggleConfirmationWindow(false));
  };

  const onExitConfirmationModal = () => {
    dispatch(toggleConfirmationWindow(false));
    dispatch(setBoardID(''));
  };
  const handleSubmit: SubmitHandler<FieldValues> = (values) => {
    dispatch(toggleModalWindow(false));
    const { title, description } = JSON.parse(
      boards.filter((board) => board._id === boardID)[0]?.title || '{}'
    );
    if (title === values.title && description === values.description) {
      return;
    }

    const { users, owner, _id } = userBoards.filter(({ _id }) => _id === boardID)[0];
    updateBoard({ title: JSON.stringify(values), owner, users, _id });
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

  useEffect(() => {
    if ((getBoardsError as ErrorObject)?.data?.message === INVALID_TOKEN) {
      dispatch(logout());
    }
  }, [dispatch, navigate, getBoardsError]);

  return (
    <Main
      {...{
        isConfirmationOpen,
        isDeleting,
        isFetching,
        isGetting,
        isModalOpen,
        isUpdating,
        onClickModal: handleClickModal,
        onSubmit: handleSubmit,
        onDeleteBoard,
        modalOption,
        onExitConfirmationModal,
        userBoards,
        updateBoard,
        title,
        description,
      }}
    />
  );
};

export default MainContainer;
