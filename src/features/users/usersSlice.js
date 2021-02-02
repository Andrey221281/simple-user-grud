import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsers = createAsyncThunk('users/getUsers', () => {
  return axios
    .get('http://localhost:3001/users')
    .then(({ data }) => data.users);
});

export const createUser = createAsyncThunk('users/createUser', (values) => {
  return axios
    .post('http://localhost:3001/users', values)
    .then(({ data }) => data);
});

export const deleteUser = createAsyncThunk('users/deleteUser', (id) => {
  return axios
    .post(`http://localhost:3001/user/${id}`)
    .then(({ data }) => data.users);
});

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, values }) => {
    return await axios
      .post(`http://localhost:3001/user/update/${id}`, values)
      .then(({ data }) => data.users);
  }
);

// https://redux-toolkit.js.org/usage/usage-guide

// However, our createReducer utility has some special "magic"
// that makes it even better. It uses the Immer library internally,
// which lets you write code that "mutates" some data,
// but actually applies the updates immutably.
// This makes it effectively impossible to accidentally mutate state in a reducer.

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle'
  },
  extraReducers: {
    // getUsers
    [getUsers.pending]: (state) => {
      state.status = 'loading';
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.status = 'success';
      state.users = payload;
    },
    // createUser
    [createUser.pending]: (state) => {
      state.status = 'loading';
    },
    [createUser.fulfilled]: (state, { payload }) => {
      state.status = 'success';
      state.users = [...state.users, payload];
    },
    // deleteUser
    [deleteUser.pending]: (state) => {
      state.status = 'loading';
    },
    [deleteUser.fulfilled]: (state, { meta }) => {
      state.status = 'success';
      state.users = state.users.filter((user) => user.id !== meta.arg);
    },
    // updateUser
    [updateUser.pending]: (state) => {
      state.status = 'loading';
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.status = 'success';
      state.users = payload;
    }
  }
});

export const selectorUsers = (state) => state.usersSlice;
export default usersSlice.reducer;
