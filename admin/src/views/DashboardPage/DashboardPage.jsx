import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

class DashboardPage extends React.Component {
  render() {
    const { classCourses, courses } = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-stats">
              <div className="card-header card-header-info card-header-icon">
                <div className="card-icon">
                  <i className="material-icons">Courses</i>
                </div>
                <p className="card-category">courses</p>
                <h3 className="card-title">
                  {courses && courses.length}
                  <small className="ml-1">Question</small>
                </h3>
              </div>
              <div className="card-footer">
                <div className="stats">
                  <i className="material-icons text-danger">warning</i>
                  <a href="">Manage Courses...</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const courses = state.firestore.ordered.courses;
  return {
    courses: courses
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "courses" }])
)(DashboardPage);
