import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ResponsiveNavigation from './components/ResponsiveNavigation';

// import './App.css';

function App() {
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

  return (
    <div className='App'>
      <Router>
        <ResponsiveNavigation navLinks={navLinks} logo={logo} />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route
            path='/login'
            render={props => <Login {...props} icon={icons.loginIcon} />}
          />
          <Route
            path='/register'
            render={props => <Register {...props} icon={icons.registerIcon} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
