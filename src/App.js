import './App.css';
import { Navbar, CreateProduct, ProductDetails, Cart, Home } from './components/index';

import { Routes, Route } from 'react-router-dom';

import React, { Component } from 'react'

import { fetchProducts } from './action/index';


import { StoreContext } from './';

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";




class App extends Component {

  componentDidMount() {
    const { store } = this.props;

    store.dispatch(fetchProducts());

    store.subscribe(() => {
      this.forceUpdate();
    })

  }

  render() {

    return (

      <div className="App">
        <Navbar />

        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/Cart' element={<Cart />} />
          <Route exact path='/ProductDetails/:productId' element={<ProductDetails />} />
          <Route exact path='/CreateProduct' element={<CreateProduct />} />
        </Routes>
        <ToastContainer />
      </div>
    );
  }
}


class AppWrapper extends Component {
  render() {
    return (
      <StoreContext.Consumer>
        {
          (store) => <App store={store} />
        }
      </StoreContext.Consumer>
    )
  }
}

export default AppWrapper;

