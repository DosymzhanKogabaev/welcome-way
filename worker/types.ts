import { IttyRouterOpenAPIRouterType } from "chanfana";
import { IRequest, RouterType } from "itty-router";

export type RouterTypeItty = RouterType<IRequest, any[], any>;

export type RouterOpenApiType = RouterTypeItty &
  IttyRouterOpenAPIRouterType<RouterTypeItty>;
