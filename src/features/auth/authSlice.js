import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from './setAuthToken';

export const login = createAsyncThunk('auth/login', (values) => {
  return axios
    .post('http://localhost:3001/auth/login', values)
    .then((response) => response.data);
});

// https://redux-toolkit.js.org/usage/usage-guide

// However, our createReducer utility has some special "magic"
// that makes it even better. It uses the Immer library internally,
// which lets you write code that "mutates" some data,
// but actually applies the updates immutably.
// This makes it effectively impossible to accidentally mutate state in a reducer.

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    isUserLoggedIn: false,
    status: null
  },
  reducers: {
    setCurrentUser: {
      reducer(state, { payload }) {
        state.user = payload.token;
        state.isUserLoggedIn = true;
      }
    },
    logout: {
      reducer(state) {
        localStorage.removeItem('token');
        state.isUserLoggedIn = false;
      }
    }
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.status = 'loading';
    },
    [login.fulfilled]: (state, { payload }) => {
      if (payload && payload.token) {
        localStorage.setItem('token', payload.token);
        setAuthToken(payload.token);
        state.user = jwt_decode(payload.token);
        state.isUserLoggedIn = true;
        state.status = 'success';
      }
      return;
    },
    [login.rejected]: (state) => {
      state.status = 'rejected';
    }
  }
});

export const { setCurrentUser, logout } = authSlice.actions;
export const selectorIsAuth = (state) => state.authSlice.isUserLoggedIn;
export const selectorUser = (state) => state.authSlice.user;
export default authSlice.reducer;
