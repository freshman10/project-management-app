import React from 'react';
import { Grid } from '@mui/material';
import { ITaskProps } from '../../types/types';
import { Draggable } from 'react-beautiful-dnd';
import Task from '../Task/Task';

const TaskDnd = (props: ITaskProps) => {
  return (
    <Draggable draggableId={props.id || ''} index={props.order}>
      {(provided) => (
        <Grid {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Task {...props} />
        </Grid>
      )}
    </Draggable>
  );
};

export default TaskDnd;
