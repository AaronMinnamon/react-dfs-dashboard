import { apiConfig } from "../../core/api_auth";
import { processData } from "../../core/helpers"; 

export function teamsHasErrored(bool) {
  return {
    type: "TEAMS_HAS_ERRORED",
    hasErrored: bool
  };
}

export function teamsIsLoading(bool) {
  return {
    type: "TEAMS_IS_LOADING",
    isLoading: bool
  };
}

export function teamsFetchDataSuccess(teams) {
  return {
    type: "TEAMS_FETCH_DATA_SUCCESS",
    teams
  };
}

export function teamsFetchData(url) {
  return (dispatch) => {
    dispatch(teamsIsLoading(true));

    fetch(url,{
      headers: {
        "Content-Type": "text/plain",
        "Authorization": "Basic " + btoa( apiConfig.username + ":" + apiConfig.password),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(teamsIsLoading(false));
        return response;
      })
      .then(
        (response) => response.json()
      )
      .then(
        (items) => dispatch(teamsFetchDataSuccess(items.overallteamstandings.teamstandingsentry)),
        (error) => dispatch(teamsHasErrored(true, error))
      );
  };
}

export function selectTeam(team) {
  return {
    type: "SELECT_TEAM",
    team
  };
}

export function teamHasErrored(bool) {
  return {
    type: "TEAM_HAS_ERRORED",
    hasErrored: bool
  };
}

export function teamIsLoading(bool) {
  return {
    type: "TEAM_IS_LOADING",
    isLoading: bool
  };
}

export function teamFetchDataSuccess(teamGameLog) {
  return {
    type: "TEAM_FETCH_DATA_SUCCESS",
    teamGameLog
  };
}

export function errorAfterFiveSeconds() {
  // We return a function instead of an action object
  return (dispatch) => {
    setTimeout(() => {
      // This function is able to dispatch other action creators
      dispatch(teamHasErrored(true));
    }, 5000);
  };
}

export function teamFetchData(baseUrl,teamAbbr) {
  return (dispatch) => {
    dispatch(teamIsLoading(true));

    fetch(baseUrl + teamAbbr, {
      headers: {
        "Content-Type": "text/plain",
        "Authorization": "Basic " + btoa(apiConfig.username + ":" + apiConfig.password),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(teamIsLoading(false));
        return response;
      })
      .then(
        (response) => response.json()
      )
      .then(
        (data) => dispatch(teamFetchDataSuccess(processData(data.teamgamelogs.gamelogs))),
        (error) => dispatch(teamsHasErrored(true, error))
      );
  };
}