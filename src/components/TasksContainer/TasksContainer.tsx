import { Box } from '@mui/material';
import React from 'react';
import { ITaskConfig } from 'types/types';
import Task from '../Task/Task';

interface TasksProps {
  tasks: ITaskConfig[];
}

export const TasksContainer = ({ tasks }: TasksProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: { xs: 'center', sm: 'start' },
        gap: '1rem',
        marginTop: '1rem',
      }}
    >
      {tasks.map((task) => (
        <Task id={task._id || ''} assignees={task.users} key={task._id} {...task} />
      ))}
    </Box>
  );
};
