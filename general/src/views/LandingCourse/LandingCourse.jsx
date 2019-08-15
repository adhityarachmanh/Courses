import React from "react";
import BG from "../../assets/img/bg-1.jpeg";
import AOS from "aos";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import LOAD_DATA from "../../assets/img/load-data.gif";
import { firestoreConnect } from "react-redux-firebase";
import StartCourse from "./sections/StartCourse";
import ContinuesCourse from "./sections/ContinuesCourse";
import ScoreCourse from "./sections/ScoreCourse";
import BlockCourse from "./sections/BlockCourse";

class LandingCourse extends React.Component {
  state = {
    loading: true
  };
  componentDidMount() {
    // const { result } = this.props;
    // if (result.uid) {
    //   this.setState({
    //     loading: false
    //   });
    // }
    //waktu habis atau klik finish
    this.handleFinish();

    AOS.init();
  }
  handleFinish = () => {
    // const { results } = this.props;
    // if (results.status !== "end" && new Date().getTime() > results.end_course) {
    //   this.props.endCourse(results);
    // }
    //waktu habis atau klik finish
  };

  render() {
    const {
      auth,
      profile,
      banyakSoal,
      match,
      selectClass,
      results,
      history,
      userAnswer,
      checkInComplete,
      completeAnswer,
      checkComplete
    } = this.props;

    if (!auth.uid) return <Redirect to="/login-page" />;
    return (
      <>
        <div className="page-header header-filter" style={styles.BG_PAGE}>
          <div className="container">
            <div className="row">
              <div class="col-lg-6 col-md-6 ml-auto mr-auto">
                <div class="card card-login">
                  <form class="form" onSubmit={this.handleSubmit}>
                    {checkComplete.grade ? (
                      <ScoreCourse
                        checkComplete={checkComplete}
                        userAnswer={userAnswer}
                        profile={profile}
                        banyakSoal={banyakSoal}
                        match={match}
                      />
                    ) : checkInComplete.status === "start" ? (
                      <ContinuesCourse
                        completeAnswer={completeAnswer}
                        history={history}
                        match={match}
                        profile={profile}
                        banyakSoal={banyakSoal}
                        checkInComplete={checkInComplete}
                      />
                    ) : !results.uid ? (
                      <StartCourse
                        banyakSoal={banyakSoal}
                        auth={auth}
                        history={history}
                        match={match}
                        profile={profile}
                      />
                    ) : (
                      <BlockCourse results={results} />
                    )}
                  </form>
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
  //data asal
  const courses = state.firestore.ordered.courses;
  const results = state.firestore.ordered.results;
  const records = state.firestore.ordered.records;
  const selectClass = parseInt(ownProps.match.params.class);
  const auth = state.firebase.auth;
  const result = {
    ...(results &&
      results.find(d => {
        return d.uid === auth.uid;
      }))
  };

  const userAnswer =
    records &&
    records.filter(d => {
      return d.uid === auth.uid && d.class === selectClass;
    });
  const completeAnswer = userAnswer && userAnswer.length;

  const checkComplete = {
    ...(results &&
      results.find(d => {
        return (
          d.uid === auth.uid &&
          d.class === selectClass &&
          d.grade &&
          d.status === "end"
        );
      }))
  };

  const hasil = {
    ...(results &&
      results.find(d => {
        return (
          d.uid === auth.uid &&
          d.class === selectClass &&
          d.grade &&
          d.status === "end"
        );
      }))
  };

  const banyakSoal =
    courses &&
    courses.filter(d => {
      return d.class === selectClass;
    }).length;

  const checkInComplete = {
    ...(results &&
      results.find(d => {
        return (
          d.uid === auth.uid &&
          d.class === selectClass &&
          !d.grade &&
          d.status === "start"
        );
      }))
  };

  //tampilkan data
  return {
    auth: auth,
    profile: state.firebase.profile,
    classData: state.courses.class,
    completeAnswer: completeAnswer,
    userAnswer: userAnswer,
    banyakSoal: banyakSoal,
    results: result,
    selectClass: selectClass,
    hasil: hasil,
    checkInComplete: checkInComplete,
    checkComplete: checkComplete
    // check: { correct: correct, incorrect: incorrect }
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "courses" },
    { collection: "results" },
    { collection: "records" }
  ])
)(LandingCourse);
