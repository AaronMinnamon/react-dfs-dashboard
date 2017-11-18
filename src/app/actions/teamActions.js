import { apiConfig } from "../../core/api_auth";

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

export function errorAfterFiveSeconds() {
  // We return a function instead of an action object
  return (dispatch) => {
    setTimeout(() => {
      // This function is able to dispatch other action creators
      dispatch(teamsHasErrored(true));
    }, 5000);
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
      .then((response) => response.json())
      .then((items) => dispatch(teamsFetchDataSuccess(items.overallteamstandings.teamstandingsentry)))
      .catch(() => dispatch(teamsHasErrored(true)));
  };
}