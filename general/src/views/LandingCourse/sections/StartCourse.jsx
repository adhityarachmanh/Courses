import React from "react";
import { startCourse } from "../../../store/actions/courseAction";
import { connect } from "react-redux";
import LOAD_DATA from "../../../assets/img/load-data.gif";

class StartCourse extends React.Component {
  handleStart = () => {
    const { match, profile, auth } = this.props;
    const data = {
      nama: profile.nama,
      class: parseInt(match.params.class)
    };
    this.props.startCourse({
      ...data,
      uid: auth.uid
    });
    this.props.history.push(`/class/${parseInt(match.params.class)}/test/1`);
  };
  render() {
    const { profile, match, banyakSoal } = this.props;
    return (
      <>
        <div class="card-header card-header-info text-center">
          <h4 class="card-title">
            {profile.nama ? "Course Data" : "Please Wait..."}
          </h4>
        </div>

        <div class="card-body my-5">
          <div className="row justify-content-center">
            <div className="col text-center text-capitalize">
              {profile.nama && banyakSoal ? (
                <>  
                  <table
                    className="table "
                    data-aos="fadeIn"
                    data-aos-duration="2000"
                  >
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>:</td>
                        <td>{profile.nama ? profile.nama : ""}</td>
                      </tr>
                      <tr>
                        <td>Class</td>
                        <td>:</td>
                        <td>{banyakSoal ? match.params.class : ""}</td>
                      </tr>
                      <tr>
                        <td>Time </td>
                        <td>:</td>
                        <td>
                          {banyakSoal
                            ? Math.round((banyakSoal * 90000) / 60000) + " minutes"
                            : ""}
                        </td>
                      </tr>
                      <tr>
                        <td>Total Question </td>
                        <td>:</td>
                        <td>{banyakSoal ? banyakSoal : ""}</td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    type="button"
                    onClick={this.handleStart}
                    className="btn btn-outline-success btn-sm"
                  >
                    Start Course
                  </button>
                </>
              ) : (
                <img src={LOAD_DATA} alt="" />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    startCourse: data => dispatch(startCourse(data))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(StartCourse);
