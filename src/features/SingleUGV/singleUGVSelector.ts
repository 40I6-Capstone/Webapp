import { RootState } from "../../app/store";
import {map} from 'lodash';

export const selectUGVId = (state: RootState) => state.singleUGV.id;

export const selectNumOfStates = (state:RootState) => state.singleUGV.numOfStates;
export const selectNumOfDiagStates = (state:RootState) => state.singleUGV.numOfDiagStates;

export const selectUGVX = (state: RootState) => map(state.singleUGV.prevStates, 'x');
export const selectUGVY = (state: RootState) => map(state.singleUGV.prevStates, 'y');
export const selectUGVXExp = (state: RootState) => map(state.singleUGV.prevStates, 'x_exp');
export const selectUGVyExp = (state: RootState) => map(state.singleUGV.prevStates, 'y_exp');
export const selectUGVT = (state: RootState) => map(state.singleUGV.prevStates, 'ts_ms');
export const selectUGVV = (state: RootState) => map(state.singleUGV.prevStates, 'velocity');
export const selectUGVH = (state: RootState) => map(state.singleUGV.prevStates, 'heading');
export const selectUGVVExp = (state: RootState) => map(state.singleUGV.prevStates, 'velocity_exp');
export const selectUGVHExp = (state: RootState) => map(state.singleUGV.prevStates, 'heading_exp');