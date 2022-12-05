import { Box, Button, Modal, Theme, Typography } from '@mui/material';
import Fade from '@mui/material/Fade';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ConfirmModalProps } from 'types/types';
import Backdrop from '@mui/material/Backdrop';
import { editStyles } from '../EditTaskModal/EditTaskModal';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useUserSystemTheme } from 'hooks/useUserSystemTheme';

const createModalStyles = (theme: Theme) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 330,
  bgcolor: 'secondary.dark',
  boxShadow: 24,
  p: 3,
  borderRadius: '15px',
  [theme.breakpoints.down('sm')]: {
    width: 300,
    p: 2,
  },
});

export const ConfirmModal = ({ open, question, onYesClick, onNoClick }: ConfirmModalProps) => {
  const { t } = useTranslation();
  const { userTheme } = useUserSystemTheme();
  const modalStyles = createModalStyles(userTheme);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onNoClick}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyles}>
            <Typography
              mb={1}
              id="transition-modal-title"
              variant="h6"
              component="h2"
              textAlign="center"
            >
              {question}
            </Typography>
            <Box display="flex" justifyContent="center" gap="1rem">
              <Button sx={editStyles} onClick={onYesClick} endIcon={<CheckOutlinedIcon />}>
                {t('yes')}
              </Button>
              <Button sx={editStyles} onClick={onNoClick} endIcon={<CloseOutlinedIcon />}>
                {t('no')}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
