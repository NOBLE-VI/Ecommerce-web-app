import { combineReducers } from "redux";

import {
    ADD_PRODUCTS,
    ADD_PRODUCTS_TO_LIST,
    TOGGLE_FETCH,
    SELECT_CURRENT_PRODUCT,
    DELETE_PRODUCT
} from "../action/index";

const initialProductsState = {
    list: [],
    fetchProduct: true
}

export function products(state = initialProductsState, action) {

    switch (action.type) {

        case ADD_PRODUCTS:
            return {
                ...state,
                list: action.products,
            }

        case ADD_PRODUCTS_TO_LIST:
            return {
                ...state,
                list: [action.product, ...state.list]

            }

        case TOGGLE_FETCH:
            return {
                ...state,
                fetchProduct: action.value
            }

        case DELETE_PRODUCT:
            const filteredList = state.list.filter((product) => product.title !== action.product.title);
            return {
                ...state,
                list: filteredList,
            }

        default: return state;

    }

}

const initialCurrentProduct = {
    currentProduct: {},
}
export function setCurrentProduct(state = initialCurrentProduct, action) {

    switch (action.type) {

        case SELECT_CURRENT_PRODUCT:
            return {
                ...state,
                currentProduct: action.value,
            }

        default: return state;

    }

}


const rootReducer = combineReducers({

    products: products,
    setCurrentProduct: setCurrentProduct

})

export default rootReducer;