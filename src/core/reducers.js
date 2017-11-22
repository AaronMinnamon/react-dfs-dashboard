export * from "./components/screen/reducer";
export * from "./libs/network/reducer";

export function selectedTeam(state = null, action) {
  switch (action.type) {
    case "SELECT_TEAM":
      return action.team;

    default:
      return state;
  }
}

export function teamsHasErrored(state = false, action) {
  switch (action.type) {
    case "TEAMS_HAS_ERRORED":
      return action.hasErrored;

    default:
      return state;
  }
}

export function teamsIsLoading(state = false, action) {
  switch (action.type) {
    case "TEAMS_IS_LOADING":
      return action.isLoading;

    default:
      return state;
  }
}

export function teams(state = [], action) {
  switch (action.type) {
    case "TEAMS_FETCH_DATA_SUCCESS":
      return action.teams;

    default:
      return state;
  }
}

export function matchupsHasErrored(state = false, action) {
  switch (action.type) {
    case "MATCHUPS_HAS_ERRORED":
      return action.hasErrored;

    default:
      return state;
  }
}

export function matchupsIsLoading(state = false, action) {
  switch (action.type) {
    case "MATCHUPS_IS_LOADING":
      return action.isLoading;

    default:
      return state;
  }
}

export function matchups(state = [], action) {
  switch (action.type) {
    case "MATCHUPS_FETCH_DATA_SUCCESS":
      return action.matchups;

    default:
      return state;
  }
}

export function playersHasErrored(state = false, action) {
  switch (action.type) {
    case "PLAYERS_HAS_ERRORED":
      return action.hasErrored;

    default:
      return state;
  }
}

export function playersIsLoading(state = false, action) {
  switch (action.type) {
    case "PLAYERS_IS_LOADING":
      return action.isLoading;

    default:
      return state;
  }
}

export function players(state = [], action) {
  switch (action.type) {
    case "PLAYERS_FETCH_DATA_SUCCESS":
      return action.players;

    default:
      return state;
  }
}

export function teamHasErrored(state = false, action) {
  switch (action.type) {
    case "TEAM_HAS_ERRORED":
      return action.hasErrored;

    default:
      return state;
  }
}

export function teamIsLoading(state = false, action) {
  switch (action.type) {
    case "TEAM_IS_LOADING":
      return action.isLoading;

    default:
      return state;
  }
}

export function team(state = [], action) {
  switch (action.type) {
    case "TEAM_FETCH_DATA_SUCCESS":
      return action.team;

    default:
      return state;
  }
}