import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { TableCell } from "material-ui";
import { teamsFetchData, selectTeam } from "../../actions/teamActions";
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

const getRowId = row => row.rank;

class Teams extends Component {

  componentDidMount() {
    this.props.fetchTeams("https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/overall_team_standings.json?teamstats=W,L,GF,GA,Pts");
  }

  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          name: "rank",
          title: "Rank",
          getCellValue: row => (row.rank ? parseInt(row.rank) : undefined)
        },
        {
          name: "city",
          title: "City",
          getCellValue: row => (row.team.City ? row.team.City : undefined),
        },
        {
          name: "name",
          title: "Name",
          getCellValue: row => (row.team.Name ? row.team.Name : undefined),
        },
        {
          name: "wins",
          title: "Wins",
          getCellValue: row => (row.stats.stats.Wins["#text"] ? parseInt(row.stats.stats.Wins["#text"]) : undefined)
        },
        {
          name: "losses",
          title: "Losses",
          getCellValue: row => (row.stats.stats.Losses["#text"] ? parseInt(row.stats.stats.Losses["#text"]) : undefined)
        },
        {
          name: "gamesPlayed",
          title: "GP",
          getCellValue: row => (row.stats.GamesPlayed["#text"] ? parseInt(row.stats.GamesPlayed["#text"]) : undefined)
        },
        {
          name: "goalsFor",
          title: "GF",
          getCellValue: row => (row.stats.stats.GoalsFor["#text"] ? parseInt(row.stats.stats.GoalsFor["#text"]) : undefined)
        },
        {
          name: "goalsAgainst",
          title: "GA",
          getCellValue: row => (row.stats.stats.GoalsAgainst["#text"] ? parseInt(row.stats.stats.GoalsAgainst["#text"]) : undefined)
        },
        {
          name: "points",
          title: "Points",
          getCellValue: row => (row.stats.stats.Points["#text"] ? parseInt(row.stats.stats.Points["#text"]) : undefined)
        },
      ],
      rows: this.props.teams,
    };

    this.tableCellTemplate = ({ value, row, column }) => {
      if(column.name === "city"){
        return <TableCell >
          <TeamLink clickTeam={this.props.clickTeam} row={row} value={value}></TeamLink>
        </TableCell>;
      }
      return undefined;
    };

  }



  render() {

    const { columns } = this.state;


    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
      return <LinearProgress color="accent" />;
    }

    return ( 
      <Grid
        rows={this.props.teams}
        columns={columns}
        getRowId={getRowId}
      >
        <DragDropContext />

        <FilteringState
          defaultFilters={[{ columnName: "name", value: "" }]}
        />
        <SortingState
          defaultSorting={[
            { columnName: "rank", direction: "asc" },
          ]}
        />

        <LocalFiltering />
        <LocalSorting />

        <SelectionState />

        <VirtualTableView
          tableCellTemplate={this.tableCellTemplate}
        />
        <TableHeaderRow allowSorting allowDragging />
        <TableColumnReordering defaultOrder={columns.map(column => column.name)} />
        <TableFilterRow />
        <TableSelection />

      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    teams: state.teams,
    hasErrored: state.teamsHasErrored,
    isLoading: state.teamsIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTeams: (url) => dispatch(teamsFetchData(url)),
    clickTeam: (teamAbbreviation) => dispatch(selectTeam(teamAbbreviation))
  };
};

Teams.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Teams);