import React, { useState } from 'react';
import { AuthContext } from '../App';

export default function LogoutButton() {
  const { handleLogout } = React.useContext(AuthContext);

  const link = {
    text: 'Logout',
    path: '/',
    icon: 'fas fa-sign-out-alt',
    hoverBackground: '#C70000'
  };

  const [hoverIndex, setHoverIndex] = useState(-1);
  const index = 3;

  return (
    <React.Fragment>
      <a
        href='/'
        onClick={handleLogout}
        className={link.text.toLowerCase() + 'Link'}
        key={link.text}
        onMouseEnter={() => setHoverIndex(3)}
        onMouseLeave={() => setHoverIndex(-1)}
        style={{
          background:
            hoverIndex === index ? link.hoverBackground || '$login-color' : ''
        }}
      >
        <span>
          <i className={link.icon}></i>Logout
        </span>
      </a>
    </React.Fragment>
  );
}
