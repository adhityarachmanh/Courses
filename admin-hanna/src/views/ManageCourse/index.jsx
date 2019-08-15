import React from "react";
import { classCourse, colorCourse } from "./data";
import { Link } from "react-router-dom";

class ManageCourse extends React.Component {
  changeColor = i => {
    return colorCourse[i];
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          {classCourse.map((d, i) => {
            return (
              <div key={i} className="col-lg-3 col-md-6 col-sm-6">
                <div className="card card-stats">
                  <div
                    className={`card-header card-header-${this.changeColor(
                      i
                    )} card-header-icon`}
                  >
                    <div className="card-icon">
                      <i className="material-icons">class</i>
                    </div>
                    <p className="card-category">Class</p>
                    <h3 className="card-title">
                      <small className="ml-1">{d}</small>
                    </h3>
                  </div>
                  <div className="card-footer">
                    <div className="stats">
                      <i className="material-icons text-success">menu</i>
                      <Link to={`/admin/manage-courses/${d}/class`}>
                        Manage Courses Class {d}...
                      </Link>
                    </div>
                    <div className="stats">
                      <i className="material-icons text-success">score</i>
                      <Link to={`/admin/manage-courses/${d}/results`}>
                        Result Courses Class {d}...
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default ManageCourse;
