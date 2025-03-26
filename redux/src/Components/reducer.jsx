import { ADD_ITEM, REMOVE_ITEM, REMOVE_ALL_ITEMS } from "./actions";
//Pure functions that take current state and an action as arguments and return new state.
//They specify how the application's state changes in response to actions.

const initialState = {
  items: [],
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, items: [...state.items, action.payload] };
    case REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item !== action.payload),
      };
    case REMOVE_ALL_ITEMS:
      return { ...state, items: [] };
    default:
      return state;
  }
};

export default itemReducer;
