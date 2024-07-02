import { Link, useNavigate } from "react-router-dom";
import {
  isAdmin,
  isAuthenticated,
  isUser,
  logout,
} from "../service/UserService";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to logout this user?"
    );
    if (confirmDelete) {
      logout();
      navigate("/login");
    }
  };

  return (
    <nav className="navbar navbar-expand-sm bg-secondary border-bottom box-shadow">
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/">
          {/* <img src="/icon.png" alt="icon" width="30" classNameName="me-2" /> */}
          Signup Login App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isAuthenticated() && (
              <li className="nav-item">
                <Link className="nav-link text-light" to="/profile">
                  Profile
                </Link>
              </li>
            )}
            {isAdmin() && (
              <li className="nav-item">
                <Link className="nav-link text-light" to="/admin/dashboard">
                  Dashboard
                </Link>
              </li>
            )}
            {isUser() && (
              <li className="nav-item">
                <Link className="nav-link text-light" to="/user/dashboard">
                  Dashboard
                </Link>
              </li>
            )}
            {isAuthenticated() ? (
              <li className="nav-item">
                <Link
                  className="nav-link text-light"
                  to="/"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link text-light" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
