import { combineReducers } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import usersSlice from './features/users/usersSlice'

const rootReducer = combineReducers({ authSlice, usersSlice })

export default rootReducer
