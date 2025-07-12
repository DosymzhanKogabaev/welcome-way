import { registerAuthRoutes } from "./auth/urls";
import { RegisterAppRoutes } from "./types";

export const registerAppRoutes: RegisterAppRoutes = (
  router,
  urlPrefix = null
) => {
  registerAuthRoutes(router, urlPrefix);
};
