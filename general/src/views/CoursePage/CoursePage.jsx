import React from "react";
import BG from "../../assets/img/bg-3.jpeg";
import AOS from "aos";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateRecord, endCourse } from "../../store/actions/courseAction";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import fb from "firebase";
import Swal from "sweetalert2/dist/sweetalert2";
import Countdown from "react-countdown-now";
import LOAD_DATA from "../../assets/img/load-data.gif";

class CoursePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAnswer: null,
      currentQuestion: parseInt(props.match.params.course),
      disabled: true,
      loading: false
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentQuestion !== this.state.currentQuestion) {
      this.loadCurrentAnswer();
    }
  }
  handleTimeOut = () => {
    const { result } = this.props;
    if (result.status === "start") {
      this.props.endCourse(result);
    }
  };

  handleFinish = () => {
    const { result } = this.props;
    Swal.fire({
      title: "Are you sure?",
      text: "you won't be able to continue this Course!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, finish it!"
    }).then(v => {
      if (v.value) {
        this.props.endCourse(result);
      }
    });

    //waktu habis atau klik finish
  };
  componentDidMount() {
    const { result } = this.props;

    //waktu habis atau klik finish
    if (result.status === "start" && new Date().getTime() > result.end_course) {
      this.props.endCourse(result);
    }

    this.loadCurrentAnswer();
    AOS.init();
  }
  loadCurrentAnswer() {
    //load jawaban dari database yang hilang karena di refresh
    const { auth, match } = this.props;
    this.setState({
      loading: true
    });
    fb.firestore()
      .collection("records")
      .where("uid", "==", auth.uid)
      .where("no", "==", parseInt(match.params.course))
      .where("class", "==", parseInt(match.params.class))
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs[0]) {
          this.setState({
            userAnswer: querySnapshot.docs[0].data().userAnswer,
            disabled: false,
            loading: false
          });
        }
      });
  }

  handleNext = () => {
    //klik tombol next route+state
    let course = this.props.match.params.course;
    this.setState(prevState => ({
      currentQuestion: this.state.currentQuestion + 1
    }));
    this.props.history.push(
      `/class/${this.props.match.params.class}/test/${parseInt(course) + 1}`
    );
  };

  handlePrev = () => {
    //klik tombol prev route+state
    let course = this.props.match.params.course;

    this.setState(prevState => ({
      currentQuestion: prevState.currentQuestion - 1
    }));
    this.props.history.push(
      `/class/${this.props.match.params.class}/test/${parseInt(course) - 1}`
    );
  };
  selectQuestion = i => {
    this.setState(prevState => ({
      currentQuestion: i
    }));
    this.props.history.push(
      `/class/${this.props.match.params.class}/test/${i}`
    );
  };
  handleAnswer = d => {
    if (d === this.state.userAnswer) {
      return;
    }
    this.updateRecord(d);
    this.setState(() => {
      return {
        userAnswer: d,
        disabled: false
      };
    });
  };
  updateRecord = userAnswer => {
    const { currentQuestion } = this.state;
    const { course, auth } = this.props;
    //cari
    const data = course.find(d => {
      return d.no === currentQuestion;
    });
    const hasil = { ...data };
    this.props.updateRecord({
      ...hasil,
      id_course: data.id,
      check: data.answer.indexOf(userAnswer) > -1 ? "correct" : "incorrect",
      uid: auth.uid,
      userAnswer: userAnswer
    });
  };
  handleImage = image => {
    Swal.fire({
      imageUrl: image,
      imageHeight: 300
    });
  };
  fillColor = data => {
    const fill = {
      ...(data.records &&
        data.records.find(d => {
          return d.no === data.no;
        }))
    };
    if (fill.no === data.no) {
      return "success";
    } else {
      return "default";
    }
  };
  render() {
    const { auth, course, result, match, loading, records } = this.props;
    const { disabled, currentQuestion, userAnswer } = this.state;

    let data = {
      ...(course &&
        course.find((d, i) => {
          return d.no === currentQuestion;
        }))
    };

    let finish = currentQuestion !== (course && course.length);
    const waktu = result ? result.end_course - new Date().getTime() : null;

    if (!auth.uid) return <Redirect to="/login-page" />;
    else if (result.status === "end")
      return <Redirect to={`/class/${parseInt(match.params.class)}/start`} />;
    return (
      <>
        <div className="page-header header-filter" style={styles.BG_PAGE}>
          <div className="container">
            <div className="row " style={{ marginTop: "200px" }}>
              <div
                className="col-md-4 mt-5"
                data-aos="fadeIn"
                data-aos-duration="1500"
              >
                <div className="main main-raised">
                  <div className="card">
                    <div className="card-header card-header-icon card-header-info">
                      <div className="card-icon text-center">
                        <i className="material-icons">schedule</i>{" "}
                        <p>
                          <Countdown
                            onComplete={() => this.handleTimeOut()}
                            daysInHours={true}
                            date={Date.now() + waktu}
                          />
                        </p>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row ">
                        {course &&
                          course.map((d, i) => {
                            return (
                              <div className="col-md-4">
                                <button
                                  onClick={() => this.selectQuestion(i + 1)}
                                  className={`btn btn-${
                                    i + 1 === currentQuestion
                                      ? "info"
                                      : this.fillColor({
                                          records: records,
                                          no: i + 1
                                        })
                                  } btn-sm btn-block`}
                                >
                                  {i + 1}
                                </button>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-md-8 mt-5"
                data-aos="fadeIn"
                data-aos-duration="1500"
              >
                <div className="main main-raised">
                  <div className="card">
                    <div className="card-header card-header-success">
                      <h4 className="card-title">Question</h4>
                      {data.image !== "no-image" ? (
                        <button
                          onClick={() => this.handleImage(data.image)}
                          className="btn btn-outline-default btn-sm"
                        >
                          Click To Show Image
                        </button>
                      ) : null}

                      <p className="category">{data.question}</p>
                    </div>

                    <div className="card-body">
                      {loading ? (
                        <div className="row justify-content-center">
                          <img src={LOAD_DATA} alt="" />
                        </div>
                      ) : (
                        <ul>
                          {data.options &&
                            data.options.map((d, i) => {
                              return (
                                <li>
                                  <div
                                    key={i}
                                    className={`card ${
                                      d === userAnswer ? "bg-info" : null
                                    }`}
                                    onClick={() => this.handleAnswer(d)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <div className="card-body ">
                                      <h4 class="card-title">{d}</h4>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                        </ul>
                      )}

                      {currentQuestion === 2 ? (
                        <button
                          className={`btn btn-info btn-sm pull-left`}
                          onClick={this.handlePrev}
                        >
                          Prev
                        </button>
                      ) : null}
                      {finish ? (
                        <button
                          className={`btn btn-${
                            disabled ? "default" : "info"
                          } btn-sm pull-right`}
                          onClick={this.handleNext}
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          className={`btn btn-${
                            finish ? "default" : "info"
                          } btn-sm pull-right`}
                          onClick={this.handleFinish}
                        >
                          Finish
                        </button>
                      )}
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
    backgroundSize: "cover",
    backgroundPosition: "top center"
  }
};

const mapStateToProps = (state, ownProps) => {
  let classSelected = parseInt(ownProps.match.params.class);
  //data asal
  const results = state.firestore.ordered.results;
  const courses = state.firestore.ordered.courses;
  const records = state.firestore.ordered.records;
  const auth = state.firebase.auth;
  //olah data
  const record =
    records &&
    records.filter(d => {
      return d.class === classSelected && d.uid.indexOf(auth.uid) > -1;
    });
  const course =
    courses &&
    courses.filter(d => {
      return d.class === classSelected;
    });
  const result = {
    ...(results &&
      results.find(d => {
        return d.uid === state.firebase.auth.uid && d.class === classSelected;
      }))
  };
  const loading = state.shared.loading;
  //tampilkan data
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    classData: state.courses.class,
    course: course,
    result: result,
    loading: loading,
    records: record
  };
};
const mapDispatchProps = dispatch => {
  return {
    updateRecord: data => dispatch(updateRecord(data)),
    endCourse: data => dispatch(endCourse(data))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchProps
  ),
  firestoreConnect([
    { collection: "courses" },
    { collection: "results" },
    { collection: "records" }
  ])
)(CoursePage);
