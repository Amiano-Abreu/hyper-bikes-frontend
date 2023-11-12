import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCart = createAsyncThunk('cart/fetchCart', async ( _, { rejectWithValue }) => {
    const response = await axios.get('http://localhost:5000/api/csrf', {withCredentials: true});
    const csrfToken = response.data.csrfToken;

    try {
      const response = await axios.post('http://localhost:5000/api/getcart', {
                                        _csrf: csrfToken
                        },
                        {
                            headers: {
                                'Accept': "application/json",
                                'Content-Type': "application/json"
                            },
                            withCredentials: true,
                            mode: 'cors'
                        });
      const data = await response.data;
      return data?.data;
    } catch (error) {
      console.log(error)
      return rejectWithValue(error);
    }
})

const initialState = {
  loading: false,
  success: false,
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
          state = {
            ...initialState
          };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.pending, (state) => {
            state.loading = true;
            state.success = false;
        })
        builder.addCase(fetchCart.fulfilled, (state, action) => {
          state.cart = action.payload;
          state.error = ''
          state.success = true;
          state.loading = false;
        })
        builder.addCase(fetchCart.rejected, (state, action) => {
          state.error = action.error.message;
          state.loading = false;
          state.success = true;
        })
    }
});

export default cartSlice.reducer;

export const { addToCart, incrementQuantity, decrementQuantity, removeItem, resetCart } = cartSlice.actions;