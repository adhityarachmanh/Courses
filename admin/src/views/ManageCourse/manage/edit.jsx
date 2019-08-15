import React from "react";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { editCourse, deleteImage } from "../../../store/actions/courseAction";
import Swal from "sweetalert2/dist/sweetalert2";

class ManageCourseEdit extends React.Component {
  state = {
    file: null,
    filesToUpload: null
  };
  handleImageC = e => {
    this.setState({
      file: URL.createObjectURL(e.target.files[0]),
      filesToUpload: e.target.files[0]
    });
  };
  handleRemoveImage = () => {
    this.setState({
      file: null,
      filesToUpload: null
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    const {
      filesToUpload,
      question,
      answer,
      option1,
      option2,
      option3,
      option4
    } = this.state;
    const { course, history, match } = this.props;

    const newData = {
      image: filesToUpload,
      question: question,
      answer: answer,
      options: [option1, option2, option3, option4]
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Edit it!"
    }).then(result => {
      if (result.value) {
        this.props.editCourse({
          newData: newData,
          oldData: course
        });
        history.push(
          "/admin/manage-courses/" + parseInt(match.params.class) + "/class"
        );
      }
    });
  };
  deleteImage = () => {
    const { course } = this.props;

    this.props.deleteImage({
      id: course.id
    });
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  render() {
    const { match, history, course } = this.props;
    const { file } = this.state;
    const backClass = () =>
      history.push(
        `/admin/manage-courses/${parseInt(match.params.class)}/class`
      );
    return (
      <div className="container-fluid">
        <button
          onClick={backClass}
          type="button"
          className="btn btn-info pull-left"
        >
          <i className="material-icons">keyboard_backspace</i>
          Back To Table
        </button>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header card-header-success">
                <h4 className="card-title">
                  Edit Course Class {match.params.class}
                </h4>
                <p className="card-category">
                  <strong>Number {course.no ? course.no : null}</strong>
                </p>
              </div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="col-md-12">
                      <h3>Images</h3>

                      {course.image !== "no-image" || file ? (
                        course.image !== "no-image" && !file ? (
                          <div className="row justify-content-center">
                            <img height="300px" src={course.image} alt="" />
                          </div>
                        ) : (
                          <div className="row justify-content-center">
                            <img height="300px" src={file} alt="" />
                          </div>
                        )
                      ) : (
                        <div className="row justify-content-center">
                          No Image
                        </div>
                      )}

                      <div className="form-group form-file-upload form-file-multiple">
                        <input
                          type="file"
                          ref="imageQ"
                          onChange={this.handleImageC}
                          multiple=""
                          className="inputFileHidden"
                        />

                        {file ? (
                          <button
                            type="button"
                            onClick={this.handleRemoveImage}
                            className="btn btn-fab btn-round btn-danger"
                          >
                            <i className="material-icons">remove</i>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => this.refs.imageQ.click()}
                            className="btn btn-fab btn-round btn-primary"
                          >
                            <i className="material-icons">attach_file</i>
                          </button>
                        )}
                        {course.image ? (
                          <button
                            type="button"
                            onClick={this.deleteImage}
                            className="btn btn-fab btn-round btn-default pull-right ml-5"
                          >
                            <i className="material-icons">delete</i>
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <h3>Question</h3>
                      <div className="form-group">
                        <div className="form-group">
                          <label className="bmd-label-floating"> </label>
                          <input
                            id="question"
                            onChange={this.handleChange.bind(this)}
                            className="form-control"
                            type="text"
                            defaultValue={course.question}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <h3>Answer</h3>
                      <div className="form-group">
                        <input
                          defaultValue={course.answer}
                          id="answer"
                          onChange={this.handleChange.bind(this)}
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <h3>Options</h3>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="">Option 1</label>
                            <input
                              id="option1"
                              defaultValue={course.options && course.options[0]}
                              onChange={this.handleChange.bind(this)}
                              type="text"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="">Option 2</label>
                            <input
                              id="option2"
                              defaultValue={course.options && course.options[1]}
                              onChange={this.handleChange.bind(this)}
                              type="text"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="">Option 3</label>
                            <input
                              id="option3"
                              defaultValue={course.options && course.options[2]}
                              onChange={this.handleChange.bind(this)}
                              type="text"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="">Option 4</label>
                            <input
                              id="option4"
                              defaultValue={course.options && course.options[3]}
                              onChange={this.handleChange.bind(this)}
                              type="text"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={backClass}
                    type="button"
                    className="btn btn-info pull-left"
                  >
                    <i className="material-icons">keyboard_backspace</i>
                    Back To Table
                  </button>
                  <button type="submit" className="btn btn-success pull-right">
                    Edit Course
                  </button>
                  <div className="clearfix" />
                </form>
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
  const selectCourse = parseInt(ownProps.match.params.course);
  const filterCourse =
    courses &&
    courses.filter(d => {
      return d.class === selectClass;
    });

  const course = {
    ...(filterCourse &&
      filterCourse.find(d => {
        return d.no === selectCourse;
      }))
  };

  return {
    course: course
  };
};
const mapDispatchToProps = dispatch => {
  return {
    editCourse: data => dispatch(editCourse(data)),
    deleteImage: data => dispatch(deleteImage(data))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "courses" }])
)(ManageCourseEdit);
