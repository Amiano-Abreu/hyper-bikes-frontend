import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASEURL = 'http://localhost:5000/api';

export const fetchCart = createAsyncThunk('cart/fetchCart', async ( _, { rejectWithValue }) => {
  
  try {
      const response = await axios.get(`${BASEURL}/cart`,
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
      // console.log(error)
      return rejectWithValue(error);
    }
})

export const httpAddToCart = createAsyncThunk('cart/httpAddToCart', async ( cartObj, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${BASEURL}/csrf`, {withCredentials: true});
    const csrfToken = res.data.csrfToken;
    
    const response = await axios.post(`${BASEURL}/addtocart`, {
                                      _csrf: csrfToken,
                                      alt: cartObj.hasOwnProperty("images") ? cartObj.images[0]['alt'] : cartObj.alt,
                                      bikeID: cartObj.bikeID,
                                      brand: cartObj.brand,
                                      model: cartObj.model,
                                      price: cartObj.price,
                                      src: cartObj.hasOwnProperty("images") ? cartObj.images[0]['src'] : cartObj.src
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
    // console.log(error)
    return rejectWithValue(error);
  }
})

export const httpRemoveFromCart = createAsyncThunk('cart/httpRemoveFromCart', async ( obj, { rejectWithValue }) => {
  try {
    const removeItem = obj.hasOwnProperty("removeItem") ? obj.removeItem : 'false'

    const res = await axios.get(`${BASEURL}/csrf`, {withCredentials: true});
    const csrfToken = res.data.csrfToken;
    
    const response = await axios.post(`${BASEURL}/removefromcart`, {
                                      _csrf: csrfToken,
                                      bikeID: obj.bikeID,
                                      removeItem
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
    // console.log(error)
    return rejectWithValue(error);
  }
})

export const httpRemoveAllCart = createAsyncThunk('cart/httpRemoveAllCart', async ( _, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${BASEURL}/csrf`, {withCredentials: true});
    const csrfToken = res.data.csrfToken;
    
    const response = await axios.post(`${BASEURL}/removeallcart`, {
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
    // console.log(error)
    return rejectWithValue(error);
  }
})

export const httpAddOrder = createAsyncThunk('cart/httpAddOrder', async ( order, { rejectWithValue }) => {
  try {
    const {
      products,
      total
    } = order;

    const res = await axios.get(`${BASEURL}/csrf`, {withCredentials: true});
    const csrfToken = res.data.csrfToken;
    
    await axios.post(`${BASEURL}/addorder`, {
                                      _csrf: csrfToken,
                                      products,
                                      total
                      },
                      {
                          headers: {
                              'Accept': "application/json",
                              'Content-Type': "application/json"
                          },
                          withCredentials: true,
                          mode: 'cors'
                      });

    const resp = await axios.post(`${BASEURL}/removeallcart`, {
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
    const removeCartData = await resp.data;

    return removeCartData?.data;
  } catch (error) {
    // console.log(error)
    return rejectWithValue(error);
  }
})

const initialState = {
  loading: false,
  success: false,
  cart: [],
  error: '',
  atc: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        resetCart: (state) => {
          return {
            ...initialState
          };
        },
        resetAtc: (state) => {
          return {
            ...state,
            atc: false
          }
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

        builder.addCase(httpAddToCart.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.atc = false;
        })
        builder.addCase(httpAddToCart.fulfilled, (state, action) => {
          state.cart = action.payload;
          state.atc = true;
          state.error = ''
          state.success = true;
          state.loading = false;
        })
        builder.addCase(httpAddToCart.rejected, (state, action) => {
          state.error = action.error.message;
          state.atc = true;
          state.loading = false;
          state.success = true;
        })

        builder.addCase(httpRemoveFromCart.pending, (state) => {
            state.loading = true;
            state.atc = false;
            state.success = false;
        })
        builder.addCase(httpRemoveFromCart.fulfilled, (state, action) => {
          state.cart = action.payload;
          state.error = ''
          state.success = true;
          state.atc = true;
          state.loading = false;
        })
        builder.addCase(httpRemoveFromCart.rejected, (state, action) => {
          state.error = action.error.message;
          state.loading = false;
          state.atc = true;
          state.success = true;
        })

        builder.addCase(httpRemoveAllCart.pending, (state) => {
            state.loading = true;
            state.atc = false;
            state.success = false;
        })
        builder.addCase(httpRemoveAllCart.fulfilled, (state, action) => {
          state.cart = action.payload;
          state.error = ''
          state.success = true;
          state.atc = true;
          state.loading = false;
        })
        builder.addCase(httpRemoveAllCart.rejected, (state, action) => {
          state.error = action.error.message;
          state.loading = false;
          state.atc = true;
          state.success = true;
        })

        builder.addCase(httpAddOrder.pending, (state) => {
          state.loading = true;
          state.success = false;
        })
        builder.addCase(httpAddOrder.fulfilled, (state, action) => {
          state.cart = [];
          state.error = ''
          state.success = true;
          state.loading = false;
        })
        builder.addCase(httpAddOrder.rejected, (state, action) => {
          state.error = action.error.message;
          state.loading = false;
          state.success = true;
        })
    }
});

export default cartSlice.reducer;

export const { resetCart, resetAtc } = cartSlice.actions;