import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LINKS } from 'constants/constants';
import {
  FieldErrorsImpl,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { IAuthFormFields } from 'types/types';
import { useTranslation } from 'react-i18next';

interface AuthenticationProps {
  isSignIn: boolean;
  handleSubmit: UseFormHandleSubmit<IAuthFormFields>;
  onSubmit: (data: FieldValues) => void;
  register: UseFormRegister<IAuthFormFields>;
  errors: Partial<
    FieldErrorsImpl<{
      name: string;
      agree: boolean;
      login: string;
      password: string;
    }>
  >;
  isLoading: boolean;
  isAuthLoading: boolean;
  handleResetForm: () => void;
}

const Authentication = ({
  isSignIn,
  handleSubmit,
  onSubmit,
  register,
  errors,
  isLoading,
  isAuthLoading,
  handleResetForm,
}: AuthenticationProps) => {
  const { t } = useTranslation();
  return (
    <Container component="main" maxWidth="xs" sx={{ margin: '0 auto' }}>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignIn ? t('signIn') : t('signUp')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          {!isSignIn && (
            <TextField
              {...register('name')}
              autoComplete="given-name"
              name="name"
              fullWidth
              id="firstName"
              label={t('firstName')}
              autoFocus
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
          <TextField
            {...register('login')}
            margin="normal"
            fullWidth
            id="login"
            label={t('login')}
            name="login"
            type="text"
            autoComplete="login"
            error={!!errors.login}
            helperText={errors.login?.message}
          />
          <TextField
            {...register('password')}
            margin="normal"
            fullWidth
            name="password"
            label={t('password')}
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          {!isSignIn && (
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox {...register('agree', { required: true })} name="agree" />}
                label={t('processingPersonalData')}
              />
              <FormHelperText error={!!errors.agree}>{errors.agree?.message}</FormHelperText>
            </Grid>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {isSignIn ? t('signIn') : t('signUp')}
            {(isLoading || isAuthLoading) && (
              <CircularProgress size={16} color={'inherit'} sx={{ ml: 2 }} />
            )}
          </Button>
          <Grid container justifyContent={'end'}>
            <Grid item onClick={handleResetForm}>
              {isSignIn ? (
                <Link href={LINKS.signUp}>{t('dontHaveAccount')}</Link>
              ) : (
                <Link href={LINKS.signIn}>{t('haveAccount')}</Link>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Authentication;
