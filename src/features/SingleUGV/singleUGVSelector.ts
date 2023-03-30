import { RootState } from "../../app/store";
import {map} from 'lodash';

export const selectUGVId = (state: RootState) => state.singleUGV.id;

export const selectNumOfStates = (state:RootState) => state.singleUGV.numOfStates;
export const selectNumOfDiagStates = (state:RootState) => state.singleUGV.numOfDiagStates;

export const selectUGVX = (state: RootState) => map(state.singleUGV.prevStates, 'x');
export const selectUGVY = (state: RootState) => map(state.singleUGV.prevStates, 'y');
export const selectPath = (state: RootState) => state.singleUGV.path;
export const selectPathX = (state: RootState) => map(state.singleUGV.path, (p)=>p[0]);
export const selectPathY = (state: RootState) => map(state.singleUGV.path, (p)=>p[1]);
export const selectUGVT = (state: RootState) => map(state.singleUGV.prevStates, 'ts_ms');
export const selectUGVV = (state: RootState) => map(state.singleUGV.prevStates, 'velocity');
export const selectUGVH = (state: RootState) => map(state.singleUGV.prevStates, 'heading');
export const selectUGVVExp = (state: RootState) => map(state.singleUGV.prevStates, 'velocity_exp');
export const selectUGVHExp = (state: RootState) => map(state.singleUGV.prevStates, 'heading_exp');

export const selectMotorRVel = (state: RootState) => map(state.singleUGV.diagPrevStates, 'v_right');
export const selectMotorLVel = (state: RootState) => map(state.singleUGV.diagPrevStates, 'v_left');
export const selectMotorAvgVel = (state: RootState) => map(state.singleUGV.diagPrevStates, 'v_avg');
export const selectMotorRDist = (state: RootState) => map(state.singleUGV.diagPrevStates, 'd_right');
export const selectMotorLDist = (state: RootState) => map(state.singleUGV.diagPrevStates, 'd_left');
export const selectMotorAvgDist = (state: RootState) => map(state.singleUGV.diagPrevStates, 'd_avg');
export const selectMotorT = (state: RootState) => map(state.singleUGV.diagPrevStates, 'ts_ms');