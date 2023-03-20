import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store';

interface Shape {
  vertices: number[][],
  midpoints: number[][],
  contour: number[][],
}
interface DashboardState {
  state: string,
  loading: boolean,
  shape: Shape,
  paths: number[][][],
}

const initialState:DashboardState = {
  state: 'idle',
  loading: false,
  shape: {
    vertices: [],
    midpoints: [],
    contour: [],
  },
  paths: [],
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    updateState: (state) => {
      switch (state.state) {
        case 'idle':
          state.state = 'scouted';
          break;
        case 'scouted':
          state.state = 'running';
          break;
        case 'running':
          state.state = 'pause';
          break;
        case 'pause':
          state.state = 'running';
      }
    },
    updateLoading: (state, action:PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateShape: (state, action:PayloadAction<Shape>) => {
      state.shape = action.payload;
    },
    setPaths: (state, action:PayloadAction<number[][][]>) => {
      state.paths = action.payload;
    },
  },
})

export const { 
  updateState,
  updateLoading,
  updateShape,
  setPaths,
} = dashboardSlice.actions


export default dashboardSlice.reducer
