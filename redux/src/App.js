import React from "react";
import { Provider } from "react-redux";
import store from "./Components/store";
import Itemlist from "./Components/Itemlist";
import "./App.css";

const App = () => {
  return (

    <Provider store={store}> 
      <Itemlist /> 
    </Provider> 
    // Provider is a component that makes the redux store -
    //available to any nested componenets that need to access the store

  );
};

export default App;
