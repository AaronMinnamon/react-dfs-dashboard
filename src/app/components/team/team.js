import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { teamFetchData } from "../../actions/teamActions";
import { LinearProgress } from "material-ui/Progress";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 2,
  }
});


class Team extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchTeam("https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/team_gamelogs.json?team=",this.props.selectedTeam);
  }



  render() {

    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
      return <LinearProgress color="accent" />;
    }

    return (
      <div>hii</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    team: state.team,
    selectedTeam: state.selectedTeam,
    hasErrored: state.teamHasErrored,
    isLoading: state.teamIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTeam: (url,teamAbbr) => dispatch(teamFetchData(url,teamAbbr))
  };
};

Team.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Team);