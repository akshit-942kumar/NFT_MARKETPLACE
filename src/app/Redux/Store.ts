// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import smartContractReducer from "./CreateSlice";

export const store = configureStore({
  reducer: {
    smartContract: smartContractReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
