import React, { useEffect } from 'react';
import { Box, Button, Skeleton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { INVALID_TOKEN, LINKS } from '../../constants/constants';
import { useGetBoardQuery } from '../../api/main.api';
import { toast } from 'react-toastify';

import { IError, ErrorObject } from '../../types/types';
import { useDispatch } from 'react-redux';
import { logout } from 'features/authSlice';
import { useTranslation } from 'react-i18next';

const StyledBoardBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

const goBackStyles = {
  '&.MuiButtonBase-root': {
    background: 'unset',
    boxShadow: 'unset',
    color: 'secondary.light',
    border: '1px dashed',
    borderColor: 'secondary.light',
    '&:hover': {
      color: 'grey.700',
      border: '1px solid #b3bac3',
    },
  },
  ml: '1rem',
  minWidth: '100px',
  height: '39px',
};

const BoardHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { boardId } = useParams();
  const { data, isSuccess, isError, error } = useGetBoardQuery(boardId as string);

  const { title, description } = JSON.parse(data?.title || '{}');

  if (isError) {
    if ((error as IError)?.data?.statusCode === 404) {
      navigate(LINKS.error);
    }
    toast.error((error as IError).data.message);
  }

  useEffect(() => {
    if ((error as ErrorObject)?.data?.message === INVALID_TOKEN) {
      navigate(LINKS.welcome);
      dispatch(logout());
    }
  }, [dispatch, navigate, error]);

  return (
    <Box color="palette.secondary.light">
      <StyledBoardBox pt={3}>
        <Button
          sx={goBackStyles}
          onClick={() => navigate(LINKS.main)}
          variant="outlined"
          startIcon={<ChevronLeftIcon />}
        >
          {t('back')}
        </Button>
        <Typography>{isSuccess ? description : <Skeleton variant="text" width={100} />}</Typography>
      </StyledBoardBox>
      <Typography textAlign="center" fontSize={20}>
        {isSuccess ? title : <Skeleton sx={{ m: '0 auto' }} width={100} variant="text" />}
      </Typography>
    </Box>
  );
};

export default BoardHeader;
