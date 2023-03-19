import { RootState } from "./app/store";
import { map } from 'lodash';

export const selectUGVs = (state: RootState) => state.app.ugvs;
export const selectUGVsAsDrop = (state: RootState) => map(state.app.ugvs, (o) => ({value: o.id, label: o.name}));