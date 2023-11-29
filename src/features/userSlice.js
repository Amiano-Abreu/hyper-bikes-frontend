import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { fetchCart } from './cartSlice';

const initialState = {
    loading: false,
    success: false,
    error: '',
    isLoggedIn: false,
    uid: '',
    userName: '',
    email: '',
    state: '',
    country: ''
}

export const getUser = createAsyncThunk('user/getUser', async( _, { rejectWithValue }) => {

    try {

        const userResponse = await axios.get(`${process.env.REACT_APP_API_URL}/user`, {
            withCredentials: true,
            mode: 'cors'
        })
        const { data } = userResponse.data;

        return data;

    } catch (error) {
        // console.log(error.response?.data || error.message)
        return rejectWithValue(error.response?.data || error.message);
    }
})

export const loginHandler = createAsyncThunk('user/loginHandler', async( login , { rejectWithValue, dispatch }) => {

    try {
        const loginResponse = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
                                    email: login.email,
                                    password: login.password
                                }, {
                                    headers: {
                                        'Accept': "application/json",
                                        'Content-Type': "application/json",
                                    },
                                    withCredentials: true,
                                    mode: 'cors'
                                })
        const { user } = loginResponse.data;
        dispatch(fetchCart());
        return user;
    } catch (e) {
        const { data } = e.response;
        const { error, message } = data;
        const errorData = data?.data;
        const err = errorData || error || message || e.message;
                return rejectWithValue(err);
    }

})

export const signUpHandler = createAsyncThunk('user/signUpHandler', async( signUp , { rejectWithValue }) => {

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/csrf`, {withCredentials: true});
        const csrfToken = response.data.csrfToken;

        const signUpResponse = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
                                    _csrf: csrfToken,
                                    firstName: signUp.firstName,
                                    lastName: signUp.lastName,
                                    email: signUp.email,
                                    password: signUp.password,
                                    confirmPassword: signUp.confirmPassword,
                                    state: signUp.state,
                                    country: signUp.country
                                }, {
                                    headers: {
                                        'Accept': "application/json",
                                        'Content-Type': "application/json",
                                    },
                                    withCredentials: true,
                                    mode: 'cors'
                                })

        const { user } = signUpResponse.data;
        return user;
    } catch (e) {
        const { data } = e.response;
        const { error, message } = data;
        const errorData = data?.data;
        const err = errorData || error || message || e.message;
        return rejectWithValue(err);
    }

})

export const logoutHandler = createAsyncThunk('user/logoutHandler', async( _ , { rejectWithValue }) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/csrf`, {withCredentials: true});
    const csrfToken = response.data.csrfToken;

    try {
        const logoutResponse = await axios.post(`${process.env.REACT_APP_API_URL}/logout`, {
                                    _csrf: csrfToken
                                },
                                {
                                    headers: {
                                        'Accept': "application/json",
                                        'Content-Type': "application/json"
                                    },
                                    withCredentials: true,
                                    mode: 'cors'
                                })
        // console.log( logoutResponse)
        return logoutResponse;
    } catch (error) {
        // console.log(error)
        const { data } = error.response;
        const { message } = data;
        return rejectWithValue(message || error.message);
    }

})

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.uid = action.payload.uid;
            state.userName = action.payload.name;
            state.email = action.payload.email;
            state.state = action.payload.state;
            state.country = action.payload.country;
            state.isLoggedIn = true;
        },
        setLoading: (state) => {
            state.loading = true;
            state.success = false;
            state.error = "";
        },
        resetUser: (storeState) => {
            const { 
                uid,
                userName,
                email,
                state,
                country,
                isLoggedIn
            } = initialState;

            storeState.uid = uid;
            storeState.userName = userName;
            storeState.email = email;
            storeState.state = state;
            storeState.country = country;
            storeState.isLoggedIn = isLoggedIn;
        },
        resetError: (state) => {
            state.error = '';
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        // GET USER CASES
        builder.addCase(getUser.pending, (state) => {
            userSlice.caseReducers.setLoading(state)
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            userSlice.caseReducers.setUser(state, action)
            localStorage.setItem("isAuthenticated", true);
            state.loading = false;
            state.success = true;
        })
        builder.addCase(getUser.rejected, (state, action) => {
            localStorage.removeItem("isAuthenticated");
            state.success = true;
            state.loading = false;
        })

        // LOGIN CASES
        builder.addCase(loginHandler.pending, (state, action) => {
            localStorage.removeItem("isAuthenticated");
            userSlice.caseReducers.setLoading(state)
        })
        builder.addCase(loginHandler.fulfilled, (state, action) => {
            userSlice.caseReducers.setUser(state, action)
            localStorage.setItem("isAuthenticated", true);
            state.success = true;
            state.loading = false;
        })
        builder.addCase(loginHandler.rejected, (state, action) => {
            state.error = action.payload || "Please check your network !";
            localStorage.removeItem("isAuthenticated");
            state.success = true;
            state.loading = false;
        })

        // SIGN UP CASES
        builder.addCase(signUpHandler.pending, (state, action) => {
            localStorage.removeItem("isAuthenticated");
            userSlice.caseReducers.setLoading(state)
        })
        builder.addCase(signUpHandler.fulfilled, (state, action) => {
            userSlice.caseReducers.setUser(state, action)
            localStorage.setItem("isAuthenticated", true);
            state.success = true;
            state.loading = false;
        })
        builder.addCase(signUpHandler.rejected, (state, action) => {
            state.error = action.payload || "Please check your network !";
            if(action.payload && action.payload.hasOwnProperty('message')) {
                state.error = action.payload.message;
            }
            localStorage.removeItem("isAuthenticated");
            state.success = true;
            state.loading = false;
        })

        // LOGOUT CASES
        builder.addCase(logoutHandler.pending, (state, action) => {
            userSlice.caseReducers.setLoading(state)
        })
        builder.addCase(logoutHandler.fulfilled, (state, action) => {
            userSlice.caseReducers.resetUser(state)
            localStorage.removeItem("isAuthenticated");
            state.success = true;
            state.loading = false;
        })
        builder.addCase(logoutHandler.rejected, (state, action) => {
            state.error = action.payload || "Please check your network !";
            state.success = true;
            state.loading = false;
        })
    }
})

export default userSlice.reducer;

export const { setUser, resetError, resetUser } = userSlice.actions;