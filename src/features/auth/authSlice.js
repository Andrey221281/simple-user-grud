import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

import setAuthToken from './setAuthToken'

export const login = createAsyncThunk('auth/login', async (values) => {
  return await axios
    .post('http://localhost:3001/auth/login', values)
    .then((response) => response.data)
})

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
        state.user = payload.token
        state.isUserLoggedIn = true
      }
    }
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.status = 'loading'
    },
    [login.fulfilled]: (state, { payload }) => {
      if (payload && payload.token) {
        localStorage.setItem('token', payload.token)
        setAuthToken(payload.token)
        state.user = jwt_decode(payload.token)
        state.isUserLoggedIn = true
        state.status = 'success'
      }
      return
    },
    [login.rejected]: (state) => {
      state.status = 'rejected'
    }
  }
})

export const { setCurrentUser } = authSlice.actions
export const selectorIsAuth = (state) => state.authSlice.isUserLoggedIn
export default authSlice.reducer
