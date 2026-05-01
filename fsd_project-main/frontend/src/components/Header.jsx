import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <span className="header-logo-icon">AT</span>
          <span>A Team</span>
        </Link>

        <nav className="header-nav">
          <Link
            to="/"
            className={`header-link ${isActive("/") ? "active" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/add"
            className={`header-link ${isActive("/add") ? "active" : ""}`}
          >
            Add Member
          </Link>
          <Link
            to="/members"
            className={`header-link ${isActive("/members") ? "active" : ""}`}
          >
            Members
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
