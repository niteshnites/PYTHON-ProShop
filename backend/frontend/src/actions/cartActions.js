import axios from 'axios';
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

// Action to add an item to the cart
export const addToCart = (id, quantity) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                quantity,
            },
        });

        // Log the current cart state
        const currentCartState = getState().cart;
        console.log('Current Cart State:', currentCartState);

        // Save cart items to localStorage
        localStorage.setItem('cartItems', JSON.stringify(currentCartState.cartItems));
    } catch (error) {
        console.error('Error adding item to cart:', error); // Logging the error for debugging
        // You can dispatch an error action here if needed
    }
}


export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}


export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data));
}


export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })
    localStorage.setItem('paymentMethod', JSON.stringify(data));
}