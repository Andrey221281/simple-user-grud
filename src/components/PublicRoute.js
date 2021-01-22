import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { selectorIsAuth } from '../features/auth/authSlice'

export function PublicRoute({ children, ...rest }) {
  const isUserLoggedIn = useSelector(selectorIsAuth)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isUserLoggedIn ? (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
        ) : (
          children
        )
      }
    />
  )
}
