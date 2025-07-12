import { RouterOpenApiType } from "../../types";
import { RegisterAppRoutes } from "../types";
import { PrivateLoginAPI, PrivateRegisterAPI } from "./api/private";
import { PublicTestApi } from "./api/public/testApi";

export const registerAuthRoutes: RegisterAppRoutes = (
  router: RouterOpenApiType,
  urlPrefix = null
) => {
  router.get(`${urlPrefix}/auth/test`, PublicTestApi);
  router.post(`${urlPrefix}/auth/register`, PrivateRegisterAPI);
  router.post(`${urlPrefix}/auth/login`, PrivateLoginAPI);
};
