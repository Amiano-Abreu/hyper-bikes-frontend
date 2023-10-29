import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    error: '',
    uid: '',
    userName: '',
    email: '',
    state: '',
    country: ''
}

export const getUser = createAsyncThunk('user/getUser', async( _, { rejectWithValue }) => {

    try {
        // const response = await axios.get('http://localhost:5000/api/csrf', {withCredentials: true});
        // const csrfToken = response.data.csrfToken;

        const userResponse = await axios.get('http://localhost:5000/api/user', {
            // headers: {
            //     'X-CSRF-Token': csrfToken
            // },
            withCredentials: true,
            mode: 'cors'
        })
        const { data } = userResponse.data;

        return data;

    } catch (error) {
        console.log(error.response?.data || error.message)
        return rejectWithValue(error.response?.data || error.message);
    }
})

export const loginHandler = createAsyncThunk('user/loginHandler', async( login , { rejectWithValue }) => {

    try {
        // const response = await axios.get('http://localhost:5000/api/csrf', {withCredentials: true});
        // const csrfToken = response.data.csrfToken;
        
        // console.log(csrfToken);
        const loginResponse = await axios.post('http://localhost:5000/api/login', {
                                    email: login.email,
                                    password: login.password
                                }, {
                                    headers: {
                                        'Accept': "application/json",
                                        'Content-Type': "application/json",
                                        // 'X-CSRF-Token': csrfToken
                                    },
                                    withCredentials: true,
                                    mode: 'cors'
                                })
        const { user } = loginResponse.data;
        return user;
    } catch (error) {
        const { data } = error.response;
        const { message } = data;
        return rejectWithValue(message || error.message);
    }

})

export const signUpHandler = createAsyncThunk('user/signUpHandler', async( signUp , { rejectWithValue }) => {

    try {
        const response = await axios.get('http://localhost:5000/api/csrf', {withCredentials: true});
        const csrfToken = response.data.csrfToken;
        
        console.log(csrfToken);
        const signUpResponse = await axios.post('http://localhost:5000/api/signup', {
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
                                        'X-CSRF-Token': csrfToken
                                    },
                                    withCredentials: true,
                                    mode: 'cors'
                                })
        const { user } = signUpResponse.data;
        return {
            token: csrfToken,
            ...user
        };
    } catch (e) {
        const { data } = e.response;
        console.log('data ', data)
        const { error, message } = data;
        console.log('erorrrr ', error, 'mess ',message,'e.mes', e.message)
        return rejectWithValue(error || message || e.message);
    }

})

export const logoutHandler = createAsyncThunk('user/logoutHandler', async( _ , { rejectWithValue, getState }) => {

    // const state = getState();
    // const { token: csrfToken } = state;

    try {
        const logoutResponse = await axios.post('http://localhost:5000/api/logout', {
                                    headers: {
                                        'Accept': "application/json",
                                        // 'Content-Type': "application/json",
                                        // 'X-CSRF-Token': csrfToken
                                    },
                                    withCredentials: true,
                                    mode: 'cors'
                                })
        console.log( logoutResponse)
        return logoutResponse;
    } catch (error) {
        console.log(error)
        const { data } = error.response;
        const { message } = data;
        return rejectWithValue(message || error.message);
    }

})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.uid = action.payload.uid;
            state.userName = action.payload.name;
            state.email = action.payload.email;
            state.state = action.payload.state;
            state.country = action.payload.country;
        },
        resetUser: (state) => {
            state = initialState;
        }
    },
    extraReducers: (builder) => {
        // GET USER CASES
        builder.addCase(getUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
            state.uid = action.payload.uid;
            state.userName = action.payload.name;
            state.email = action.payload.email;
            state.state = action.payload.state;
            state.country = action.payload.country;
            state.token = action.payload.token;
        })
        builder.addCase(getUser.rejected, (state, action) => {
            state.loading = false;
        })

        // LOGIN CASES
        builder.addCase(loginHandler.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(loginHandler.fulfilled, (state, action) => {
            state.loading = false;
            state.uid = action.payload.uid;
            state.userName = action.payload.name;
            state.email = action.payload.email;
            state.state = action.payload.state;
            state.country = action.payload.country;
            state.token = action.payload.token;
        })
        builder.addCase(loginHandler.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // SIGN UP CASES
        builder.addCase(signUpHandler.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(signUpHandler.fulfilled, (state, action) => {
            state.loading = false;
            state.uid = action.payload.uid;
            state.userName = action.payload.name;
            state.email = action.payload.email;
            state.state = action.payload.state;
            state.country = action.payload.country;
            state.token = action.payload.token;
        })
        builder.addCase(signUpHandler.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            if(action.payload.hasOwnProperty('message')) {
                state.error = action.payload.message;
            }
        })

        // LOGOUT CASES
        builder.addCase(logoutHandler.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(logoutHandler.fulfilled, (state, action) => {
            userSlice.caseReducers.resetUser();
        })
        builder.addCase(logoutHandler.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default userSlice.reducer;

export const { addUser, resetUser } = userSlice.actions;