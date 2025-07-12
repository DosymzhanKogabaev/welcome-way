import { RouterOpenApiType } from "../types";

export type RegisterAppRoutes = (
  router: RouterOpenApiType,
  urlPrefix?: string | null
) => void;
