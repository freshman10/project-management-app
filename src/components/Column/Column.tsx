import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Divider, List, Paper } from '@mui/material';
import ColumnHeader from '../ColumnHeader/ColumnHeader';
import TaskDnd from '../TaskDnd/TaskDnd';
import AddIcon from '@mui/icons-material/Add';
import { useGetTasksQuery } from '../../api/task.api';
import { IError, ErrorObject, ITaskConfig } from '../../types/types';
import { toast } from 'react-toastify';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addTasks } from '../../features/columnSlice';
import { INVALID_TOKEN, LINKS } from 'constants/constants';
import { logout } from 'features/authSlice';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../Spinner/Spinner';
import { useTranslation } from 'react-i18next';

const dividerStyles = {
  '&.MuiDivider-root': {
    borderColor: 'rgba(0, 0, 0, 0.42)',
  },
  marginTop: '5px',
};

const addButtonStyles = {
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
  marginTop: '5px',
  width: '290px',
  minHeight: '48px',
};

const StyledBoardItem = styled(Paper)(() => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '280px',
  maxHeight: '100%',
  padding: '15px 5px 10px',
  borderRadius: '10px',
  backgroundColor: 'transparent',
}));

const taskListStyle = {
  position: 'unset',
  flex: '1 1 auto',
  minHeight: '1px',
  mb: '10px',
  p: '2px',
  display: 'flex',
  gridGap: '7px',
  gap: '7px',
  flexDirection: 'column',
  overflow: 'hidden auto',
  '&::-webkit-scrollbar': {
    width: 7,
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
    borderRadius: 2,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#707090',
    borderRadius: 2,
  },
};

interface IColumnProps {
  id: string;
  boardId?: string;
  name: string;
  order: number;
  onClick: (buttonId: string, columnId?: string) => void;
}

const Column = ({ id, boardId, name, order, onClick }: IColumnProps) => {
  const { t } = useTranslation();
  const { data, isLoading, isError, error } = useGetTasksQuery({
    boardId,
    columnId: id,
  });
  const { tasks } = useAppSelector((state) => state.boardState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      dispatch(addTasks({ id, data }));
    }
  }, [data, id, dispatch]);

  useEffect(() => {
    if ((error as ErrorObject)?.data?.message === INVALID_TOKEN) {
      navigate(LINKS.welcome);
      dispatch(logout());
    }
  }, [dispatch, navigate, error]);

  const handleButtonClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    onClick(target.id, id);
  };

  if (isError) {
    toast.error((error as IError)?.data?.message || t('somethingWrong'));
  }

  return (
    <Draggable draggableId={id} index={order}>
      {(provided) => (
        <StyledBoardItem
          id={`${order}`}
          elevation={5}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <ColumnHeader order={order} name={name} columnId={id} />
          <Divider sx={dividerStyles} />
          <Droppable droppableId={id} type="task">
            {(provided) => (
              <List {...provided.droppableProps} ref={provided.innerRef} sx={taskListStyle}>
                {!tasks[id] || isLoading ? (
                  <Spinner />
                ) : (
                  tasks[id].map((task: ITaskConfig, idx) => (
                    <TaskDnd
                      key={task._id}
                      id={task._id || ''}
                      boardId={task.boardId}
                      columnId={id}
                      title={task.title}
                      order={idx}
                      description={task.description}
                      assignees={task.users}
                    />
                  ))
                )}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
          <Button
            id="add-task"
            onClick={handleButtonClick}
            sx={addButtonStyles}
            variant="text"
            startIcon={<AddIcon />}
          >
            {t('addTask')}
          </Button>
        </StyledBoardItem>
      )}
    </Draggable>
  );
};

export default Column;
