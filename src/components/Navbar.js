import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { firestore } from '../firebase';


export default class Navbar extends Component {

    constructor() {
        super();

        this.state = {
            products: []
        }
    }

    componentDidMount() {
        firestore.collection("cart").onSnapshot((snapshot) => {
            const prod = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                }
            })
            this.setState({
                products: prod
            })
        });
    }

    getProductCount = () => {
        let totalProducts = 0;
        this.state.products.forEach(element => {


            return totalProducts += element.qty;
        })

        return totalProducts;
    }

    render() {
        return (
            <>
                <nav className="navbar navbar-dark bg-dark">
                    <div className=" d-inline-block">
                        <Link className="navbar-brand ms-3" to="/">Ecom</Link>
                        <Link className="navbar-brand ms-4" to="/CreateProduct">Add Product</Link>
                        <Link className="navbar-brand ms-4" to="/Cart">Cart</Link>

                    </div>
                    <div className="d-inline-block" style={{ marginLeft: "auto" }}>
                        <Link to="/Cart"><img src="https://cdn-icons-png.flaticon.com/512/4647/4647563.png" alt="cart-icon" style={{ width: 30, height: 30 }}></img></Link>
                        <span style={{ borderRadius: 20, backgroundColor: "yellow", marginRight: 20, padding: "5px 10px 5px 10px" }} >{this.getProductCount()}</span>
                    </div>

                </nav>
            </>
        )
    }
}


