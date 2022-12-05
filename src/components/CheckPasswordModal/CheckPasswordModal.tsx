import { LoadingButton } from '@mui/lab';
import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckPasswordModalProps } from 'types/types';

export const CheckPasswordModal = ({
  onClickYes,
  onClickNo,
  isWrongPassword,
  isLoading,
}: CheckPasswordModalProps) => {
  const [password, setPassword] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(e.target.value);
  };
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Box
        data-id="close"
        className="top-level"
        sx={{
          position: 'fixed',
          zIndex: 2,
          top: '0',
          left: '0',
          width: '100vw',
          height: '100vh',
          background: '#333333',
          opacity: '0.5',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          zIndex: '3',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
          minWidth: '300px',
          width: '30vw',
          padding: '1rem',
          background: 'white',
          borderRadius: '1rem',
        }}
      >
        <Typography variant="h5" color="primary.main">
          {t('enterPassword')}
        </Typography>
        <TextField
          onChange={handleChange}
          type="password"
          sx={{
            input: { color: 'primary.main' },
            border: '1px solid black',
            borderRadius: '0.2rem',
          }}
        />
        {isWrongPassword ? <Typography color="error">{t('wrongPassword')}</Typography> : <></>}
        <Box sx={{ display: 'flex', gap: '1rem', width: '100%' }}>
          <LoadingButton
            loading={isLoading}
            onClick={() => onClickYes(password)}
            sx={{ padding: '0', width: '100%' }}
          >
            {t('apply')}
          </LoadingButton>
          <Button onClick={onClickNo} sx={{ padding: '0', width: '100%' }}>
            {t('cancel')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
