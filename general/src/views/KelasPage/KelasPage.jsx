import React from "react";
import BG from "../../assets/img/bg-1.jpeg";
import AOS from "aos";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

class KelasPage extends React.Component {
  state = {
    warna: ["danger", "primary", "info", "rose", "warning","success"]
  };
  colorSelect = i => {
    return this.state.warna[i];
  };
  componentDidMount() {
    AOS.init();
  }
  render() {
    const { auth, classData } = this.props;
    if (!auth.uid) return <Redirect to="/login-page" />;
    return (
      <>
        <div className="page-header header-filter" style={styles.BG_PAGE}>
          <div className="container">
            <div className="row">
              <div className="col-md-8 ml-auto mr-auto">
                <div class="brand" data-aos="fade-right" data-aos-duration="1500">
                  <h1>Select Class.</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main main-raised" >
          <div class="section section-basic">
            <div class="">
              <div className="row justify-content-center " data-aos="fadeIn" data-aos-duration="1500">
                {classData.map((d, i) => {
                  return (
                    <div key={i} class="col-md-4  ml-1 mr-1">
                      <div class="card">
                        <div
                          class={`card-header-${this.colorSelect(
                            i
                          )} text-center`}
                        >
                          <h4 class="card-title">Class {d}</h4>
                          <p class="category" />
                        </div>
                        <div class="card-body text-center">
                          <Link
                            to={`/class/${d}/start`}
                            className="btn btn-outline-primary btn-sm"
                          >
                            Start Test
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const styles = {
  BG_PAGE: {
    height: "500px",
    backgroundImage: `url('${BG}')`,
    backgroundSize: "cover",
    backgroundPosition: "top center"
  }
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    classData: state.courses.class
  };
};
export default connect(mapStateToProps)(KelasPage);
