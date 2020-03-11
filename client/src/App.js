import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ResponsiveNavigation from './components/ResponsiveNavigation';
import Dashboard from './pages/Dashboard';
export const AuthContext = React.createContext();

// Reducer Hook
const INITIAL_STATE = {
  isAuthenticated: false,
  user: null,
  token: null
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

function App() {
  const NoMatchPage = () => {
    return (
      <div className='page-content'>
        <h3 style={{ color: 'red' }}>404 - Not found</h3>
      </div>
    );
  };

  const navLinks = [
    {
      text: 'Home',
      path: '/',
      icon: 'fas fa-home',
      hoverBackground: '#ff4f33'
    },
    {
      text: 'Login',
      path: '/login',
      icon: 'fas fa-sign-in-alt',
      hoverBackground: '#33d5ff'
    },
    {
      text: 'Register',
      path: '/register',
      icon: 'fas fa-user-plus',
      hoverBackground: '#73fb00'
    }
  ];

  const icons = {
    registerIcon: 'fas fa-user-plus',
    loginIcon: 'fas fa-sign-in-alt'
  };

  const logo = 'fab fa-cloudversify';

  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <div className='App'>
        <Router>
          <ResponsiveNavigation navLinks={navLinks} logo={logo} />
          {state.isAuthenticated ? (
            <Redirect to='/dashboard' />
          ) : (
            console.log('not authed')
          )}
          <Switch>
            {!state.isAuthenticated ? (
              <React.Fragment>
                <Route
                  exact
                  path='/'
                  render={props => <Landing {...props} logo={logo} />}
                />
                <Route
                  path='/login'
                  render={props => <Login {...props} icon={icons.loginIcon} />}
                />
                <Route
                  path='/register'
                  render={props => (
                    <Register {...props} icon={icons.registerIcon} />
                  )}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Route
                  path='/dashboard'
                  render={props => <Dashboard {...props} />}
                />
              </React.Fragment>
            )}

            <Route component={NoMatchPage} />
          </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
