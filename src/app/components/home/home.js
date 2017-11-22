import React, { Component } from "react";
import Matchups from "../matchups/matchups";
import Teams from "../teams/teams";

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <Matchups />
        <Teams />
      </div>
    );
  }
}