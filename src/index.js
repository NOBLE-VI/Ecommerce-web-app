import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
// import { Provider } from "react-redux";
import { applyMiddleware, createStore } from 'redux';
import thunk from "redux-thunk";

import rootReducer from './reducers';




// middleware to get which action is been called
const logger = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action !== "function") {
    // console.log("ACTION_TYPE:", action.type);
    // console.log("State:", getState());
  }
  next(action);
}


const store = createStore(rootReducer, applyMiddleware(logger, thunk));  //store created


export const StoreContext = createContext();


class Provider extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <StoreContext.Provider value={store}>
        {this.props.children}
      </StoreContext.Provider>
    )
  }
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>

);

