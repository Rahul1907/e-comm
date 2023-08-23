// this is cart slice we will be storing only productId and Its qty here
import { createSlice } from '@reduxjs/toolkit'
const cartSlice = createSlice({
    name: 'cart',
    initialState: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : {},
    reducers: {
        updateCart(state, action) {
            return action.payload;
        }
    },
});

export const { updateCart } = cartSlice.actions;
export default cartSlice.reducer;