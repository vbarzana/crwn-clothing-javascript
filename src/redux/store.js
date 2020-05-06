import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';
// action -> middleware -> rootReducer -> store -> DOM Changes

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;