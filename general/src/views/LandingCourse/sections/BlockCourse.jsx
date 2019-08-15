import React from "react";
import sad from "../../../assets/img/sad.png";
import { Link } from "react-router-dom";

class BlockCourse extends React.Component {
  render() {
    const { results } = this.props;
    
    return (
      <>
        <div class="card-header card-header-danger text-center ">
          <h4 class="card-title">Sorry!!!</h4>
        </div>

        <div class="card-body ">
          <div className="container">
            <img width="100%" height="300px" src={sad} alt="" />
          </div>
          <div className="row justify-content-center ">
            <h3>You have done the test in another class!!! </h3>
          </div>
          <div className="col text-center text-capitalize">
            
            <Link
              to={`/check-record/class/${parseInt(results.class)}`}
              className="btn btn-info btn-sm mr-auto"
            >
              History Test
            </Link>
          </div>
        </div>
      </>
    );
  }
}
export default BlockCourse;
