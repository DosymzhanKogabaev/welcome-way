import { handleError } from "@/worker/apps/common/handleError";
import { OpenAPIRoute } from "chanfana";
import { IRequest } from "itty-router";

export class PublicTestApi extends OpenAPIRoute {
  async handle(_request: IRequest, _env: Env, _ctx: ExecutionContext) {
    try {
      return Response.json({ message: "Hello, world!" });
    } catch (error) {
      return handleError(error);
    }
  }
}
