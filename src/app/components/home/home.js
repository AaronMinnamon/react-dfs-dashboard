import React, { Component } from "react";
import Matchups from "../matchups/matchups";

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <Matchups />
      </div>
    );
  }
}