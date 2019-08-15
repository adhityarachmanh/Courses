import React from "react";
import { Link } from "react-router-dom";

class NavbarLogout extends React.Component {
  render() {
    return (
      <>
        
        <li className="nav-item">
          <Link  to="/login-page" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register-page" className="nav-link" title="">
            Register
          </Link>
        </li>
      </>
    );
  }
}

export default NavbarLogout;
