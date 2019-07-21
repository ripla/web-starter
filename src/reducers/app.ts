import { OPEN_APP } from "../actions/app";
import { Reducer } from "redux";
import { RootAction } from "../store";

export interface AppState {
    viewCount: number;
}

const INITIAL_STATE: AppState = {
    viewCount: 0,
  };

const app: Reducer<AppState, RootAction> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OPEN_APP:
            return {
                ...state,
                viewCount: state.viewCount + 1,
            }

        default:
            return state;
    }
}

export default app;