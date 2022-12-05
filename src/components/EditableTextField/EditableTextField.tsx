import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import { UserFields } from 'types/types';

interface EditableTextFieldProps {
  defaultValue: string;
  isDisabled: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, tag: string) => void;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    tag: string
  ) => void;
  tag: 'name' | 'password' | 'login';
  name: string;
  register: UseFormRegister<UserFields>;
  errors: Partial<
    FieldErrorsImpl<{
      name: string;
      login: string;
      password: string;
    }>
  >;
}

export const EditableTextField = ({
  defaultValue,
  isDisabled,
  onClick,
  onInputChange,
  tag,
  register,
  errors,
  name,
}: EditableTextFieldProps) => {
  const createStyles = () => ({
    main: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
  });
  const styles = createStyles();

  return (
    <Box sx={styles.main} onClick={(e) => onClick(e, tag)}>
      <TextField
        {...register(tag)}
        label={name}
        name={name}
        type={tag}
        value={defaultValue}
        placeholder="******"
        disabled={isDisabled}
        onChange={(e) => onInputChange(e, tag)}
        error={!!errors[tag]}
        helperText={errors[tag]?.message}
        InputProps={{
          sx: {
            '.css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
              border: '0.5px solid black !important',
            },
            '&:hover': {
              '.css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                border: '0.5px solid black !important',
              },
            },
          },
        }}
      />
      <Button
        className="top-level"
        data-id={`${isDisabled ? 'edit' : 'done'}-${tag}`}
        sx={{ width: '2rem' }}
        startIcon={
          isDisabled ? (
            <EditIcon color="info" sx={{ marginLeft: '0.8rem' }} />
          ) : (
            <DoneOutlineIcon color="success" sx={{ marginLeft: '0.8rem' }} />
          )
        }
      />
    </Box>
  );
};
