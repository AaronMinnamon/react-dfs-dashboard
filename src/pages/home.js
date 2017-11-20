import Home from "../app/components/home/home";
import DefaultLayout from "../app/components/layout/layout";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
    layout: DefaultLayout,
  }
];
export default routes;
