import React from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import { connect } from "react-redux";

class ScoreCourse extends React.Component {
  componentDidMount() {
    AOS.init();
  }

  render() {
    const { profile, match, check, checkComplete } = this.props;

    return (
      <>
        <div class="card-header card-header-info text-center">
          <h4 class="card-title">Score Course</h4>
        </div>

        <div class="card-body my-5">
          <div className="row justify-content-center">
            <h3 data-aos="fade-right" data-aos-duration="1500">
              Grade
            </h3>
            <h1 data-aos="fade-left" data-aos-duration="1500">
              {checkComplete.grade}
            </h1>
          </div>
          <div className="col text-center text-capitalize">
            <table
              className="table "
              data-aos="fadeIn"
              data-aos-duration="1500"
            >
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>:</td>
                  <td>{profile.nama}</td>
                </tr>
                <tr>
                  <td>Class</td>
                  <td>:</td>
                  <td>{match.params.class}</td>
                </tr>
                <tr>
                  <td>Correct</td>
                  <td>:</td>
                  <td>{check.correct}</td>
                </tr>
                <tr>
                  <td>Incorrect</td>
                  <td>:</td>
                  <td>{check.inCorrect}</td>
                </tr>
              </tbody>
            </table>
            <Link
              to={`/check-record/class/${parseInt(match.params.class)}`}
              type="button"
              className="btn btn-outline-success btn-sm"
            >
              Check Record
            </Link>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const banyakSoal = ownProps.banyakSoal;
  const userAnswer = ownProps.userAnswer;
  const findCorrect =
    userAnswer &&
    userAnswer.filter(d => {
      return d.check === "correct";
    });
  const correct = findCorrect && findCorrect.length;
  const inCorrect = correct && Math.round(banyakSoal - correct);

  console.log(inCorrect);
  return {
    check: { correct: correct, inCorrect: inCorrect }
  };
};
export default connect(mapStateToProps)(ScoreCourse);
