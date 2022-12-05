import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { BOARD_BUTTONS, BoardFormFields } from '../../types/types';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { addColumnSchema } from '../../schema/addColumnSchema';
import { addTaskSchema } from '../../schema/addTaskSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateColumnMutation } from '../../api/column.api';
import { useCreateTaskMutation } from '../../api/task.api';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Assignees } from '../Assignees/Assignees';
import { editStyles } from '../EditTaskModal/EditTaskModal';
import { useTranslation } from 'react-i18next';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 310,
  bgcolor: 'secondary.dark',
  boxShadow: 24,
  p: 3,
  borderRadius: '15px',
};

const inputStyle = {
  '& .MuiInputBase-root': {
    height: '45px',
  },
};

interface ColumnAddModalProps {
  boardId?: string;
  columnId?: string;
  open: boolean;
  onClose: () => void;
  pressedButtonId: string;
}

const ColumnAddModal = ({
  boardId = '',
  columnId = '',
  open,
  onClose,
  pressedButtonId,
}: ColumnAddModalProps) => {
  const { user } = useAppSelector((state) => state.userState);
  const isAddTask = pressedButtonId === BOARD_BUTTONS.ADD_TASK;
  const addModalSchema = isAddTask ? addTaskSchema : addColumnSchema;
  const [createColumn, { isSuccess, isLoading, reset: fetchReset }] = useCreateColumnMutation();
  const [createTask, { isSuccess: taskSuccess, isLoading: isTaskLoading, reset: taskReset }] =
    useCreateTaskMutation();
  const { columns, tasks, users } = useAppSelector((state) => state.boardState);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BoardFormFields>({ resolver: yupResolver(addModalSchema) });

  const { t } = useTranslation();

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedAssignees(typeof value === 'string' ? value.split(',') : value);
  };

  useEffect(() => {
    if (isSuccess) {
      fetchReset();
    }

    if (taskSuccess) {
      taskReset();
    }

    if (isSuccess || taskSuccess) {
      onClose();
      reset();
      setSelectedAssignees([]);
    }
  }, [fetchReset, isSuccess, onClose, reset, taskReset, taskSuccess]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { title, description } = data;
    if (isAddTask) {
      createTask({
        boardId,
        columnId,
        title,
        description,
        order: tasks[columnId].length,
        userId: user?._id || '',
        users: selectedAssignees,
      });
    } else {
      createColumn({ title, order: columns.length, boardId });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box onSubmit={handleSubmit(onSubmit)} component="form" sx={modalStyle}>
        <Typography color="palette.secondary.light" variant="h6" component="h2" align="center">
          {isAddTask ? t('addTask') : t('addColumn')}
        </Typography>
        <TextField
          {...register('title')}
          sx={inputStyle}
          margin="normal"
          label={t('title')}
          type="text"
          fullWidth={true}
          autoFocus={true}
          focused
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        {isAddTask && (
          <>
            <TextField
              sx={{ marginBottom: '1.3rem' }}
              {...register('description')}
              margin="normal"
              label={t('description')}
              type="text"
              fullWidth={true}
              multiline={true}
              minRows={3}
              maxRows={3}
              focused
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <Assignees
              all={users}
              selected={selectedAssignees}
              handleChange={handleChange}
              id={columnId}
            />
          </>
        )}
        <Box display="flex" justifyContent="center" gap="1rem">
          <Button
            sx={editStyles}
            type={'submit'}
            variant="contained"
            endIcon={
              isLoading || isTaskLoading ? (
                <CircularProgress size={16} color={'inherit'} />
              ) : (
                <CheckOutlinedIcon />
              )
            }
          >
            {t('create')}
          </Button>
          <Button
            sx={editStyles}
            onClick={onClose}
            variant="contained"
            endIcon={<CloseOutlinedIcon />}
          >
            {t('cancel')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default ColumnAddModal;
