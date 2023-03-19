import { RootState } from "../../app/store";

export const selectUGVId = (state: RootState) => state.singleUGV.id;
export const selectUGVPosAct = (state: RootState) => state.singleUGV.posAct;