import React from "react";
import { NavLink } from "react-router-dom";

const TeamLink = ({ value, row, clickTeam }) => (
  <NavLink
    to={`/teams/${row.team.Abbreviation}`}
    onClick={() => clickTeam(row.team.Abbreviation)}
  >
    {value}
  </NavLink>
);

export default TeamLink;