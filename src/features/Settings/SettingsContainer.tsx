import {
  useCheckUserPasswordMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from 'api/user.api';
import { logout, setUser } from 'features/authSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAuth } from 'hooks/useAuth';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { INVALID_TOKEN, LINKS } from 'constants/constants';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from 'schema/userSchema';
import { ErrorObject, UserFields } from 'types/types';
import Settings from './Settings';

const SettingsContainer = () => {
  const [checkUserPassword, { isLoading, isSuccess, isError, reset: signInReset }] =
    useCheckUserPasswordMutation();
  const [
    updateUser,
    { isSuccess: isSuccessfullyUpdated, reset: updateReset, isError: updateFailed, error },
  ] = useUpdateUserMutation();
  const navigate = useNavigate();
  const [deleteUser, { isSuccess: userDeleted, reset: deleteReset, isLoading: deleteLoading }] =
    useDeleteUserMutation();
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const [credits, setCredits] = useState({
    name: user?.name || '',
    login: user?.login || '',
    password: '',
    oldPassword: '',
  });
  const [flags, setFlags] = useState({
    name: true,
    login: true,
    password: true,
    isModal: false,
    isDisabled: true,
    isConfirmOpen: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFields>({
    defaultValues: { name: credits.name, login: credits.login, password: '' },
    resolver: yupResolver(userSchema),
  });

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, tag: string) => {
    const target = (e.target as HTMLElement).closest('.top-level') as HTMLElement;
    switch (target?.dataset?.id) {
      case `edit-${tag}`:
        setFlags((flags) => ({ ...flags, [tag]: false }));
        break;
      case `done-${tag}`:
        setFlags((flags) => ({ ...flags, [tag]: true }));
        break;
      default:
        break;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    tag: string
  ) => {
    setFlags((flags) => ({ ...flags, isDisabled: false }));
    setCredits((credits) => ({ ...credits, [tag]: e.target.value }));
  };

  const handleClickConfirmChanges = () => {
    setFlags((flags) => ({ ...flags, isModal: true }));
  };

  const closeModal = () => {
    setFlags((flags) => ({ ...flags, isModal: false }));
  };
  const checkPassword = (password: string) => {
    checkUserPassword({ login: user?.login || '', password });
    setCredits((credits) => ({ ...credits, oldPassword: password }));
  };
  const handleDeleteClick = () => {
    setFlags((flags) => ({ ...flags, isConfirmOpen: true }));
  };
  const handleDelete = () => {
    setFlags((flags) => ({ ...flags, isConfirmOpen: false }));
    deleteUser(user?._id || '');
  };
  const handleCloseConfirmWindow = () => {
    setFlags((flags) => ({ ...flags, isConfirmOpen: false }));
  };
  useEffect(() => {
    if (isSuccess) {
      closeModal();
      signInReset();
      setCredits((credits) => ({
        ...credits,
        user: JSON.stringify({ _id: user?._id || '', name: credits.name, login: credits.login }),
      }));
      updateUser({
        _id: user?._id || '',
        name: credits.name,
        login: credits.login,
        password: credits.password.length ? credits.password : credits.oldPassword,
      });
    }
  }, [
    isSuccess,
    credits.login,
    credits.name,
    credits.password,
    credits.oldPassword,
    dispatch,
    signInReset,
    updateUser,
    user?._id,
  ]);

  useEffect(() => {
    if (userDeleted) {
      dispatch(logout());
      navigate(LINKS.welcome);
      dispatch(setUser({ _id: '', name: '', login: '' }));
      deleteReset();
    }
  }, [userDeleted, dispatch, navigate, deleteReset]);

  useEffect(() => {
    if (isSuccessfullyUpdated) {
      updateReset();
      setFlags((flags) => ({ ...flags, isDisabled: true }));
      dispatch(setUser({ _id: user?._id || '', name: credits.name, login: credits.login }));
      toast.success('Success! Updated!');
    }
  }, [isSuccessfullyUpdated, dispatch, updateReset, user?._id, credits.login, credits.name]);

  useEffect(() => {
    if (updateFailed) {
      if ((error as ErrorObject)?.data?.message === INVALID_TOKEN) {
        navigate(LINKS.welcome);
        dispatch(logout());
      } else {
        toast.error('This login already exists');
        setFlags((flags) => ({ ...flags, isDisabled: true }));
      }
      updateReset();
    }
  }, [dispatch, navigate, error, updateFailed, updateReset]);

  return (
    <Settings
      {...{
        onInputChange: handleChange,
        register,
        onClick: handleClick,
        onClickConfirmChanges: handleClickConfirmChanges,
        onCloseConfirmWindow: handleCloseConfirmWindow,
        onDelete: handleDelete,
        onDeleteClick: handleDeleteClick,
        onSubmit: handleSubmit,
        isError,
        isLoading,
        credits,
        checkPassword,
        errors,
        flags,
        deleteLoading,
        closeModal,
      }}
    />
  );
};

export default SettingsContainer;
