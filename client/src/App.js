import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ResponsiveNavigation from './components/ResponsiveNavigation';
import Dashboard from './pages/Dashboard';
import Manga from './pages/Manga';
import Otaku from './pages/Otaku';
import OtakuProfile from './components/OtakuProfile';
import Footer from './components/Footer';

export const AuthContext = React.createContext();
// Reducer Hook
const INITIAL_STATE = {
  redirectToLogin: false,
  isAuthenticated: false,
  user: null,
  token: null,
  otakuProfile: null,
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
        token: action.payload.token,
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case 'REGISTER':
      return {
        ...state,
        redirectToLogin: true,
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: {
          profile: action.payload.profile,
        },
      };
    case 'SET_OTAKU_PROFILE':
      return {
        ...state,
        otakuProfile: action.payload,
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

  const preLoginNavLinks = [
    {
      text: 'Home',
      path: '/',
      icon: 'fas fa-home',
      hoverBackground: '#ff4f33',
    },
    {
      text: 'Login',
      path: '/login',
      icon: 'fas fa-sign-in-alt',
      hoverBackground: '#33d5ff',
    },
    {
      text: 'Register',
      path: '/register',
      icon: 'fas fa-user-plus',
      hoverBackground: '#73fb00',
    },
  ];

  const postLoginNavLinks = [
    {
      text: 'Dashboard',
      path: '/dashboard',
      icon: 'fas fa-home',
      hoverBackground: '#ff4f33',
    },
    {
      text: 'Manga',
      path: '/manga',
      icon: 'fas fa-book',
      hoverBackground: '#33d5ff',
    },
    {
      text: 'Otaku',
      path: '/otaku',
      icon: 'fas fa-users',
      hoverBackground: '#E800FF',
    },
  ];

  const icons = {
    registerIcon: 'fas fa-user-plus',
    loginIcon: 'fas fa-sign-in-alt',
  };

  // Logo
  const logo = 'fab fa-cloudversify';

  // Configure toast
  toast.configure({
    autoClose: 3000,
    draggable: false,
    draggablePercent: 60,
  });

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
    });
  };

  const handleSetOtakuProfile = (otakuProfile) => {
    console.log(otakuProfile);
    dispatch({
      type: 'SET_OTAKU_PROFILE',
      payload: otakuProfile,
    });
  };

  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{ state, dispatch, handleLogout, handleSetOtakuProfile }}
    >
      <div className='App'>
        <Router>
          <ResponsiveNavigation
            // Lovely!
            navLinks={
              !state.isAuthenticated ? preLoginNavLinks : postLoginNavLinks
            }
            logo={logo}
            canLogout={state.isAuthenticated}
          />
          {/* If logged in, redirect to Dashboard*/}
          {state.isAuthenticated ? <Redirect to='/dashboard' /> : null}
          {/* If registered in, redirect to Login*/}
          {state.redirectToLogin ? <Redirect to='/login' /> : null}
          {!state.isAuthenticated ? (
            <Switch>
              <React.Fragment>
                <Route
                  exact
                  path='/'
                  render={(props) => <Landing {...props} logo={logo} />}
                />
                <Route
                  path='/login'
                  render={(props) => (
                    <Login {...props} icon={icons.loginIcon} />
                  )}
                />
                <Route
                  path='/register'
                  render={(props) => (
                    <Register {...props} icon={icons.registerIcon} />
                  )}
                />
              </React.Fragment>
              <Route component={NoMatchPage} />
            </Switch>
          ) : (
            <Switch>
              <React.Fragment>
                <Route
                  exact
                  path='/dashboard'
                  render={(props) => <Dashboard {...props} user={state.user} />}
                />
                <Route path='/manga' render={(props) => <Manga {...props} />} />
                <Route
                  exact
                  path={'/otaku'}
                  render={(props) => <Otaku {...props} />}
                />
                <Route
                  exact
                  path={`/otaku/:otakuId`}
                  render={(props) => (
                    <OtakuProfile
                      {...props}
                      otakuProfile={state.otakuProfile}
                    />
                  )}
                />
              </React.Fragment>
              <Route component={NoMatchPage} />
            </Switch>
          )}
        </Router>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
