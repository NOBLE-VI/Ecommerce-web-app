export const ADD_PRODUCTS = "ADD_PRODUCTS";
export const ADD_PRODUCTS_TO_LIST = "ADD_PRODUCTS_TO_LIST";
export const TOGGLE_FETCH = "TOGGLE_FETCH";
export const SELECT_CURRENT_PRODUCT = "SELECT_CURRENT_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export function fetchProducts() {
    return function (dispatch) {

        fetch("https://my-json-server.typicode.com/NOBLE-VI/Ecom-database/products")
            .then((response) => response.json())
            .then(data => {

                dispatch(addProducts(data))
            }
            );
    }
}

export function addProducts(products) {



    return {
        type: ADD_PRODUCTS,
        products: products
    }
}

export function deleteProduct(product) {
    return {
        type: DELETE_PRODUCT,
        product: product
    }
}


export function addProductsToList(product) {

    return {
        type: ADD_PRODUCTS_TO_LIST,
        product: product
    }
}


export function toggleFetch(value) {
    return {
        type: TOGGLE_FETCH,
        value
    }
}



export function selectCurrentProduct(value) {
    return {
        type: SELECT_CURRENT_PRODUCT,
        value
    }
}

