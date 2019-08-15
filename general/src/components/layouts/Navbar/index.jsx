import React from "react";
import { Link } from "react-router-dom";
import NavbarLogin from "./NavbarLogin";
import NavbarLogout from "./NavbarLogout";

import { connect } from "react-redux";

class Navbar extends React.Component {
  render() {
    const { auth } = this.props;
    console.log(auth.uid);
    const NavLinks = auth.uid ? <NavbarLogin /> : <NavbarLogout />;
    return (
      <nav
        className="navbar navbar-transparent navbar-color-on-scroll fixed-top navbar-expand-lg"
        color-on-scroll="100"
        id="sectionsNav"
      >
        <div className="container">
          <div className="navbar-translate">
            <Link className="navbar-brand" to="/">
            Karisma Course
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="navbar-toggler-icon" />
              <span className="navbar-toggler-icon" />
              <span className="navbar-toggler-icon" />
            </button>
          </div>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              
              {NavLinks}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};
export default connect(mapStateToProps)(Navbar);
