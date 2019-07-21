import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootState } from '../store';

export const OPEN_APP = 'OPEN_APP';

export interface AppActionOpenApp extends Action<'OPEN_APP'> {};

export type AppAction = AppActionOpenApp

type ThunkResult = ThunkAction<void, RootState, undefined, AppAction>;

export const openApp: ActionCreator<ThunkResult> = () => (dispatch: Dispatch) => {
    dispatch({
      type: OPEN_APP,
    });
};
