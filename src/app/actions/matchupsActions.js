import { apiConfig } from "../../core/api_auth";

export function matchupsHasErrored(bool) {
  return {
    type: "MATCHUPS_HAS_ERRORED",
    hasErrored: bool
  };
}

export function matchupsIsLoading(bool) {
  return {
    type: "MATCHUPS_IS_LOADING",
    isLoading: bool
  };
}

export function matchupsFetchDataSuccess(matchups) {
  return {
    type: "MATCHUPS_FETCH_DATA_SUCCESS",
    matchups
  };
}

export function errorAfterFiveSeconds() {
  // We return a function instead of an action object
  return (dispatch) => {
    setTimeout(() => {
      // This function is able to dispatch other action creators
      dispatch(matchupsHasErrored(true));
    }, 5000);
  };
}

export function matchupsFetchData(url) {
  return (dispatch) => {
    dispatch(matchupsIsLoading(true));

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

        dispatch(matchupsIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((items) => dispatch(matchupsFetchDataSuccess(items.dailygameschedule.gameentry)))
      .catch(() => dispatch(matchupsHasErrored(true)));
  };
}