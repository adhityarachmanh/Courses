import React from "react";
import BG from "../../assets/img/bg-1.jpeg";
import AOS from "aos";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";

class HomePage extends React.Component {
  componentDidMount() {
    AOS.init();
  }
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/login-page" />;
    return (
      <>
        <div className="page-header header-filter" style={styles.BG_PAGE}>
          <div className="container">
            <div className="row">
              <div className="col-md-8 ml-auto mr-auto">
                <div className="brand text-center">
                  <h1
                    data-aos="fade-right"
                    data-aos-duration="1500"
                    className="shamery"
                  >
                    WELCOME
                  </h1>
                  <h1
                    data-aos="fade-left"
                    data-aos-duration="1000"
                    className="shamery"
                  >
                    TO
                  </h1>
                  <h1
                    data-aos="fade-right"
                    data-aos-duration="1500"
                    className="shamery"
                  >
                    KARISMA COURSE
                  </h1>
                  <Link
                    to="/select-class"
                    className="btn btn-outline-success btn-sm"
                  >
                    Let&apos;s start
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main main-raised">
          <div className="container">
            <div class="section text-center">
              <div class="row">
                <div class="col-md-8 ml-auto mr-auto">
                  <h2 class="title">Let&apos;s talk course</h2>
                  <h5 class="description">
                    Karisma Course hadir sebagai solusi untuk menumbuhkan rasa
                    percaya diri dan meningkatkan kemampuan berbahasa Inggrismu
                    menggunakan metode khusus yang terbukti efektif. Didukung
                    staf yang kompeten, prasarana modern, dan komunitas yang
                    suportif.
                  </h5>
                </div>
              </div>
              <div class="features">
                <div class="row justify-content-center">
                  <div class="col-md-4">
                    <div class="info">
                      <div class="icon icon-info">
                        <i class="material-icons">home</i>
                      </div>
                      <h4 class="info-title">Address</h4>
                      <p>Cluster Graha Sena 2M 18/19</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="info">
                      <div class="icon icon-success">
                        <i class="material-icons">phone</i>
                      </div>
                      <h4 class="info-title">Contact</h4>
                      <p>081360146685</p>
                    </div>
                  </div>
                </div>
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
    backgroundImage: `url('${BG}')`,
    height: "600px",
    backgroundSize: "cover",
    backgroundPosition: "top center"
  }
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};
export default connect(mapStateToProps)(HomePage);
