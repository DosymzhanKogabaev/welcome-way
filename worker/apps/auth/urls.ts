import { RouterOpenApiType } from "../../types";
import { RegisterAppRoutes } from "../types";
import { PublicTestApi } from "./api/public/testApi";

export const registerAuthRoutes: RegisterAppRoutes = (
  router: RouterOpenApiType,
  urlPrefix = null
) => {
  router.get(`${urlPrefix}/auth/test`, PublicTestApi);
};
