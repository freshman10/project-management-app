import { BoardFormOptions, MainState } from '../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: MainState = {
  isModalOpen: false,
  boardID: '',
  modalOption: BoardFormOptions.create,
  isConfirmationOpen: false,
  assignees: [],
};

export const mainSlice = createSlice({
  initialState,
  name: 'mainSlice',
  reducers: {
    toggleModalWindow: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    toggleConfirmationWindow: (state, action: PayloadAction<boolean>) => {
      state.isConfirmationOpen = action.payload;
    },
    setModalOption: (state, action: PayloadAction<BoardFormOptions>) => {
      state.modalOption = action.payload;
    },
    setBoardID: (state, action: PayloadAction<string>) => {
      state.boardID = action.payload;
    },
    setAssignees: (state, action: PayloadAction<string[]>) => {
      state.assignees = action.payload;
    },
  },
});

export default mainSlice.reducer;
export const {
  toggleModalWindow,
  setModalOption,
  setBoardID,
  toggleConfirmationWindow,
  setAssignees,
} = mainSlice.actions;
