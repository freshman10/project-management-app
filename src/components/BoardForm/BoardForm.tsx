import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { BoardFormFields, BoardFormProps } from 'types/types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { boardSchema } from 'schema/boardSchema';
import { useTranslation } from 'react-i18next';

export const BoardForm = ({ onClick, onSubmit, defaultValue }: BoardFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BoardFormFields>({
    resolver: yupResolver(boardSchema),
  });
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        zIndex: '1',
      }}
    >
      <Box
        onClick={onClick}
        data-id="close"
        className="top-level"
        sx={{
          position: 'fixed',
          zIndex: '3',
          top: '0',
          left: '0',
          width: '100vw',
          height: '100vh',
          background: '#000',
          opacity: '0.5',
        }}
      />
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          display: 'flex',
          position: 'absolute',
          zIndex: '4',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
          minWidth: '300px',
          maxWidth: '400px',
          width: 'fit-content',
          padding: '1rem',
          backgroundColor: 'secondary.dark',
          borderRadius: '1rem',
          opacity: '1',
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: 'info.contrastText', width: '80%', textAlign: 'center' }}
        >
          {t('editProject')}
        </Typography>
        <TextField
          {...register('title')}
          name="title"
          id="title"
          type="text"
          autoFocus
          defaultValue={defaultValue.title}
          error={!!errors.title}
          helperText={errors.title?.message}
          label={t('title')}
          variant="outlined"
          sx={{ width: '80%' }}
        />
        <TextField
          {...register('description')}
          name="description"
          id="description"
          type="text"
          defaultValue={defaultValue.description}
          error={!!errors.description}
          helperText={errors.description?.message}
          maxRows={6}
          minRows={6}
          placeholder={t('description') || ''}
          label={t('description')}
          multiline
          sx={{ width: '80%' }}
        />
        <Button type="submit" color="success" variant="contained">
          {t('edit')}
        </Button>
        <IconButton
          onClick={(e) => onClick(e)}
          className="top-level"
          aria-label="close"
          data-id="close"
          size="small"
          sx={{
            position: 'absolute',
            top: '0',
            right: '0',
            width: '3rem',
            height: '3rem',
            borderRadius: 50,
            border: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
