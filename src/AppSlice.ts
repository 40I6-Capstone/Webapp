import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './app/store';
import {cloneDeep} from 'lodash';
import { appendToPrevStates } from './features/SingleUGV/singleUGVSlice';

export interface pos {
    x: number;
    y: number;
}
interface ugvData {
    id: number,
    name: string
}

interface appState {
  ugvs: ugvData[];
};

export 

const initialState: appState = {
  ugvs: [],
};


export const appSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    appendToUGVs: (state, action: PayloadAction<ugvData>) => {
      const ugvs = cloneDeep(state.ugvs);
      
      ugvs.push(action.payload);

      state.ugvs = ugvs;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
});

export const { 
  appendToUGVs,
} = appSlice.actions;

export const handleMessage =
  (msgStr: string): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const msg = JSON.parse(msgStr);
    switch(msg.type) {
        case 'ugvAdded':
            dispatch(appendToUGVs(msg.data)); 
            break;
        case 'ugvData':
            if(msg.data.id == state.singleUGV.id){
              dispatch(appendToPrevStates(msg.data.data));
            }
    }  
  };

export default appSlice.reducer;
