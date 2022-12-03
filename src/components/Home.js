import React, { Component } from 'react'
import Product from './Product';


//import redux actions

import { StoreContext } from '../index';



class Home extends Component {


    render() {
        const { products } = this.props.store.getState();
        // console.log("Products:", products);

        return (
            <div style={{ marginLeft: 100, marginRight: 100 }}>
                {/* <div>Home Page</div> */}

                {
                    products.list.map((prod, index) => {

                        return <Product key={`product-${index}`} product={prod}></Product>
                    })
                }

            </div>
        )
    }
}


class HomeWrapper extends Component {
    render() {
        return (
            <StoreContext.Consumer>
                {
                    (store) => <Home store={store} />
                }
            </StoreContext.Consumer>
        )
    }
}

export default HomeWrapper;