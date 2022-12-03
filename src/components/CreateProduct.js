import React, { Component, useState } from 'react'
import { StoreContext } from '..';
import { addProductsToList } from "../action"
import { toast } from 'react-toastify';

function CreateProduct(props) {

    const [productData, setProductData] = useState({
        qty: "",
        title: "",
        price: "",
        img: ""
    });

    function handleSubmit(e) {

        e.preventDefault(); // so the page will not refresh

        const { dispatch } = props.store;

        dispatch(addProductsToList(productData));

        toast.success("New Product Created !", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1200
        });

    }

    return (
        <>
            {/* <div>Create Product page</div> */}
            <form onSubmit={handleSubmit}>

                <div className='container '>
                    <div className='p-5 m-5 border border-secondary rounded-5 bg-secondary bg-opacity-25 bg-gradient' >

                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Title</label>
                            <input type="text" name="title" className="form-control border-secondary " value={productData.title} onChange={e => setProductData({ ...productData, title: e.target.value })} id="exampleFormControlInput1" placeholder="name of product" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Quantity</label>
                            <input type="text" name="quantity" value={productData.qty} onChange={e => setProductData({ ...productData, qty: e.target.value })}
                                className="form-control border-secondary " id="exampleFormControlInput1" placeholder="Quanity here" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Price</label>
                            <input type="text" name="price" className="form-control border-secondary " id="exampleFormControlInput1" value={productData.price} onChange={e => setProductData({ ...productData, price: Number(e.target.value) })} placeholder="Price here" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Image</label>
                            <input type="text" name="image" className="form-control border-secondary " value={productData.img} onChange={e => setProductData({ ...productData, img: e.target.value })} id="exampleFormControlInput1" placeholder="url of product" />
                        </div>


                        <button type="submit" className="btn btn-secondary mx-auto border border-dark" style={{ width: 200 }} >Add </button>

                    </div>
                </div>
            </form>

        </>
    )
}


class CreateProductWrapper extends Component {
    render() {
        return (
            <StoreContext.Consumer>
                {(store) => <CreateProduct store={store} />}
            </StoreContext.Consumer>
        )
    }
}


export default CreateProductWrapper;