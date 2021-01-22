import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { selectorIsAuth } from '../features/auth/authSlice'

export function PrivateRoute({ children, ...rest }) {
  const isUserLoggedIn = useSelector(selectorIsAuth)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isUserLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}
