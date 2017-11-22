import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { playersFetchData } from "../../actions/playerActions";
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

const getRowId = row => row.player.ID;

class Players extends Component {

  componentDidMount() {
    this.props.fetchPlayers("https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/roster_players.json?fordate=20171118");
  }

  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          name: "team",
          title: "Team",
          getCellValue: row => (row.team ? row.team.City : undefined)
        },
        {
          name: "first",
          title: "First",
          getCellValue: row => (row.player.FirstName ? row.player.FirstName : undefined)
        },
        {
          name: "last",
          title: "Last",
          getCellValue: row => (row.player.LastName ? row.player.LastName : undefined)
        },
        {
          name: "age",
          title: "Age",
          getCellValue: row => (parseInt(row.player.Age) ? row.player.Age : undefined)
        },
        {
          name: "position",
          title: "Position",
          getCellValue: row => (row.player.Position ? row.player.Position : undefined)
        },
      ],
      rows: this.props.players,
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

    return (<Grid
      rows={this.props.players}
      columns={columns}
      getRowId={getRowId}
    >
      <DragDropContext />

      <FilteringState
        defaultFilters={[{ columnName: "position", value: "" }]}
      />
      <SortingState
        defaultSorting={[
          { columnName: "position", direction: "asc" },
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
    players: state.players,
    hasErrored: state.playersHasErrored,
    isLoading: state.playersIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPlayers: (url) => dispatch(playersFetchData(url))
  };
};

Players.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Players);