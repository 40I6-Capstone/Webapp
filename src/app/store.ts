import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appReducer from '../AppSlice'
import singleUGVReducer from '../features/SingleUGV/singleUGVSlice';
export const store = configureStore({
  reducer: {
    app: appReducer,
    singleUGV: singleUGVReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
