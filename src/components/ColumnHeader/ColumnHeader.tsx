import React, { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, IconButton, InputBase } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { useParams } from 'react-router-dom';
import { useDeleteColumnMutation, useUpdateColumnMutation } from '../../api/column.api';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import Badge from '@mui/material/Badge';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useTranslation } from 'react-i18next';

const StyledBoardItemHeader = styled(Box)(() => ({
  display: 'flex',
  gap: '5px',
  height: '35px',
}));

const styledBadge = {
  '& .MuiBadge-badge': {
    right: '-14px',
    top: '-15px',
    padding: '0 4px',
    backgroundColor: '#707090',
    color: 'white',
  },
};

const sxStyles = {
  '& .MuiInputBase-input': {
    height: '17px',
    padding: '5px',
    border: '1px solid transparent',
    '&:focus': {
      border: '1px solid #b1b1b1',
      borderRadius: '5px',
    },
  },
};

interface ColumnHeaderProps {
  name: string;
  columnId: string;
  order: number;
}

const ColumnHeader = ({ order, name, columnId }: ColumnHeaderProps) => {
  const { boardId } = useParams();
  const inputRef = useRef<HTMLDivElement>();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [columnName, setColumnName] = useState(name);
  const [deleteColumn, { isLoading }] = useDeleteColumnMutation();
  const [updateColumn] = useUpdateColumnMutation();
  const { tasks } = useAppSelector((state) => state.boardState);
  const { t } = useTranslation();

  useEffect(() => {
    (inputRef.current?.firstElementChild as HTMLInputElement)?.focus();
  }, [isEdit]);

  const handleClick = () => {
    if (isEdit && boardId) {
      updateColumn({ title: columnName, boardId, columnId, order });
    }
    setIsEdit(!isEdit);
  };

  const handleDelete = () => {
    if (boardId) {
      setOpen(false);
      deleteColumn({ boardId, columnId });
    }
  };

  return (
    <StyledBoardItemHeader>
      {tasks[columnId]?.length > 0 && (
        <Badge sx={styledBadge} badgeContent={tasks[columnId]?.length}></Badge>
      )}
      <InputBase
        onChange={(e) => setColumnName(e.target.value)}
        color="secondary"
        value={columnName}
        ref={inputRef}
        sx={sxStyles}
        disabled={!isEdit}
      />
      <IconButton onClick={handleClick} size="medium" aria-label="edit">
        {isEdit ? (
          <CheckOutlinedIcon fontSize="small" color="success" />
        ) : (
          <EditIcon fontSize="small" />
        )}
      </IconButton>
      <IconButton onClick={() => setOpen(true)} size="medium" aria-label="delete">
        {isLoading ? (
          <CircularProgress size={16} color={'inherit'} />
        ) : (
          <DeleteIcon fontSize="small" color="error" />
        )}
      </IconButton>
      <ConfirmModal
        open={open}
        question={t('questuionDelete')}
        onYesClick={handleDelete}
        onNoClick={() => setOpen(false)}
      />
    </StyledBoardItemHeader>
  );
};

export default ColumnHeader;
