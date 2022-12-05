import { DropResult } from 'react-beautiful-dnd';
import { useAppSelector } from './useAppSelector';
import { addBoards, addTasks } from '../features/columnSlice';
import { transformTasksByOrder } from '../utils/transformTasksByOrder';
import { useAppDispatch } from './useAppDispatch';
import { useTasksSetMutation } from '../api/task.api';
import { transformTasksToPatch } from '../utils/transformTasksToPatch';
import { transformColumnsByOrder } from '../utils/transformColumnsByOrder';
import { useColumnsSetMutation } from '../api/column.api';
import { transformColumnToPatch } from '../utils/transformColumnToPatch';

export const useOnDragEnd = () => {
  const { columns, tasks } = useAppSelector((state) => state.boardState);
  const [tasksSet] = useTasksSetMutation();
  const [columnsSet] = useColumnsSetMutation();
  const dispatch = useAppDispatch();

  const onDragInColumn = (indexFrom: number, indexTo: number, droppableId: string) => {
    const newTaskOrder = [...tasks[droppableId]];
    const removedTask = newTaskOrder.splice(indexFrom, 1);
    newTaskOrder.splice(indexTo, 0, ...removedTask);
    const transformedArray = transformTasksByOrder(newTaskOrder);
    dispatch(addTasks({ id: droppableId, data: transformedArray }));
    tasksSet(transformTasksToPatch(transformedArray));
  };

  const onDragBetweenColumns = (
    idFrom: string,
    idTo: string,
    indexFrom: number,
    indexTo: number
  ) => {
    const tasksFrom = [...tasks[idFrom]];
    const tasksTo = [...tasks[idTo]];
    const draggableTask = tasksFrom.splice(indexFrom, 1);
    tasksTo.splice(indexTo, 0, ...draggableTask);

    const transformedArrayFrom = transformTasksByOrder(tasksFrom);
    const transformedArrayTo = transformTasksByOrder(tasksTo);

    dispatch(addTasks({ id: idFrom, data: transformedArrayFrom }));
    dispatch(addTasks({ id: idTo, data: transformedArrayTo }));
    tasksSet([
      ...transformTasksToPatch(transformedArrayFrom),
      ...transformTasksToPatch(transformedArrayTo, idTo),
    ]);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === 'column') {
      const newColumnOrder = [...columns];
      const draggableColumn = newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, ...draggableColumn);
      const transformedArray = transformColumnsByOrder(newColumnOrder);

      dispatch(addBoards(transformedArray));
      columnsSet(transformColumnToPatch(transformedArray));
      return;
    }

    if (destination.droppableId === source.droppableId) {
      onDragInColumn(source.index, destination.index, destination.droppableId);
      return;
    }

    if (destination.droppableId !== source.droppableId) {
      onDragBetweenColumns(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index
      );
      return;
    }
  };

  return (result: DropResult) => onDragEnd(result);
};
