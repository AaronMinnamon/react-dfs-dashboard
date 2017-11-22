import { apiConfig } from "../../core/api_auth";

export function playersHasErrored(bool) {
  return {
    type: "PLAYERS_HAS_ERRORED",
    hasErrored: bool
  };
}

export function playersIsLoading(bool) {
  return {
    type: "PLAYERS_IS_LOADING",
    isLoading: bool
  };
}

export function playersFetchDataSuccess(players) {
  return {
    type: "PLAYERS_FETCH_DATA_SUCCESS",
    players
  };
}

export function errorAfterFiveSeconds() {
  // We return a function instead of an action object
  return (dispatch) => {
    setTimeout(() => {
      // This function is able to dispatch other action creators
      dispatch(playersHasErrored(true));
    }, 5000);
  };
}

export function playersFetchData(url) {
  return (dispatch) => {
    dispatch(playersIsLoading(true));

    fetch(url, {
      headers: {
        "Content-Type": "text/plain",
        "Authorization": "Basic " + btoa(apiConfig.username + ":" + apiConfig.password),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(playersIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((items) => dispatch(playersFetchDataSuccess(items.rosterplayers.playerentry)))
      .catch(() => dispatch(playersHasErrored(true)));
  };
}