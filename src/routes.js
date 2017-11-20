import { configureRoutes } from "./core/utils/bundler";

// routes
import * as Teams from "./pages/teams";
import * as Home from "./pages/home";

export default configureRoutes([
  Home,
  Teams
]);