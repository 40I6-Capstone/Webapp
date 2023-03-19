import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import {cloneDeep} from 'lodash';

interface pos {
  x: number;
  y: number;
}

interface data {
  time: number,
  posAct: pos,
  posExp: pos,
  v: number,
  head: number,
  motor?: {
    r: {
      v: number,
      dist: number, 
    },
    l : {
      v: number,
      dist: number,
    }
  }
};

export interface UGVState {
  id: number|null;
  posAct: pos[];
  posExp: pos[];

};

const initialState: UGVState = {
  id: null,
  posAct: [],
  posExp: [],
};


export const singleUGVSlice = createSlice({
  name: 'singleUGV',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    appendToData: (state, action: PayloadAction<data>) => {
      const posAct = cloneDeep(state.posAct);
      const posExp = cloneDeep(state.posExp);
      
      posAct.push(action.payload.posAct);
      posExp.push(action.payload.posExp);

      state.posAct = posAct;
      state.posExp = posExp;
    },
    switchUGV: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    }
  },
});

export const { 
  appendToData,
  switchUGV,
} = singleUGVSlice.actions;

export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {

  };

export default singleUGVSlice.reducer;
