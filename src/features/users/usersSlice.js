import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  return await axios
    .get('http://localhost:3001/users')
    .then((response) => response.data.users)
})

export const createUser = createAsyncThunk(
  'users/createUser',
  async (values) => {
    return await axios
      .post('http://localhost:3001/users', values)
      .then((response) => response.data)
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: null
  },
  // reducers: {
  //   setCurrentUser: {
  //     reducer(state, { payload }) {
  //       state.user = payload
  //       state.isUserLoggedIn = true
  //     }
  //   }
  // },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.status = 'loading'
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.status = 'success'
      state.users = payload
    },
    // createUser
    [createUser.pending]: (state) => {
      state.status = 'loading'
    },
    [createUser.fulfilled]: (state, { payload }) => {
      console.log(payload)
      state.status = 'success'
      state.users = [...state.users, payload]
    }
  }
})

export const selectorUsers = (state) => state.usersSlice
export default usersSlice.reducer
