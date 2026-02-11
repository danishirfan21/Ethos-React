import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export const Nav = ({ cartCount, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Home';
      case '/collection': return 'Collection';
      case '/process': return 'Process';
      default: return '';
    }
  };

  return (
    <nav>
      <div className="nav-container">
        <NavLink
          to="/"
          className="logo"
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          ETHOS
        </NavLink>

        <div className="mobile-breadcrumb-wrapper">
          <span className="breadcrumb-separator">/</span>
          <span className="current-page">{getPageTitle()}</span>
        </div>

        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <NavLink
            to="/collection"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            The Collection
          </NavLink>
          <NavLink
            to="/process"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Process
          </NavLink>
          <div className="cart-trigger desktop-only" onClick={onCartClick}>
            Cart <span id="cart-count">{cartCount}</span>
          </div>
        </div>

        <div className="nav-actions">
          <div className="cart-trigger mobile-only" onClick={onCartClick}>
            Cart <span id="cart-count">{cartCount}</span>
          </div>
          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

