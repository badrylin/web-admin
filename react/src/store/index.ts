import { createStore, combineReducers, compose } from 'redux';
import { appReducer } from './app/reducer';
import { AppState } from './app/types';
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface AllState {
  app: AppState;
}

export const store = createStore(
  combineReducers<AllState>({
    app: appReducer,
  }),
  composeEnhancers(),
);
