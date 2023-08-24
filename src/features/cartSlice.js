import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId) => {
    console.log(userId)
    try {
      const response = await axios.get('http://localhost:5000/cart');
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error)
      return error;
    }
})

const initialState = {
  loading: false,
  cart: [],
  error: ''
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
          const itemInCart = state.cart.find((item) => item.id === action.payload.id);
          if (itemInCart) {
            itemInCart.quantity++;
          } else {
            state.cart.push({ ...action.payload, quantity: 1 });
          }
        },
        incrementQuantity: (state, action) => {
          const item = state.cart.find((item) => item.id === action.payload);
          item.quantity++;
        },
        decrementQuantity: (state, action) => {
          const item = state.cart.find((item) => item.id === action.payload);
          if (item.quantity === 1) {
            const removeItem = state.cart.filter((i) => i.id !== action.payload);
            state.cart = removeItem;
          } else {
            item.quantity--;
          }
        },
        removeItem: (state, action) => {
          const removeItem = state.cart.filter((item) => item.id !== action.payload);
          state.cart = removeItem;
        },
        resetCart: (state) => {
          state = initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            state.error = ''
        })
        builder.addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
});

export default cartSlice.reducer;

export const { addToCart, incrementQuantity, decrementQuantity, removeItem } = cartSlice.actions;