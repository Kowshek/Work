export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const REMOVE_ALL_ITEMS = "REMOVE_ALL_ITEMS";

//Plain Javascript objects that describe what happened in the application.
//They typically have a type property and can have additional data.

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const removeItem = (item) => ({
  type: REMOVE_ITEM,
  payload: item,
});

export const removeAllItems = (item) => ({
  type: "REMOVE_ALL_ITEMS",
  payload: item,
});