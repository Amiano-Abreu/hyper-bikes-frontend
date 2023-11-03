import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
        //     token: csrfToken
        // };
    } catch (e) {
        const { data } = e.response;
        const { error, message } = data;
        return rejectWithValue(error || message || e.message);
    }

})

export const signUpHandler = createAsyncThunk('user/signUpHandler', async( signUp , { rejectWithValue }) => {

    try {
        // const response = await axios.get('http://localhost:5000/api/csrf', {withCredentials: true});
        // const csrfToken = response.data.csrfToken;
        
        // console.log(csrfToken);
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
                                        // 'X-CSRF-Token': csrfToken
                                    },
                                    withCredentials: true,
                                    mode: 'cors'
                                })
        const { user } = signUpResponse.data;
        return user;
    } catch (e) {
        const { data } = e.response;
        console.log('data ', data)
        const { error, message } = data;
        console.log('erorrrr ', error, 'mess ',message,'e.mes', e.message)
        return rejectWithValue(error || message || e.message);
    }

})

export const logoutHandler = createAsyncThunk('user/logoutHandler', async( _ , { rejectWithValue, getState }) => {

    // const state = getState().userSlice;
    // const { token: csrfToken } = state;
    const response = await axios.get('http://localhost:5000/api/csrf', {withCredentials: true});
    const csrfToken = response.data.csrfToken;
    
    // console.log('logout csrf ',csrfToken);
    try {
        const logoutResponse = await axios.post('http://localhost:5000/api/logout', {
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
            state.loading = false;
            state.success = true;
        })
        builder.addCase(getUser.rejected, (state, action) => {
            state.loading = false;
            state.success = true;
        })

        // LOGIN CASES
        builder.addCase(loginHandler.pending, (state, action) => {
            userSlice.caseReducers.setLoading(state)
        })
        builder.addCase(loginHandler.fulfilled, (state, action) => {
            userSlice.caseReducers.setUser(state, action)

            state.loading = false;
            state.success = true;
        })
        builder.addCase(loginHandler.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.success = true;
        })

        // SIGN UP CASES
        builder.addCase(signUpHandler.pending, (state, action) => {
            userSlice.caseReducers.setLoading(state)
        })
        builder.addCase(signUpHandler.fulfilled, (state, action) => {
            userSlice.caseReducers.setUser(state, action)

            state.loading = false;
            state.success = true;
        })
        builder.addCase(signUpHandler.rejected, (state, action) => {
            state.error = action.payload;
            if(action.payload.hasOwnProperty('message')) {
                state.error = action.payload.message;
            }
            state.loading = false;
            state.success = true;
        })

        // LOGOUT CASES
        builder.addCase(logoutHandler.pending, (state, action) => {
            userSlice.caseReducers.setLoading(state)
        })
        builder.addCase(logoutHandler.fulfilled, (state, action) => {
            userSlice.caseReducers.resetUser(state)
            state.success = true;
            state.loading = false;
        })
        builder.addCase(logoutHandler.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.success = true;
        })
    }
})

export default userSlice.reducer;

export const { setUser, resetError, resetUser } = userSlice.actions;

/**
    CHECK LOGOUT, LOGIN CASE
 */