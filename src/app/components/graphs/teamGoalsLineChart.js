import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { teamFetchData } from "../../actions/teamActions";
import { LinearProgress } from "material-ui/Progress";
import Card, { CardContent } from "material-ui/Card";
import Grid from "material-ui/Grid";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "Recharts";

const styles = theme => ({
  lineGridItem: {
    height: "300px"
  }
});


class TeamGoalsLineChart extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchTeam("https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/team_gamelogs.json?team=", this.props.selectedTeam);
  }


  render() {
    const { classes } = this.props;

    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
      return <LinearProgress color="accent" />;
    }

    return (
      <Grid item xs={6} sm={6}>
        <Card>
                <CardContent className={classes.lineGridItem}>
            <ResponsiveContainer>
              <LineChart data={this.props.teamGameLog}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="date" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="goalsFor" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="goalsAgainst" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    teamGameLog: state.teamGameLog,
    selectedTeam: state.selectedTeam,
    hasErrored: state.teamHasErrored,
    isLoading: state.teamIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTeam: (url, teamAbbr) => dispatch(teamFetchData(url, teamAbbr))
  };
};

TeamGoalsLineChart.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
) (TeamGoalsLineChart);