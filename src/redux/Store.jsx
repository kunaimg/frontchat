import { configureStore } from "@reduxjs/toolkit";
import myReducer from "../redux/CreateSlice";

const store = configureStore({
  reducer: {
    myReducer,
  },
});

export default store;
