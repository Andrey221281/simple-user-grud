import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'

import './index.css'
import App from './App'
import store from './store'
import setAuthToken from './features/auth/setAuthToken'
import { setCurrentUser } from './features/auth/authSlice'

if (localStorage.token) {
  setAuthToken(localStorage.token)
  store.dispatch(setCurrentUser(jwt_decode(localStorage.token)))
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
