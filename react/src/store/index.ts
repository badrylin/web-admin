import { createStore, combineReducers, compose, applyMiddleware, Dispatch } from 'redux';
import { appReducer } from './app/reducer';
import { AppState } from './app/types';
import { userReducer } from './user/reduces';
import { UserState } from './user/type';
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface AllState {
  app: AppState;
  user: UserState;
}

export const store = createStore(
  combineReducers<AllState>({
    app: appReducer,
    user: userReducer,
  }),
  composeEnhancers(),
);
