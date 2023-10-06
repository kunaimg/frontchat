import { createSlice } from "@reduxjs/toolkit";

const mySlice = createSlice({
  name: "myReducer",
  initialState: {
    chatdata: [],
  },
  reducers: {
    chatdata: (state, action) => {
      state.chatdata.push(action.payload);
    },
  },
});

export const { chatdata } = mySlice.actions;
export default mySlice.reducer;
