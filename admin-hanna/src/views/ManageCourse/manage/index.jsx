import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { colorCourse } from "../data";
import SearchCourse from "./sections/SearchCourse";
import TrTempalte from "./sections/TrTempalte";
import { Link } from "react-router-dom";
import { deleteImage } from "../../../store/actions/courseAction";

class ManageCourseClass extends React.Component {
  state = {
    search: false,
    searchVal: null
  };
  handleSearch = e => {
    if (e.target.value !== "") {
      this.setState({
        search: true,
        searchVal: e.target.value
      });
    } else {
      this.setState({
        search: false,
        searchVal: null
      });
    }
  };
  render() {
    const { courses, selectClass, match, history } = this.props;

    const classColor = colorCourse[selectClass - 1];
    const { search, searchVal } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className={`card-header card-header-${classColor}`}>
                <h4 className="card-title ">Table Class {selectClass}</h4>
                <Link
                  to={`/admin/manage-courses/${selectClass}/create`}
                  className="btn btn-success btn-sm"
                >
                  Add Course Class {selectClass}
                </Link>
              </div>
              <div className="card-body">
                <div className="row justify-content-start">
                  <div className="col-md-6">
                    <div className="form-group">
                      Search:{" "}
                      <input
                        className="form-control"
                        onChange={this.handleSearch}
                        placeholder="find question or something..."
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <thead className=" text-primary">
                      <th>No</th>
                      <th>Question</th>
                      <th>Image</th>
                      <th>Options</th>
                      <th>Answer</th>
                      <th>Tools</th>
                    </thead>
                    <tbody>
                      {search ? (
                        <SearchCourse
                          match={match}
                          courses={courses}
                          searchVal={searchVal}
                        />
                      ) : (
                        courses &&
                        courses.map((d, i) => {
                          return <TrTempalte match={match} key={i} d={d} />;
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const courses = state.firestore.ordered.courses;
  const selectClass = parseInt(ownProps.match.params.class);

  //olah data
  const fCourses =
    courses &&
    courses.filter(d => {
      return d.class === selectClass;
    });
   
  const orderBy =
    fCourses &&
    fCourses.sort((d1, d2) => {
      return d1.no > d2.no;
    });
    console.log(orderBy)
  return {
    courses: orderBy,
    selectClass: selectClass
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "courses" }])
)(ManageCourseClass);
