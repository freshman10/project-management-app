import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { EditableTextField } from 'components/EditableTextField/EditableTextField';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { memo } from 'react';
import { LoadingButton } from '@mui/lab';
import { CheckPasswordModal } from 'components/CheckPasswordModal/CheckPasswordModal';
import { ConfirmModal } from 'components/ConfirmModal/ConfirmModal';
import { FieldErrorsImpl, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { UserFields } from 'types/types';
import { useTranslation } from 'react-i18next';

interface SettingsProps {
  onCloseConfirmWindow: () => void;
  onDelete: () => void;
  isError: boolean;
  isLoading: boolean;
  onSubmit: UseFormHandleSubmit<UserFields>;
  onClickConfirmChanges: () => void;
  credits: { name: string; login: string; password: string; oldPassword: string };
  register: UseFormRegister<UserFields>;
  errors: Partial<
    FieldErrorsImpl<{
      name: string;
      login: string;
      password: string;
    }>
  >;
  flags: {
    name: boolean;
    login: boolean;
    password: boolean;
    isModal: boolean;
    isDisabled: boolean;
    isConfirmOpen: boolean;
  };
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, tag: string) => void;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    tag: string
  ) => void;
  deleteLoading: boolean;
  onDeleteClick: () => void;
  checkPassword: (password: string) => void;
  closeModal: () => void;
}

const Settings = ({
  onCloseConfirmWindow,
  onDelete,
  isError,
  isLoading,
  onSubmit,
  onClickConfirmChanges,
  credits,
  register,
  errors,
  flags,
  onClick,
  onInputChange,
  deleteLoading,
  onDeleteClick,
  checkPassword,
  closeModal,
}: SettingsProps) => {
  const createStyles = () => ({
    section: {
      display: 'flex',
      width: '100%',
      height: 'calc(100vh - 114px)',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      overflowY: 'auto',
    },
    modal: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      padding: '1rem',
      borderRadius: '1rem',
      border: '0.1rem solid black',
      margin: '1rem',
    },
    text: {
      color: 'secondary.light',
    },
  });
  const { t } = useTranslation();
  const styles = createStyles();
  return (
    <Box sx={styles.section}>
      <Box component="form" onSubmit={onSubmit(onClickConfirmChanges)} sx={styles.modal}>
        <Typography variant="h5" sx={styles.text}>
          {t('editAccount')}
        </Typography>
        <EditableTextField
          defaultValue={credits.name}
          isDisabled={flags.name}
          onClick={onClick}
          onInputChange={onInputChange}
          tag="name"
          name={t('firstName')}
          register={register}
          errors={errors}
        />
        <EditableTextField
          defaultValue={credits.login}
          isDisabled={flags.login}
          onClick={onClick}
          tag="login"
          name={t('login')}
          onInputChange={onInputChange}
          register={register}
          errors={errors}
        />
        <EditableTextField
          defaultValue={credits.password}
          isDisabled={flags.password}
          onClick={onClick}
          tag="password"
          name={t('password')}
          onInputChange={onInputChange}
          register={register}
          errors={errors}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: '0.5rem' }}>
          <LoadingButton
            loading={deleteLoading}
            loadingPosition="start"
            onClick={onDeleteClick}
            startIcon={<DeleteIcon sx={{ marginLeft: '0.5rem' }} color="error" />}
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={flags.isDisabled || !flags.name || !flags.login || !flags.password}
            sx={{ padding: '0.2rem', width: '100%' }}
          >
            {t('confirmChanges')}
          </Button>
        </Box>
      </Box>
      {flags.isModal ? (
        <CheckPasswordModal
          onClickYes={checkPassword}
          onClickNo={closeModal}
          isWrongPassword={isError}
          isLoading={isLoading}
        />
      ) : null}
      <ConfirmModal
        open={flags.isConfirmOpen}
        question={t('doYouWantToDelete')}
        onYesClick={onDelete}
        onNoClick={onCloseConfirmWindow}
      />
    </Box>
  );
};

export default memo(Settings);
