import { fromIttyRouter } from "chanfana";
import { registerAppRoutes } from "./appUrls";
import { Router } from "itty-router";
import { RouterOpenApiType, RouterTypeItty } from "../types";

const _router: RouterTypeItty = Router();
const router: RouterOpenApiType = fromIttyRouter(_router);
router.registry.registerComponent("securitySchemes", "BearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

// Регистрируем все маршруты
registerAppRoutes(router, "/api");
export default router;
