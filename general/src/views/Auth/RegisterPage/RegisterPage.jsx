import React from "react";
import AOS from "aos";
import { Redirect } from "react-router-dom";
import BG from "../../../assets/img/bg-3.jpeg";
import { gasDaftar } from "../../../store/actions/authAction";
import { connect } from "react-redux";

class RegisterPage extends React.Component {
  state = {
    name:'',
    school:'',
    address:'',
    email:'',
    password:''
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.daftar(this.state);
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
                    <h4 class="card-title">Register</h4>
                  </div>
                  
                  <div class="card-body">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">face</i>
                        </span>
                      </div>
                      <input
                        id="nama"
                        onChange={this.handleChange}
                        type="text"
                        class="form-control"
                        placeholder="Nama..."
                      />
                    </div>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">school</i>
                        </span>
                      </div>
                      <input
                        id="school"
                        onChange={this.handleChange}
                        type="text"
                        class="form-control"
                        placeholder="School..."
                      />
                    </div>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">map</i>
                        </span>
                      </div>
                      <input
                        id="address"
                        onChange={this.handleChange}
                        type="text"
                        class="form-control"
                        placeholder="Address..."
                      />
                    </div>
                    <div class="input-group">
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
                        Register
                      </button>
                    </div>
                  </div>
                  <div class="footer text-center" />
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
    daftar: userBaru => dispatch(gasDaftar(userBaru))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);
