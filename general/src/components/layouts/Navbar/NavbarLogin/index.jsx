import React from "react";
import { connect } from "react-redux";
import { gasLogout } from "../../../../store/actions/authAction";
import { Link } from "react-router-dom";


class NavbarLogin extends React.Component {
  handleLogout = () => {
    this.props.logout();
  };
  render() {
    const { styles, auth, profile } = this.props;
    return (
      <>
       <li className="nav-item">
          <Link  to="/select-class" className="nav-link">
            Class
          </Link>
        </li>
        <li className="dropdown nav-item">
          <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
            
            {profile.nama}
          </a>
          <div className="dropdown-menu dropdown-with-icons">
           
            <Link onClick={this.handleLogout} className="dropdown-item">
              <i className="material-icons">logout</i> Logout
            </Link>
          </div>
        </li>
      </>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(gasLogout())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarLogin);
