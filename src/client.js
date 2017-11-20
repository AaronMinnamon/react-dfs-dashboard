import { trackPageView } from "./core/utils/analytics";
import "typeface-roboto";
export const reduxInitialState = {};
export const reduxReducers = null;
export const onPageChange = function() {
  trackPageView().catch();
};

if (module.hot) module.hot.accept();