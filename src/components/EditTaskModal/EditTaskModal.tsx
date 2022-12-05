import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Grid, IconButton, SelectChangeEvent, Stack, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { BoardFormFields, IError } from '../../types/types';
import { addTaskSchema } from '../../schema/addTaskSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateTaskMutation } from '../../api/task.api';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Assignees } from '../Assignees/Assignees';
import { useTranslation } from 'react-i18next';
import { useCreateBoardMutation } from '../../api/main.api';
import { useNavigate } from 'react-router-dom';
import { LINKS } from '../../constants/constants';
import { useGetUsersQuery } from '../../api/user.api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '300px',
  maxWidth: '400px',
  bgcolor: 'secondary.dark',
  boxShadow: 24,
  p: '20px 25px',
  borderRadius: '10px',
};

const inputStyle = {
  '& .MuiInputBase-root': {
    height: '45px',
  },
};

export const editStyles = {
  mt: 2,
  background: 'unset',
  boxShadow: 'unset',
  backgroundColor: '#707090',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(112, 112, 144, 0.9)',
  },
};

interface EditTaskModalProps {
  boardId: string;
  columnId?: string;
  taskId?: string;
  title: string;
  description: string;
  order: number;
  open: boolean;
  onClose: () => void;
  assignees: string[];
}

const EditTaskModal = ({
  columnId,
  boardId,
  taskId,
  title,
  description,
  order,
  open,
  onClose,
  assignees,
}: EditTaskModalProps) => {
  const isEdit = !!title;
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>(assignees);
  const { user } = useAppSelector((state) => state.userState);
  const { data } = useGetUsersQuery();
  const [updateTask, { error, isError, isLoading, reset: updateReset, isSuccess }] =
    useUpdateTaskMutation();
  const [createBoard, { isLoading: isCreating, isSuccess: createSuccess, reset: createBordReset }] =
    useCreateBoardMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { isDirty, errors },
  } = useForm<BoardFormFields>({
    resolver: yupResolver(addTaskSchema),
  });
  const { t } = useTranslation();

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedAssignees(typeof value === 'string' ? value.split(',') : value);
    setFocus('description');
  };

  useEffect(() => {
    if (isSuccess) {
      updateReset();
    }

    if (createSuccess) {
      createBordReset();
      navigate(LINKS.main);
      toast.success(t('successBoardCreated'));
      setSelectedAssignees([]);
    }

    if (isSuccess || createSuccess) {
      onClose();
      reset({ title, description });
    }
  }, [
    createSuccess,
    isSuccess,
    onClose,
    updateReset,
    createBordReset,
    navigate,
    reset,
    title,
    description,
    t,
  ]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { title, description } = data;

    if (isEdit) {
      updateTask({
        boardId,
        columnId,
        taskId,
        order,
        title,
        description,
        userId: user?._id || '',
        users: selectedAssignees,
      });
    } else {
      createBoard({
        title: JSON.stringify(data),
        owner: user?._id || '',
        users: selectedAssignees,
      });
    }
  };

  const handleClose = () => {
    reset({ title, description });
    onClose();
  };

  if (isError) {
    toast.error((error as IError).data.message);
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid sx={style}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Stack direction="row" spacing={2} alignItems="center">
                <AssignmentIcon sx={{ color: 'secondary.light', mr: 1 }} />
                <Typography color="palette.secondary.light" variant="h6" component="h2">
                  {isEdit ? t('editTask') : t('createProject')}
                </Typography>
              </Stack>
              <IconButton onClick={handleClose} size="small">
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            <TextField
              {...register('title', { value: title, max: 5 })}
              id="taskTitle"
              sx={inputStyle}
              fullWidth
              margin="normal"
              label={t('title')}
              type="text"
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              sx={{ mb: 3 }}
              {...register('description', { value: description })}
              id="taskDescription"
              fullWidth
              multiline
              margin="normal"
              label={t('description')}
              type="text"
              minRows={3}
              maxRows={3}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <Assignees
              register={register}
              all={data || []}
              selected={selectedAssignees}
              handleChange={handleChange}
              id={taskId || ''}
            />
            <LoadingButton
              type="submit"
              disabled={!isDirty}
              sx={editStyles}
              fullWidth
              loading={isLoading || isCreating}
              variant="contained"
            >
              {isEdit ? t('confirmEdit') : t('create')}
            </LoadingButton>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditTaskModal;
