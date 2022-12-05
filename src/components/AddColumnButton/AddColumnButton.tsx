import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';

const AddTasksButtonStyles = {
  '&.MuiButtonBase-root': {
    background: 'unset',
    boxShadow: 'unset',
    color: 'secondary.light',
    border: '1px dashed',
    borderColor: 'secondary.light',
    '&:hover': {
      border: '1px solid #b3bac3',
    },
  },
  minWidth: '200px',
  height: '39px',
};

interface AddColumnButtonProps {
  onClick: (buttonId: string) => void;
}

const AddColumnButton = ({ onClick }: AddColumnButtonProps) => {
  const { t } = useTranslation();
  const handleButtonClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    onClick(target.id);
  };

  return (
    <Button
      id="add-column"
      onClick={(e) => handleButtonClick(e)}
      sx={AddTasksButtonStyles}
      variant="text"
      startIcon={<AddIcon />}
    >
      {t('addColumn')}
    </Button>
  );
};

export default AddColumnButton;
