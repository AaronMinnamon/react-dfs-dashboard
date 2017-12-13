import React, { Component } from "react";
import { compose } from "recompose";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Card, { CardContent } from "material-ui/Card";
import TeamGoalsLineChart from "../graphs/teamGoalsLineChart";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 2,
  }
});


class Team extends Component {

  state = {
    direction: "row",
    justify: "center",
    alignItems: "center",
  };

  render() {
    
    const { classes } = this.props;
    const { alignItems, direction, justify } = this.state;

    return (
      <div className={classes.root}>
        <Grid container alignItems={alignItems} justify={justify} spacing={8}>
          <TeamGoalsLineChart />
        </Grid>
      </div>
    );
  }
}

Team.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default compose(
  withStyles(styles)
)(Team);