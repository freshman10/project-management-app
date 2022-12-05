import {
  Box,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AssigneeProps } from 'types/types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export const Assignees = ({
  all,
  selected,
  handleChange,
  id,
  onClose,
  register,
  isDisabled = false,
}: AssigneeProps) => {
  const { t } = useTranslation();
  const [isFullHeight, setIsFullHeight] = useState(false);

  const handleClickShowMoreButton = () => {
    setIsFullHeight((state) => !state);
  };
  return (
    <FormControl
      fullWidth
      disabled={isDisabled}
      sx={{
        height: isFullHeight ? 'auto' : '5.55rem',
        transition: 'all 1s ease-in-out',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <InputLabel htmlFor="chip">{t('assignees')}</InputLabel>
      <Select
        {...(register ? register('assigners') : null)}
        value={selected}
        labelId="demo-multiple-chip-label"
        id="chip"
        className="assignees"
        onChange={(e) => (handleChange ? handleChange(e, id) : '')}
        onClose={(e) => (onClose ? onClose(e, id) : '')}
        multiple
        MenuProps={{ PaperProps: { sx: { maxHeight: '12rem' } } }}
        sx={{
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-start',
        }}
        input={
          <OutlinedInput
            id="select-multiple-chip"
            label={t('assignees')}
            sx={{ border: '0px solid white' }}
          />
        }
        renderValue={(selected: string[]) => (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              position: 'relative',
            }}
          >
            {selected.map((value) => (value ? <Chip key={value} label={value} /> : null))}
          </Box>
        )}
      >
        {all.map(({ login }) => (
          <MenuItem key={login} value={login}>
            {login}
          </MenuItem>
        ))}
      </Select>
      <IconButton
        sx={{ width: '2rem', height: '2rem', alignSelf: 'flex-end' }}
        onClick={handleClickShowMoreButton}
      >
        {!isFullHeight ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </IconButton>
    </FormControl>
  );
};
