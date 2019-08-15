import React from "react";

import Countdown from "react-countdown-now";

class ContinuesCourse extends React.Component {
  handleContinues = () => {
    const { match } = this.props;

    this.props.history.push(`/class/${parseInt(match.params.class)}/test/1`);
  };

  render() {
    const {
      profile,
      match,
      banyakSoal,
      completeAnswer,
      checkInComplete
    } = this.props;
    const waktu =
      checkInComplete && checkInComplete.end_course - new Date().getTime();

    return (
      <>
        <div class="card-header card-header-info text-center">
          <h4 class="card-title">Course Data</h4>
        </div>

        <div class="card-body my-5">
          <div className="row justify-content-center" />
          <div className="col text-center text-capitalize">
            <table className="table ">
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
                  <td>Time Left</td>
                  <td>:</td>
                  <td>
                    <Countdown daysInHours={true} date={Date.now() + waktu} />
                  </td>
                </tr>
                <tr>
                  <td>User Answer </td>
                  <td>:</td>
                  <td>{completeAnswer}</td>
                </tr>
                <tr>
                  <td>Total Question </td>
                  <td>:</td>
                  <td>{banyakSoal}</td>
                </tr>
              </tbody>
            </table>
            <button
              type="button"
              onClick={this.handleContinues}
              className="btn btn-outline-success btn-sm"
            >
              Continue Course
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default ContinuesCourse;
