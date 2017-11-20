import React, { Component } from "react";
import { connect } from "react-redux";
import { teamsFetchData } from "../../actions/teamActions";
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";
import { CircularProgress } from "material-ui/Progress";

class Teams extends Component {
  componentDidMount() {
    this.props.fetchTeams("https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/overall_team_standings.json?teamstats=W,L,GF,GA,Pts");
  }

  render() {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
      return <CircularProgress size={60} thickness={7} />;
    }

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Abbreviation</TableCell>
            <TableCell>Games Played</TableCell>
            <TableCell>Wins</TableCell>
            <TableCell>Losses</TableCell>
            <TableCell>GF</TableCell>
            <TableCell>GA</TableCell>
            <TableCell>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.teams.map((item) => (
            <TableRow key={item.team.ID}>
              <TableCell>{item.rank}</TableCell>
              <TableCell>{item.team.City}</TableCell>
              <TableCell>{item.team.Name}</TableCell>
              <TableCell>{item.team.Abbreviation}</TableCell>
              <TableCell>{item.stats.GamesPlayed["#text"]}</TableCell>
              <TableCell>{item.stats.stats.Wins["#text"]}</TableCell>
              <TableCell>{item.stats.stats.Losses["#text"]}</TableCell>
              <TableCell>{item.stats.stats.GoalsFor["#text"]}</TableCell>
              <TableCell>{item.stats.stats.GoalsAgainst["#text"]}</TableCell>
              <TableCell>{item.stats.stats.Points["#text"]}</TableCell>
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