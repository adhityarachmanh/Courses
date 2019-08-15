import React from "react";
import { connect } from "react-redux";
import TrResults from "./TrResults";

class SearchResults extends React.Component {
  render() {
    const { newResults, match } = this.props;

    return (
      <>
        {newResults.map((d, i) => {
          return <TrResults match={match} i={i} key={i} d={d} />;
        })}
      </>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const results = ownProps.results;
  const filterResults = results.filter(d => {
    if (ownProps.searchVal.toLowerCase().length === 1) {
      return (
        d.grade.toLowerCase().indexOf(ownProps.searchVal.toLowerCase()) > -1
      );
    } else {
      return (
        d.nama.toLowerCase().indexOf(ownProps.searchVal.toLowerCase()) > -1
      );
    }
  });
  return {
    newResults: filterResults
  };
};
export default connect(mapStateToProps)(SearchResults);
