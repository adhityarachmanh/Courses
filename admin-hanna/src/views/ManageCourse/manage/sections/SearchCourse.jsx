import React from "react";
import { connect } from "react-redux";
import TrTempalte from "./TrTempalte";

class SearchCourse extends React.Component {
  render() {
    const { newCourses, match } = this.props;

    return (
      <>
        {newCourses.map((d, i) => {
          return <TrTempalte match={match} key={i} d={d} />;
        })}
      </>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const courses = ownProps.courses;
  const filterCourses = courses.filter(d => {
    return (
      d.question.toLowerCase().indexOf(ownProps.searchVal.toLowerCase()) > -1 ||
      d.answer.toLowerCase().indexOf(ownProps.searchVal.toLowerCase()) > -1 ||
      d.no === parseInt(ownProps.searchVal)
    );
  });
  return {
    newCourses: filterCourses
  };
};
export default connect(mapStateToProps)(SearchCourse);
