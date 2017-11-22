import Teams from "../app/components/teams/teams";
import Team from "../app/components/team/team";

const routes = [
  {
    path: "/teams",
    exact: true,
    component: Teams
  },
  {
    path: "/teams/:team",
    component: Team
  }
];
export default routes;