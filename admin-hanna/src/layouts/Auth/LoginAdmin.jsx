import React from "react";
import BG from "../../assets/img/cover.jpg";
import { Link } from "react-router-dom";
import AOS from "aos";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";
import { loginAdmin } from "../../store/actions/autAction";
import Swal from "sweetalert2/dist/sweetalert2";
import firebase from "firebase";

class LoginAdmin extends React.Component {
  state = {
    email: "",
    password: ""
  };
  componentDidMount() {
    AOS.init({
      duration: 1500
    });
    firebase.auth().onAuthStateChanged(admin => {
      if (admin) {
        firebase
          .firestore()
          .collection("admins")
          .doc(admin)
          .then(doc => {
            if (doc.exists) {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000
              });
              Toast.fire({
                type: "success",
                title: "Anda Berhasil Login Sebagai Admin " + doc.data().nama
              });
            }
          });
      } else {
        return;
      }
    });
  }

  protectData = data => {
    let title = "";
    let type = "warning";
    if (data.email === "" && data.password === "") {
      title = "Masukkan Email dan Password Anda";
    } else if (data.password === "") {
      title = "Masukkan Password Anda";
    } else if (data.email === "") {
      title = "Masukkan Email Anda";
    } else {
      return true;
    }
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000
    });
    Toast.fire({
      type: type,
      title: title
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.protectData(this.state)) {
      this.props.loginAdmin(this.state);
    }
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div className="page-header header-filter" style={styles.BG_PAGE}>
        <div className="container">
          <div
            className="row justify-content-center "
            style={{ marginTop: "300px" }}
          >
            <div className="col-lg-6 col-md-6 ml-auto mr-auto ">
              <div
                className="card card-login"
                data-aos="fadeIn"
                data-aos-duration="1500"
              >
                <form className="form" onSubmit={this.handleSubmit}>
                  <div className="card-header card-header-rose text-center">
                    <h4 className="card-title">Login</h4>
                  </div>

                  <div className="card-body my-5">
                    <div className="input-group my-t">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="material-icons">mail</i>
                        </span>
                      </div>
                      <input
                        id="email"
                        onChange={this.handleChange}
                        type="email"
                        className="form-control"
                        placeholder="Email..."
                      />
                    </div>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="material-icons">lock_outline</i>
                        </span>
                      </div>
                      <input
                        id="password"
                        onChange={this.handleChange}
                        type="password"
                        className="form-control"
                        placeholder="Password..."
                      />
                    </div>
                    <div className="input-group justify-content-center ">
                      <button className="btn btn-outline-success btn-wd btn-sm">
                        Login
                      </button>
                    </div>
                  </div>
                  <p className="text-center text-danger">{authError}</p>
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
    loginAdmin: data => dispatch(loginAdmin(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginAdmin);
