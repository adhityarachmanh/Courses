import React from "react";
import { Redirect } from "react-router-dom";
import AOS from "aos";
import BG from "../../assets/img/bg-1.jpeg";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";

class CheckRecord extends React.Component {
  state = {
    pagePrev: 0,
    pageNext: 5
  };
  handleNext = () => {
    this.setState(prevState => ({
      pagePrev: prevState.pagePrev + 5,
      pageNext: prevState.pageNext + 5
    }));
  };
  handlePrev = () => {
    this.setState(prevState => ({
      pagePrev: prevState.pagePrev - 5,
      pageNext: prevState.pageNext - 5
    }));
  };
  componentDidMount() {
    AOS.init();
  }
  cariRecord = d => {
    const { records } = this.props;
    const cari = {
      ...(records &&
        records.find(d1 => {
          return d1.id_course === d.id;
        }))
    };

    return cari;
  };
  handleUserAnswer = d => {
    const cari = this.cariRecord(d);
    if (cari.userAnswer) {
      if (cari.userAnswer === d.answer) {
        return cari.userAnswer;
      } else {
        return cari.userAnswer;
      }
    } else {
      return "No Answer";
    }
  };
  handleCorrect = d => {
    const cari = this.cariRecord(d);
    if (cari.userAnswer) {
      if (cari.userAnswer === d.answer) {
        return (
          <i class="material-icons  " style={{ color: "green" }}>
            check
          </i>
        );
      } else {
        return (
          <i class="material-icons " style={{ color: "red" }}>
            close
          </i>
        );
      }
    } else {
      return (
        <i class="material-icons " style={{ color: "red" }}>
          close
        </i>
      );
    }
  };
  render() {
    const { match, auth, courses, result } = this.props;
    const { pagePrev, pageNext } = this.state;
    if (!auth.uid) return <Redirect to="/login-page" />;
    return (
      <div className="page-header header-filter" style={styles.BG_PAGE}>
        <div className="container">
          <div className="row">
            <div class="col-lg-12 col-md-6 ml-auto mr-auto">
              <div
                class="card card-login"
                data-aos="fadeIn"
                data-aos-duration="1500"
              >
                <div class="card-header card-header-info text-center">
                  <h4 class="card-title">
                    Check Record Class {parseInt(match.params.class)}
                  </h4>
                </div>

                <div class="card-body my-5">
                  <div className="container">
                    <p className="text-right" style={{ fontWeight: "bold" }}>
                      {" "}
                      Grade: {result.grade}
                    </p>
                    <table className="table responsive ">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Question</th>
                          <th>Your Answer</th>
                          <th>Answer</th>
                          <th>Correct</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses &&
                          courses.slice(pagePrev, pageNext).map((d, i) => {
                            return (
                              <tr key={i}>
                                <td className="text-center">{d.no}</td>
                                <td>{d.question}</td>
                                <td> {this.handleUserAnswer(d)}</td>
                                <td className="text-center"> {d.answer}</td>
                                <td className="text-center">
                                  {this.handleCorrect(d)}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>

                    <div className="row justify-content-center">
                      <ul class="pagination">
                        <li
                          class={`page-item ${
                            pagePrev === 0 ? "disabled" : null
                          }`}
                        >
                          <a
                            onClick={this.handlePrev}
                            class="page-link"
                            href="#"
                          >
                            Prev
                          </a>
                          {/* <span class="page-link">Previous</span> */}
                        </li>

                        <li
                          class={`page-item ${
                            pageNext === 30 ? "disabled" : null
                          }`}
                        >
                          <a
                            onClick={this.handleNext}
                            class="page-link"
                            href="#"
                          >
                            Next
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
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
    backgroundImage: `url('${BG}')`,
    backgroundSize: "cover",
    backgroundPosition: "top center"
  }
};
const mapStateToProps = (state, ownProps) => {
  //data asal
  const selectClass = parseInt(ownProps.match.params.class);
  const records = state.firestore.ordered.records;
  const courses = state.firestore.ordered.courses;
  const auth = state.firebase.auth;
  const results = state.firestore.ordered.results;
  //olah data
  const record =
    records &&
    records.filter(d => {
      return d.class === selectClass && d.uid === auth.uid;
    });
  const course =
    courses &&
    courses.filter(d => {
      return d.class === selectClass;
    });
  const orderBy =
    course &&
    course.sort((d1, d2) => {
      return d1.no > d2.no;
    });
  const result = {
    ...(results &&
      results.find(d => {
        return d.class === selectClass && d.uid === auth.uid;
      }))
  };
  console.log(result);
  //tampilkan
  return {
    courses: orderBy,
    result: result,
    records: record,
    auth: auth
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "records" },
    { collection: "courses" },
    { collection: "results" }
  ])
)(CheckRecord);
