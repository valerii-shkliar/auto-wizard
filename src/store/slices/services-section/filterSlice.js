import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
};

const filterSlice = createSlice({
  name: 'servicesFilter',
  initialState,
  reducers: {
    setFilterByTitle: (state, { payload }) => {
      state.title = payload;
    },
    resetFilter: (state) => {
      state.title = '';
    },
  },
});

export const { setFilterByTitle, resetFilter } = filterSlice.actions;

export default filterSlice.reducer;

export const selectFilterTitle = (state) => {
  return state.servicesFilter.title;
};
