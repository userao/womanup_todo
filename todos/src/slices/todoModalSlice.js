import { createSlice } from '@reduxjs/toolkit';

const todoModalSlice = createSlice({
  name: 'todoModal',
  initialState: {
    shownModalId: null,
  },
  reducers: {
    setModal: (state, { payload }) => {
      state.shownModalId = payload;
    },
  }
});

export const { actions } = todoModalSlice;
export default todoModalSlice.reducer;