import {applyMiddleware, createStore} from 'redux';
import Thunk from 'redux-thunk';
import appReducer from './appReducer';
const store=createStore(appReducer,applyMiddleware(Thunk));
export default store;