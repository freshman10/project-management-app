import { Box } from '@mui/material';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { LoadingButton } from '@mui/lab';
import { CardControlsButtonProps } from 'types/types';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMain } from 'hooks/useMain';
import { useTranslation } from 'react-i18next';

export const CardControlButtons = ({
  id,
  onClick,
  isDeleting,
  isEditing,
  isDisabled,
}: CardControlsButtonProps) => {
  const { t } = useTranslation();
  const { boardID } = useMain();
  const styles = {
    background: 'transparent',
    padding: '0px',
    boxShadow: 'none',
    color: 'info.light',
  };
  return (
    <Box
      onClick={(e) => onClick(e, id)}
      sx={{ position: 'absolute', top: '-7px', right: '0.5rem', display: 'flex', gap: 1 }}
    >
      <LoadingButton
        sx={styles}
        loading={boardID === id ? isEditing : false}
        loadingPosition="start"
        startIcon={<EditIcon color="info" />}
        variant="text"
        className="top-level"
        data-id="edit"
      >
        {t('edit')}
      </LoadingButton>
      <LoadingButton
        sx={styles}
        loading={boardID === id ? isDeleting : false}
        loadingPosition="start"
        startIcon={<DeleteIcon color="error" />}
        variant="text"
        className="top-level"
        data-id="delete"
        disabled={isDisabled}
      >
        {t('delete')}
      </LoadingButton>
    </Box>
  );
};
