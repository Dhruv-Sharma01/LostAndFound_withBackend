import { configureStore } from "@reduxjs/toolkit";
import lostfoundReducer from '../features/lostfoundSlice'
export const store=configureStore({
    reducer:lostfoundReducer
});
