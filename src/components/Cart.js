import React, { useState, useEffect } from 'react'
import { firestore } from '../firebase'
import Total from './Total';

import { toast } from 'react-toastify';


export default function Cart() {


    const [cartProducts, setProducts] = useState([]);


    useEffect(() => {

        firestore.collection("cart").onSnapshot((snapshot) => {
            const products = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                }
            })
            // console.log("Posts:", postss);
            setProducts(products);
        });
    }, []);

    function handleDeleteProduct(docId) {


        let products = cartProducts.filter((prod) => prod.id !== docId);

        setProducts(products);

        firestore.collection("cart").doc(docId).delete();
        toast.warn("Item deleted !", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,

        });
        // alert("Item deleted");
    }

    // function handleUpdateQuantity(docId) {

    //     firestore.collection("cart").doc(docId).update({
    //         qty: currentQty
    //     })

    // }

    const increaseQty = async (product) => {

        const prodId = cartProducts.indexOf(product);

        const docRef = firestore.collection("cart").doc(cartProducts[prodId].id);

        try {

            await docRef.update({
                qty: cartProducts[prodId].qty + 1,
            })

        } catch (error) {
            console.log("Error:", error);
        }


    }

    const decreaseQty = async (product) => {

        const prodId = cartProducts.indexOf(product);

        const docRef = firestore.collection("cart").doc(cartProducts[prodId].id);

        try {
            await docRef.update({

                qty: cartProducts[prodId].qty - 1,
            })

            if (cartProducts[prodId].qty === 1) {
                handleDeleteProduct(docRef.id);
            }

        } catch (error) {
            console.log("Error", error);
        }



    }

    const totalPrice = () => {

        let total = 0;
        cartProducts.forEach((product) => {
            total += product.qty * product.price;
        })

        return total;
    }

    return (
        <>

            {/* <div>Cart Page</div> */}

            <div className='container'>
                <Total totalPrice={totalPrice()} />

                {
                    cartProducts.map((product, index) => {

                        return <div key={`product-${index}`} className="card m-4 shadow d-inline-block " style={{ width: "16rem", height: 400, padding: 10 }}>
                            <img src={product.img} className="card-img-top card-img-top h-50 d-inline-block " alt="..." />
                            <div className="card-body d-inline-block">
                                <p className="card-text fs-5 fw-bloder"> {product.title}</p>
                                <p className="card-text">Rs : {product.price}</p>
                                <p className="card-text" style={{ fontSize: 15 }}>qty : {product.qty}</p>
                                <img src="https://cdn-icons-png.flaticon.com/512/3303/3303893.png" onClick={() => increaseQty(product)} style={{ cursor: "pointer", width: 30, height: 30, marginLeft: 10 }} alt="add_icon"></img>
                                <img src="https://cdn-icons-png.flaticon.com/512/1828/1828906.png" onClick={() => decreaseQty(product)} style={{ cursor: "pointer", width: 30, height: 30, marginLeft: 10 }} alt="sub_icon"></img>
                            </div>
                            <button className='btn btn-danger border-dark ' onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                        </div>

                    })

                }

            </div>
        </>
    )
}
