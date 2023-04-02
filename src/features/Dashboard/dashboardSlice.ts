import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store';
import { cloneDeep } from 'lodash';

interface Shape {
  vertices: number[][],
  midpoints: number[][],
  contour: number[][],
}

interface ImgData {
  src: string,
  dim: number[],
  off: number[],
}
interface DashboardState {
  state: string,
  loading: boolean,
  shape: Shape,
  paths: number[][][],
  ugvPaths: {[id: number]: number[][]},
  ugvPlacedBooms: {[id: number]: number[][]},
  img: ImgData,
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
  ugvPlacedBooms: [],
  img: {
    src: '',
    dim:[0,0],
    off:[0,0],
  }
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
    updateImg: (state, action:PayloadAction<ImgData>) => {
      state.img = action.payload;
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
      let placedBooms = cloneDeep(state.ugvPlacedBooms);
      if(placedBooms[action.payload] != undefined) {
        placedBooms[action.payload] = [];
      } else {
        placedBooms = {
          ...placedBooms,
          [action.payload]: [],
        };
      }
      state.ugvPlacedBooms = placedBooms;
    },
    updateUGVPath: (state, action:PayloadAction<{id: number, path: number[]}>) => {
      const paths = cloneDeep(state.ugvPaths);
      paths[action.payload.id].push(action.payload.path);
      state.ugvPaths = paths;
    },
    updateUgvPlaceBoom: (state, action:PayloadAction<{pathIndex: number, ugvId: number}>) => {
      const point = cloneDeep(state.paths[action.payload.pathIndex][state.paths[action.payload.pathIndex].length-1])
      const placedBooms = cloneDeep(state.ugvPlacedBooms);
      placedBooms[action.payload.ugvId].push(point);
      state.ugvPlacedBooms = placedBooms;
    },
    ugvDonePath: (state, action:PayloadAction<{pathIndex: number, ugvId: number}>) => {
      const ugvPaths = cloneDeep(state.ugvPaths);
      ugvPaths[action.payload.ugvId] = [ugvPaths[action.payload.ugvId].pop()??[0,0]];
      state.ugvPaths = ugvPaths;

      const paths = cloneDeep(state.paths);
      paths[action.payload.pathIndex] = [];
      state.paths = paths;
    },
    removeUgv: (state, action: PayloadAction<number>) => {
      const ugvPaths = cloneDeep(state.ugvPaths);
      ugvPaths[action.payload] = [];
      state.ugvPaths = ugvPaths;
    },
  },
})

export const { 
  updateState,
  updateLoading,
  updateShape,
  updateImg,
  setPaths,
  setNewUGV,
  updateUGVPath,
  updateUgvPlaceBoom,
  ugvDonePath,
  removeUgv
} = dashboardSlice.actions


export default dashboardSlice.reducer
