import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { ALL_TRANSLATIONS } from 'constants/constants';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface StatusProps {
  all: string[];
  selected: string[];
  onChange: (event: SelectChangeEvent<string[]>) => void;
}

export const StatusChip = ({ all, selected, onChange }: StatusProps) => {
  const { t } = useTranslation();
  return (
    <FormControl>
      <InputLabel htmlFor="chip">{t('Columns')}</InputLabel>
      <Select
        sx={{
          minWidth: { xs: '95vw', sm: '15vw' },
          maxWidth: { sm: '35vw', md: '25vw', lg: '15vw' },
        }}
        value={selected}
        labelId="demo-multiple-chip-label"
        id="chip"
        label={t('Columns')}
        className="Columns"
        disabled={!all.length}
        onChange={onChange}
        multiple
        input={
          <OutlinedInput
            id="select-multiple-chip"
            label={t('Columns')}
            sx={{ border: '0px solid white' }}
          />
        }
        renderValue={(selected: string[]) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.2rem' }}>
            {selected.map((value) =>
              ALL_TRANSLATIONS.includes(value) ? (
                <Chip key={t('all')} label={t('all')} />
              ) : value ? (
                <Chip key={value} label={value} />
              ) : null
            )}
          </Box>
        )}
      >
        {all.map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
