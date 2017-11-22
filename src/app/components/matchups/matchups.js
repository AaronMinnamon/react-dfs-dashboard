import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { matchupsFetchData } from "../../actions/matchupsActions";
import { LinearProgress } from "material-ui/Progress";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, {  CardContent } from "material-ui/Card";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit * 2,
  }
});

class Matchups extends Component {
  componentDidMount() {
    this.props.fetchMatchups("https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/daily_game_schedule.json?fordate=20171121");
  }
  state = {
    direction: "row",
    justify: "center",
    alignItems: "center",
  };


  render() {
    const { classes } = this.props;
    const { alignItems, direction, justify } = this.state;

    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
      return <LinearProgress color="accent" />;
    }

    return (
      <div className={classes.root}>
        <Grid container alignItems={alignItems} justify={justify} spacing={8}>
          {this.props.matchups.map((match) => (
            <Grid item xs={6} sm={2} key={match.id}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography type="body1" align="center">
                    {match.awayTeam.Abbreviation} @ {match.homeTeam.Abbreviation}
                  </Typography>
                  <Typography type="body2" align="center" >
                    { match.location}
                  </Typography>
                  <Typography type="caption" align="center" gutterBottom>
                    { match.time } 
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    matchups: state.matchups,
    hasErrored: state.matchupsHasErrored,
    isLoading: state.matchupsIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMatchups: (url) => dispatch(matchupsFetchData(url))
  };
};

Matchups.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Matchups);