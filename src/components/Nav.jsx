import { NavLink } from 'react-router-dom';

export const Nav = ({ cartCount, onCartClick }) => {
  return (
    <nav>
      <NavLink
        to="/"
        className="logo"
        style={{ color: 'inherit', textDecoration: 'none' }}
      >
        ETHOS
      </NavLink>
      <div className="nav-links">
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
        <div className="cart-trigger" onClick={onCartClick}>
          Cart <span id="cart-count">{cartCount}</span>
        </div>
      </div>
    </nav>
  );
};
