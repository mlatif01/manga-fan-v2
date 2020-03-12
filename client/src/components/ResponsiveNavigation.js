import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

export default function ResponsiveNavigation({
  navLinks,
  background,
  hoverBackground,
  linkColor,
  logo,
  canLogout
}) {
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [navOpen, setNavOpen] = useState(false);

  // If user authenticated, show different links

  return (
    <nav className='responsive-toolbar' style={{ background }}>
      <ul style={{ background }} className={navOpen ? 'active' : ''}>
        <figure onClick={() => setNavOpen(!navOpen)}>
          <i className={logo} />
        </figure>
        {navLinks.map((link, index) => (
          <li
            className={link.text.toLowerCase() + 'Link'}
            key={link.text}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(-1)}
            style={{
              background:
                hoverIndex === index
                  ? link.hoverBackground || '$login-color'
                  : ''
            }}
          >
            <Link to={link.path} style={{ color: linkColor }}>
              {link.text}
              <i className={link.icon}></i>
            </Link>
          </li>
        ))}
        {canLogout ? <LogoutButton /> : null}
      </ul>
      <h1 className='hide-lg show-sm'>Manga Fan</h1>
    </nav>
  );
}
