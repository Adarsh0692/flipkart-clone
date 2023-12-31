import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products:'',
        cart: [],
        orders: []
    },
    reducers: {
        ALLProducts: (state, action) => {
          state.products=action.payload
        },
        addToCart: (state, action) => {
            const {id} = action.payload
            const existProduct = state.cart.find((product) => product.id === id)
            if(existProduct){
                existProduct.productQuantity += 1
            }else{
                state.cart.push(action.payload)
            }
        },
        setOder: (state, action) => {
            state.orders.push(action.payload)
        }
    }
})
export const {ALLProducts, addToCart, setOder} = productSlice.actions

export default productSlice.reducer