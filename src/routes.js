import { configureRoutes } from "./core/utils/bundler";

// routes
import * as Teams from "./pages/teams";
import * as Home from "./pages/home";
import * as Matchups from "./pages/matchups";
import * as Players from "./pages/players";

export default configureRoutes([
  Home,
  Teams,
  Matchups,
  Players
]);