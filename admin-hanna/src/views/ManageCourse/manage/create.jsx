import React from "react";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { createCourse } from "../../../store/actions/courseAction";
import Swal from "sweetalert2/dist/sweetalert2";
class ManageCourseCreate extends React.Component {
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
    const { match, number } = this.props;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Create it!"
    }).then(result => {
      if (result.value) {
        this.props.createCourse({
          image: filesToUpload,
          question: question,
          answer: answer,
          options: [option1, option2, option3, option4],
          class: parseInt(match.params.class),
          no: number
        });
        this.props.history.push(
          `/admin/manage-courses/${parseInt(match.params.class)}/class`
        );
      }
    });
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  render() {
    const { match, history, number } = this.props;
    const { file } = this.state;
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          {" "}
          <div className="col-md-6">
            <div className="card">
              <div className="card-header card-header-success">
                <h4 className="card-title">
                  Create Course Class {match.params.class}
                </h4>
                <p className="card-category">
                  <strong>Number {number ? number : null}</strong>
                </p>
              </div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="col-md-12">
                      <h3>Images</h3>
                      {file ? (
                        <div className="row justify-content-center">
                          <img src={file} alt="" />
                        </div>
                      ) : null}

                      <div className="form-group form-file-upload form-file-multiple">
                        <input
                          type="file"
                          ref="imageQ"
                          onChange={this.handleImageC}
                          multiple=""
                          className="inputFileHidden"
                        />
                        <div className="input-group">
                          <span className="input-group-btn">
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
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <h3>Question</h3>
                      <div className="form-group">
                        <div className="form-group">
                          <label className="bmd-label-floating"> </label>
                          <textarea
                            id="question"
                            onChange={this.handleChange}
                            className="form-control"
                            rows="5"
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
                          id="answer"
                          onChange={this.handleChange}
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
                              onChange={this.handleChange}
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
                              onChange={this.handleChange}
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
                              onChange={this.handleChange}
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
                              onChange={this.handleChange}
                              type="text"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      history.push(
                        `/admin/manage-courses/${parseInt(
                          match.params.class
                        )}/class`
                      )
                    }
                    type="button"
                    className="btn btn-info pull-left"
                  >
                    <i className="material-icons">keyboard_backspace</i>
                    Back To Table
                  </button>
                  <button type="submit" className="btn btn-success pull-right">
                    Create Course
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

  const number =
    courses &&
    courses.filter(d => {
      return d.class === parseInt(ownProps.match.params.class);
    });
  const findNumber = number && number.length;
  return {
    number: findNumber + 1
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createCourse: data => dispatch(createCourse(data))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "courses" }])
)(ManageCourseCreate);
