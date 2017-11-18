import React, { Component } from "react";
import { connect } from "react-redux";
import { teamsFetchData } from "../../actions/teamActions";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from "material-ui/Table";

class Teams extends Component {
  componentDidMount() {
    this.props.fetchTeams("https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/overall_team_standings.json?teamstats=W,L,GF,GA,Pts");
  }

  render() {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }

    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Rank</TableHeaderColumn>
            <TableHeaderColumn>City</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Abbreviation</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.props.teams.map((item) => (
            <TableRow key={item.team.ID}>
              <TableRowColumn>{item.rank}</TableRowColumn>
              <TableRowColumn>{item.team.City}</TableRowColumn>
              <TableRowColumn>{item.team.Name}</TableRowColumn>
              <TableRowColumn>{item.team.Abbreviation}</TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
    fetchTeams: (url) => dispatch(teamsFetchData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Teams);