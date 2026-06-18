import { NavLink, useNavigate } from "react-router-dom";
import {showError, showSuccess} from "../../utils/toast";

const Navbar = () => {

  const navigate = useNavigate();

      const handleLogout = () => {
    localStorage.removeItem("token");

    // Optional
    localStorage.removeItem("user");
showSuccess("Logout successful");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>Employee Management</h2>

        <div className="nav-links">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "nav-link active-link"
                : "nav-link"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              isActive
                ? "nav-link active-link"
                : "nav-link"
            }
          >
            Analytics
          </NavLink>
        </div>
      </div>

      <div className="navbar-right">
        <div className="user-profile">
          <div className="user-avatar">
            SP
          </div>

          <div className="user-info">
            {/* <span className="user-name">
              Surya Prakash
            </span> */}

            <span className="user-role">
              Administrator
            </span>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;