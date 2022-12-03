import React, { Component } from 'react'
import { firestore } from '../firebase'
import { useState } from 'react';
import { Link } from "react-router-dom"
import { StoreContext } from '..';

import { deleteProduct, selectCurrentProduct } from "../action";
import { toast } from "react-toastify";

function useFormData(initialValue) { //custom hook

    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
        setValue(e.target.value);
    }

    return {
        value: value,
        onChange: handleChange
    }

}

function Product(props) {
    const { product } = props;
    const [data, setData] = useState(product);
    const [isEditable, setIsEditable] = useState(false);

    const title = useFormData(data.title);
    const price = useFormData(data.price);
    const qty = useFormData(data.qty);


    function handleAddProduct() {

        firestore.collection("cart").add({
            img: product.img,
            qty: product.qty,
            title: product.title,
            price: product.price
        })

        toast.success("Product added to cart.", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000
        });
    };

    function handleEdit() {

        setIsEditable(true);

    }

    function handleDone() {

        setIsEditable(false);

        toast.success("Product Updated", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000
        });

    }


    function setSelectedProduct() {

        const { dispatch } = props.store;

        dispatch(selectCurrentProduct(product));

        console.log("STATE:", props.store.getState());

    }

    function handleDelteProduct() {
        const { dispatch } = props.store;
        const { product } = props;

        dispatch(deleteProduct(product));

        toast.error("Product deleted !", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 800
        });

    }



    return (
        <>
            <div className="card m-4 shadow d-inline-block" style={{ width: "18rem", height: "auto", padding: "0px 10px 10px 10px" }}>
                <button className='bg-danger rounded-2 border-dark d-inline-block' onClick={handleDelteProduct} style={{ margin: 5, width: 70, padding: "0px 0px 0px 0px" }}>Delete</button>
                <img src={product.img} className="card-img-top " alt="..." style={{ height: 250 }} />
                <div className="card-body">
                    {isEditable ? <input type="text" {...title} ></input> : <Link className="text-dark" to={`/ProductDetails/:${product.title}`}><p onClick={setSelectedProduct} className="card-text fs-3"> {title.value}</p></Link>}
                    {isEditable ? <input type="text" {...price} ></input> : <p className="card-text">price : {price.value}</p>}
                    {isEditable ? <input type="text" {...qty} ></input> : <p className="card-text">qty : {qty.value}</p>}
                </div>
                <button className='btn btn-warning border-dark d-inline-block p-1' onClick={handleAddProduct} style={{ margin: 10, width: 120 }}>Add to cart</button>
                {isEditable ? <button className='btn btn-success border-dark p-1' onClick={handleDone} style={{ margin: 10, width: 100 }}>Done</button> : <button className='btn btn-success border-dark p-x-2' onClick={handleEdit} style={{ margin: 10 }}>Edit Details</button>}
            </div>
        </>
    )
}

class ProductWrapper extends Component {

    render() {
        return (
            <StoreContext.Consumer >

                {
                    (store) => <Product store={store} product={this.props.product} />

                }

            </StoreContext.Consumer>
        )
    }


}

export default ProductWrapper;