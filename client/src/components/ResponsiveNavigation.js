import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ResponsiveNavigation({
  navLinks,
  background,
  hoverBackground,
  linkColor,
  logo
}) {
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav className='responsive-toolbar' style={{ background }}>
      <ul style={{ background }} className={navOpen ? 'active' : ''}>
        <figure onClick={() => setNavOpen(!navOpen)}>
          <i className={logo} />
        </figure>
        {navLinks.map((link, index) => (
          <li
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
      </ul>
      <h1 className='hide-lg show-sm'>Manga Fan</h1>
    </nav>
  );
}
