import React from "react";
import { adminLogout } from "../../../store/actions/autAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  handleLogout = () => {
    this.props.adminLogout();
  };
  render() {
    const { profile, auth, match, history } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
        <div className="container-fluid">
          <div className="navbar-wrapper">
            <nav aria-label="breadcrumb" role="navigation">
              <ol className="breadcrumb">
                {history.location.pathname.split("/").map((d, i) => {
                  return (
                    <li key={i} className="breadcrumb-item text-capitalize">
                      <a>{d}</a>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            aria-controls="navigation-index"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="navbar-toggler-icon icon-bar" />
            <span className="navbar-toggler-icon icon-bar" />
            <span className="navbar-toggler-icon icon-bar" />
          </button>
          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href="#pablo"
                  id="navbarDropdownProfile"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="material-icons">person</i>
                  <span className="ml-auto mr-auto">{profile.nama}</span>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdownProfile"
                >
                  <div className="dropdown-item" />
                  <Link onClick={this.handleLogout} className="dropdown-item">
                    Log out
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = state => {
  const auth = state.firebase.auth;
  const profile = state.firebase.profile;

  return {
    auth: auth,
    profile: profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    adminLogout: () => dispatch(adminLogout())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
