import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store';
import { cloneDeep } from 'lodash';

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
  ugvPaths: {[id: number]: number[][]},
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
  ugvPaths: [],
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
    setNewUGV: (state, action:PayloadAction<number>) => {
      let paths = cloneDeep(state.ugvPaths);
      if(paths[action.payload] != undefined) {
        paths[action.payload] = [];
      } else {
        paths = {
          ...paths,
          [action.payload]: [],
        };
      }
      state.ugvPaths = paths;
    },
    updateUGVPath: (state, action:PayloadAction<{id: number, path: number[]}>) => {
      const paths = cloneDeep(state.ugvPaths);
      paths[action.payload.id].push(action.payload.path);
    }
  },
})

export const { 
  updateState,
  updateLoading,
  updateShape,
  setPaths,
  setNewUGV,
  updateUGVPath
} = dashboardSlice.actions


export default dashboardSlice.reducer
