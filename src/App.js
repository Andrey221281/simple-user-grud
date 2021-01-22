import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { PrivateRoute } from './components/PrivateRoute'
import { PublicRoute } from './components/PublicRoute'

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>
        <PublicRoute path="/login">
          <Login />
        </PublicRoute>
      </Switch>
    </Router>
  )
}

export default App
