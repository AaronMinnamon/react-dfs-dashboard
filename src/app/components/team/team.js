import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { TableCell } from "material-ui";
import { teamFetchData } from "../../actions/teamActions";
import TeamLink from "../links/TeamLink";
import { LinearProgress } from "material-ui/Progress";
import {
  SortingState, SelectionState, FilteringState, GroupingState,
  LocalFiltering, LocalGrouping, LocalSorting,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  VirtualTableView, TableHeaderRow, TableFilterRow, TableSelection, TableGroupRow,
  GroupingPanel, DragDropContext, TableColumnReordering,
} from "@devexpress/dx-react-grid-material-ui";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 2,
  }
});


class Team extends Component {

  componentDidMount() {
    this.props.fetchTeam("https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/team_gamelogs.json?team=BOS");
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
    hasErrored: state.teamHasErrored,
    isLoading: state.teamIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTeam: (url) => dispatch(teamFetchData(url))
  };
};

Team.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Team);