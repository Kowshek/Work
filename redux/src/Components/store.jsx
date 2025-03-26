import { createStore } from 'redux';
import itemReducer from './reducer';

//The single source of truth for the application state.
//It holds all the state and can only be updated by dispatching actions.

const store = createStore(itemReducer);

export default store;