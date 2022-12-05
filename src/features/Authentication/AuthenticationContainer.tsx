import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignInMutation, useSignUpMutation } from '../../api/auth.api';
import { IError, IAuthFormFields } from '../../types/types';
import { toast } from 'react-toastify';
import Authentication from './Authentication';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { setUserInfo } from 'features/authSlice';
import { signInSchema } from 'schema/signInSchema';
import { signUpSchema } from 'schema/signUpSchema';
import { LINKS } from 'constants/constants';
import { useAuth } from 'hooks/useAuth';

const AuthenticationContainer = () => {
  const location = useLocation();
  const isSignIn = location.pathname === LINKS.signIn;
  const authSchema = isSignIn ? signInSchema : signUpSchema;
  const dispatch = useAppDispatch();
  const [signIn, { data, isLoading, isSuccess, error, isError, reset: signInReset }] =
    useSignInMutation();
  const [
    signUp,
    {
      isLoading: isAuthLoading,
      isSuccess: isAuthSuccess,
      error: authError,
      isError: isAuthError,
      reset: signUpReset,
    },
  ] = useSignUpMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAuthFormFields>({
    resolver: yupResolver(authSchema),
  });
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      navigate(LINKS.main);
    }
  }, [token, navigate]);

  useEffect(() => {
    if (isSuccess && isSignIn && data) {
      toast.success('You successfully logged in');
      dispatch(setUserInfo(data));
    }

    if (isAuthSuccess && !isSignIn) {
      toast.success('You successfully create account');
      navigate(LINKS.signIn);
    }
  }, [isSuccess, isSignIn, isAuthSuccess, navigate, dispatch, data]);

  useEffect(() => {
    if (isError) {
      toast.error((error as IError).data.message);
    }

    if (isAuthError) {
      toast.error((authError as IError).data.message);
    }
  }, [isError, isAuthError, authError, error]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!isLoading && isSignIn) {
      const { login, password } = data;
      signIn({ login, password });
    }

    if (!isAuthLoading && !isSignIn) {
      const { name, login, password } = data;
      signUp({ name, login, password });
    }
  };

  const handleResetForm = () => {
    reset();
    signUpReset();
    signInReset();
  };

  return (
    <Authentication
      {...{
        isSignIn,
        handleSubmit,
        onSubmit,
        register,
        errors,
        isLoading,
        isAuthLoading,
        handleResetForm,
      }}
    />
  );
};

export default AuthenticationContainer;
