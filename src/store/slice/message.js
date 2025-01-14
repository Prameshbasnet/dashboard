import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return action.payload.data ;
    },
    clearMessage: () => {
      return '';
    }
  }
});

export const getMessage = (state) => state.message;

const { reducer, actions } = messageSlice;
export const { setMessage, clearMessage } = actions;
export default reducer;
