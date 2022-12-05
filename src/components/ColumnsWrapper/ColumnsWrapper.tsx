import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Column from '../Column/Column';
import AddColumnButton from '../AddColumnButton/AddColumnButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetColumnsQuery } from '../../api/column.api';
import { ErrorObject, IColumn } from '../../types/types';
import { Spinner } from '../Spinner/Spinner';
import ColumnAddModal from '../ColumnAddModal/ColumnAddModal';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addBoards, addUsers } from '../../features/columnSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useOnDragEnd } from '../../hooks/useOnDragEnd';
import { useGetUsersQuery } from '../../api/user.api';
import { INVALID_TOKEN, LINKS } from 'constants/constants';
import { logout } from 'features/authSlice';
import { Theme } from '@mui/system';
import { useUserSystemTheme } from '../../hooks/useUserSystemTheme';

const createStyles = (theme: Theme) => ({
  boxStyles: {
    display: 'flex',
    flexWrap: 'nowrap',
    gap: '1rem',
    overflow: 'auto',
    padding: '1rem',
    height: 'calc(100vh - 207px)',
    '&::-webkit-scrollbar': {
      height: 10,
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
      borderRadius: 2,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#707090',
      borderRadius: 2,
    },
    [theme.breakpoints.down('sm')]: {
      p: '1rem 0',
    },
    [theme.breakpoints.between('xs', 725)]: {
      height: 'calc(100vh - 271px)',
    },
  },
});

const ColumnsWrapper = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetColumnsQuery(boardId as string);
  const { data: users } = useGetUsersQuery();
  const { columns } = useAppSelector((state) => state.boardState);
  const { userTheme } = useUserSystemTheme();

  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [buttonId, setButtonId] = useState('');
  const [columnId, setColumnId] = useState('');

  useEffect(() => {
    if (data) {
      dispatch(addBoards(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (users) {
      dispatch(addUsers(users));
    }
  }, [users, dispatch]);

  useEffect(() => {
    if ((error as ErrorObject)?.data?.message === INVALID_TOKEN) {
      navigate(LINKS.welcome);
      dispatch(logout());
    }
  }, [dispatch, navigate, error]);

  const handleClose = () => setOpen(false);
  const handleOpen = (buttonId: string, columnId?: string) => {
    setOpen(true);
    setButtonId(buttonId);
    setColumnId(columnId || '');
  };

  const onDragEnd = useOnDragEnd();
  const styles = createStyles(userTheme);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={styles.boxStyles}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Droppable droppableId="all-columns" direction="horizontal" type="column">
              {(provided) => (
                <Box
                  sx={{ display: 'flex', gap: '1rem' }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {columns?.map((column: IColumn, idx) => (
                    <Column
                      key={column._id}
                      boardId={boardId}
                      id={column._id || ''}
                      order={idx}
                      name={column.title}
                      onClick={handleOpen}
                    />
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
            <AddColumnButton onClick={handleOpen} />
            <ColumnAddModal
              boardId={boardId}
              columnId={columnId}
              pressedButtonId={buttonId}
              open={open}
              onClose={handleClose}
            />
          </>
        )}
      </Box>
    </DragDropContext>
  );
};

export default ColumnsWrapper;
