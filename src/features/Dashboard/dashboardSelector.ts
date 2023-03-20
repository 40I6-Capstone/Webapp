import { RootState } from "../../app/store";
import { map } from 'lodash';

export const selectState = (state: RootState) => state.dashboard.state;
export const selectLoading = (state: RootState) => state.dashboard.loading;

export const selectShapeVertX = (state: RootState) => map(state.dashboard.shape.vertices, (a) => a[0]);
export const selectShapeVertY = (state: RootState) => map(state.dashboard.shape.vertices, (a) => a[1]);
export const selectShapeMidX = (state: RootState) => map(state.dashboard.shape.midpoints, (a) => a[0]);
export const selectShapeMidY = (state: RootState) => map(state.dashboard.shape.midpoints, (a) => a[1]);
export const selectContourX = (state: RootState) => map(state.dashboard.shape.contour, (a) => a[0]);
export const selectContourY = (state: RootState) => map(state.dashboard.shape.contour, (a) => a[1]);

export const selectPaths = (state: RootState) => state.dashboard.paths;
