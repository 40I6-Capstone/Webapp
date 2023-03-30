import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import {cloneDeep} from 'lodash';

interface pos {
  x: number;
  y: number;
}

export interface UGVState {
  x: number;
  y: number;
  velocity: number;
  heading: number;
  ts_ms: number;
  velocity_exp: number;
  heading_exp: number;
}

export interface DiagState {
  ts_ms: number;
  v_right: number;
  d_right: number;
  v_left: number;
  d_left: number;
  v_avg: number;
  d_avg: number;
}
export interface UGVData {
  id: number|null;
  prevStates: UGVState[];
  diagPrevStates: DiagState[];
  numOfStates: number;
  numOfDiagStates: number;
  path: number[][];

};

const initialState: UGVData = {
  id: null,
  prevStates: [],
  diagPrevStates: [],
  numOfStates: 15,
  numOfDiagStates: 15,
  path: [],
  
};


export const singleUGVSlice = createSlice({
  name: 'singleUGV',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    appendToPrevStates: (state, action: PayloadAction<UGVState>) => {
      let prevStates = cloneDeep(state.prevStates);
      prevStates.push(action.payload);

      if(prevStates.length > state.numOfStates ){
        prevStates = prevStates.slice(prevStates.length-state.numOfStates);
      }

      state.prevStates = prevStates;
    },
    updatePath:(state, action: PayloadAction<number[][]>) => {
      state.path = action.payload;
    },
    switchUGV: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    }, 
    setNumOfState: (state, action: PayloadAction<number>) => {
      if(state.numOfStates > action.payload ){
        let prevStates = cloneDeep(state.prevStates);
        prevStates = prevStates.slice(prevStates.length-action.payload);
        state.prevStates = prevStates;
      }
      state.numOfStates = action.payload;
    },
    clearDataState: (state) => {
      state.prevStates = [];
    },
    appendToDiagPrevStates: (state, action: PayloadAction<DiagState>) => {
      let prevStates = cloneDeep(state.diagPrevStates); 
      prevStates.push(action.payload);

      if(prevStates.length > state.numOfDiagStates ){
        prevStates = prevStates.slice(prevStates.length-state.numOfDiagStates);
      }

      state.diagPrevStates = prevStates;
    },
    setNumOfDiagState: (state, action: PayloadAction<number>) => {
      if(state.numOfDiagStates > action.payload ){
        let prevStates = cloneDeep(state.diagPrevStates);
        prevStates = prevStates.slice(prevStates.length-action.payload);
        state.diagPrevStates = prevStates;
      }
      state.numOfStates = action.payload;
    },
    clearDiagState: (state) => {
      state.diagPrevStates = [];
    },
  },
});

export const { 
  appendToPrevStates,
  switchUGV,
  updatePath,
  setNumOfState,
  clearDataState,
  appendToDiagPrevStates,
  setNumOfDiagState,
  clearDiagState
} = singleUGVSlice.actions;


export default singleUGVSlice.reducer;
