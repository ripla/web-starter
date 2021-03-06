import {
    createStore,
    applyMiddleware,
    combineReducers,
    Reducer,
    StoreEnhancer
  } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import { Debouncer } from '@polymer/polymer/lib/utils/debounce'; 
import { microTask } from '@polymer/polymer/lib/utils/async';

import app, { AppState } from './reducers/app';
import { AppAction } from './actions/app';

/**
 * Container for all the states in the app
 */
export interface RootState {
    app?: AppState;
}

/**
 * Union type for all the actions in the app
 */
export type RootAction = AppAction;

// try to load persisted state from local storage
const STATE_ID = 'web.starter.state';
const localStorageItem: string | null = localStorage.getItem(STATE_ID);
const persistedState =  localStorageItem ? JSON.parse(localStorageItem) : {}

// Sets up a browser extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
// Type for the store is tricky here because of lazy reducers AND thunk
const composeEnhancers: <Ext0, Ext1, StateExt0, StateExt1>(
    f1: StoreEnhancer<Ext0, StateExt0>, f2: StoreEnhancer<Ext1, StateExt1>
  ) => StoreEnhancer<Ext0 & Ext1, StateExt0 & StateExt1> = composeWithDevTools({
    name: 'Web Starter',
    trace: true,
});

// Initializes the Redux store with a lazyReducerEnhancer (so that you can
// lazily add reducers after the store has been created) and redux-thunk (so
// that you can dispatch async actions).
// https://github.com/reduxjs/redux-thunk
// https://github.com/Polymer/pwa-helpers
export const store = createStore(
    state => state as Reducer<RootState, RootAction>,
    persistedState,
    composeEnhancers(
        lazyReducerEnhancer(combineReducers),
        applyMiddleware(thunk as ThunkMiddleware<RootState, RootAction>))
);

// Initially loaded reducers.
store.addReducers({
    app
});

// Write whole state to localstorage on change. Debounce for common sense.
let debounceJob: Debouncer | null = null;
store.subscribe(() => {
    debounceJob = Debouncer.debounce(debounceJob, microTask, () => {
        localStorage.setItem(STATE_ID, JSON.stringify(store.getState()))
    });
})
