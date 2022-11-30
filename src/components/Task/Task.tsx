import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import EditTaskModal from '../EditTaskModal/EditTaskModal';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { QUESTION_ON_DELETE } from '../../constants/constants';
import { ITaskProps } from '../../types/types';
import { useDeleteTaskMutation } from '../../api/task.api';
import { toast } from 'react-toastify';
import { IError } from '../../types/types';

const boxStyles = {
  '&.MuiBox-root': {
    boxShadow: '0 0 8px rgb(0 0 0 / 25%)',
  },
  width: '280px',
  marginTop: '10px',
  padding: '5px 5px 5px 10px',
  borderRadius: '7px',
  backgroundColor: 'white',
  wordBreak: 'break-all',
  cursor: 'pointer',
};

const titleStyles = {
  background: 'linear-gradient(90deg, #9ea7fc 17%, #6eb4f7 83%)',
  p: '0px 10px',
  borderRadius: '3px',
};

const addRespStyles = {
  '&.MuiButtonBase-root': {
    color: '#b7bec7',
    width: '25px',
    height: '25px',
    border: '1px dashed #b7bec7',
    borderRadius: '50px',
  },
};

const respStyles = {
  background: 'linear-gradient(138.6789deg, #81d5ee 17%, #7ed492 83%)',
  p: '0px 3px',
  borderRadius: '3px',
  mr: 1,
  wordBreak: 'keep-all',
};

const userStyles = {
  fontSize: '12px',
  lineHeight: '14px',
  p: '0.25em 0.4em',
  backgroundColor: '#6c757d',
  borderRadius: '0.25rem',
};

const Task = ({ id, order, boardId, columnId, title, description, _id, assignees }: ITaskProps) => {
  const [deleteTask, { isError, error }] = useDeleteTaskMutation();
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = () => {
    deleteTask({ boardId, columnId, taskId: id || _id });
    setConfirmOpen(false);
  };

  if (isError) {
    toast.error((error as IError).data.message);
  }

  return (
    <Box sx={boxStyles}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box sx={titleStyles}>
          <Typography color="white" sx={{ lineHeight: 1.3 }}>
            {title}
          </Typography>
        </Box>
        <IconButton onClick={() => setConfirmOpen(true)} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <Typography color="#707090" fontSize="14px">
        {description}
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" gap={1}>
        <Box display="flex" alignItems="center" color="white">
          <Typography sx={respStyles} fontSize="13px">
            Responsible:
          </Typography>
          <Typography sx={userStyles}>
            {assignees.length ? `${assignees.join(', ')}` : 'unassigned'}
          </Typography>
        </Box>
        <IconButton onClick={handleOpen} sx={addRespStyles} size="small">
          <SearchSharpIcon sx={{ fontSize: '17px' }} />
        </IconButton>
      </Box>
      <EditTaskModal
        title={title}
        order={order}
        description={description}
        open={open}
        boardId={boardId}
        columnId={columnId}
        taskId={id}
        onClose={handleClose}
        assignees={assignees}
      />
      {confirmOpen && (
        <ConfirmModal
          question={QUESTION_ON_DELETE}
          onYesClick={handleDelete}
          onNoClick={() => setConfirmOpen(false)}
        />
      )}
    </Box>
  );
};

export default Task;
