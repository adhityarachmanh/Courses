import React from "react";
import BG from "../../../assets/img/bg-3.jpeg";
import { Link } from "react-router-dom";
import AOS from "aos";
import { connect } from "react-redux";
import { gasLogin } from "../../../store/actions/authAction";
import { Redirect } from "react-router-dom";

class LoginPage extends React.Component {
  state = {
    email: "",
    password: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state);
  };
  componentDidMount() {
    AOS.init({
      duration: 1500
    });
  }
  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div class="page-header header-filter" style={styles.BG_PAGE}>
        <div className="container">
          <div className="row">
            <div class="col-lg-6 col-md-6 ml-auto mr-auto">
              <div
                class="card card-login"
                data-aos="fadeIn"
                data-aos-duration="1500"
              >
                <form class="form" onSubmit={this.handleSubmit}>
                  <div class="card-header card-header-rose text-center">
                    <h4 class="card-title">Login</h4>
                  </div>

                  <div class="card-body my-5">
                    <div class="input-group my-t">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">mail</i>
                        </span>
                      </div>
                      <input
                        id="email"
                        onChange={this.handleChange}
                        type="email"
                        class="form-control"
                        placeholder="Email..."
                      />
                    </div>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">lock_outline</i>
                        </span>
                      </div>
                      <input
                        id="password"
                        onChange={this.handleChange}
                        type="password"
                        class="form-control"
                        placeholder="Password..."
                      />
                    </div>
                    <div class="input-group justify-content-center ">
                      <button className="btn btn-outline-success btn-wd btn-sm">
                        Login
                      </button>
                    </div>
                  </div>

                  {authError ? (
                    <div class="footer text-center text-danger">
                      {authError}
                    </div>
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const styles = {
  BG_PAGE: {
    backgroundImage: `url(${BG})`,
    backgroundSize: "cover",
    backgroundPosition: "top center"
  }
};
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(gasLogin(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
