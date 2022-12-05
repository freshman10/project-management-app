import { SelectChangeEvent } from '@mui/material';
import { useGetAllColumnsByUserIDQuery } from 'api/column.api';
import { useGetAllTasksByUserIDQuery } from 'api/task.api';
import { ALL_STATUSES, INVALID_TOKEN, LINKS } from 'constants/constants';
import { logout } from 'features/authSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAuth } from 'hooks/useAuth';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorObject, ITaskConfig } from 'types/types';
import { SearchForm } from './SearchForm';
import { useGetUsersQuery } from '../../api/user.api';
import { addUsers } from '../columnSlice';

const SearchFormContainer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: statuses = [], isSuccess } = useGetAllColumnsByUserIDQuery(user?._id || '');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState({
    all: [] as string[],
    selected: [ALL_STATUSES],
    columns: statuses,
  });
  const {
    data: tasksData = [],
    isSuccess: getTasksSuccess,
    error,
  } = useGetAllTasksByUserIDQuery(user?._id || '');
  const { data: users } = useGetUsersQuery();
  const [tasks, setTasks] = useState(tasksData);

  const handleChangeSearchField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (isSuccess) {
      setStatus((state) => ({ ...state, all: statuses.map((el) => el.title), columns: statuses }));
    }
  }, [statuses, isSuccess, tasks]);

  useEffect(() => {
    if ((error as ErrorObject)?.data?.message === INVALID_TOKEN) {
      navigate(LINKS.welcome);
      dispatch(logout());
    }
  }, [dispatch, navigate, error]);

  useEffect(() => {
    if (users) {
      dispatch(addUsers(users));
    }
  }, [users, dispatch]);

  const filterTasks = useCallback(
    (tasks: ITaskConfig[]): ITaskConfig[] => {
      let filteredTasks = [...tasks];
      if (!status.selected.includes(ALL_STATUSES)) {
        const columnsId = status.columns
          .filter((column) => status.selected.includes(column.title))
          .map((column) => column._id);
        filteredTasks = filteredTasks.filter((task) => columnsId.includes(task.columnId));
      }
      return filteredTasks.filter(
        (task) => task.title.includes(search) || task.description.includes(search)
      );
    },
    [search, status.columns, status.selected]
  );

  useEffect(() => {
    if (getTasksSuccess) {
      setTasks(filterTasks(tasksData));
    }
  }, [tasksData, getTasksSuccess, filterTasks]);

  const handleChangeStatus = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    const values = typeof value === 'string' ? value.split(',') : value;
    setStatus((state) => ({
      ...state,
      selected: values.length ? values.filter((el) => el !== ALL_STATUSES) : [ALL_STATUSES],
    }));
  };

  return (
    <SearchForm
      {...{
        onChangeSearchField: handleChangeSearchField,
        search,
        status,
        onChangeStatus: handleChangeStatus,
        tasks,
      }}
    />
  );
};

export default SearchFormContainer;
