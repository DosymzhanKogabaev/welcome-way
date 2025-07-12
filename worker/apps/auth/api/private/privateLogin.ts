import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { IRequest } from "itty-router";
import { LoginUserRequest, LoginUserResponse } from "@/shared/types/login";
import { handleError } from "@/worker/apps/common/handleError";
import { verifyUser } from "@/worker/apps/auth/services/user";
import { generateTokens } from "@/worker/apps/auth/services/jwt";

const REQUEST_BODY_SCHEMA = z.object({
  email: z.string(),
  password: z.string(),
}) satisfies z.ZodType<LoginUserRequest>;

const RESPONSE_SCHEMA = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
}) satisfies z.ZodType<LoginUserResponse>;

export class PrivateLoginAPI extends OpenAPIRoute {
  schema = {
    request: {
      body: {
        content: {
          "application/json": {
            schema: REQUEST_BODY_SCHEMA,
          },
        },
      },
    },
    response: {
      "200": {
        content: {
          "application/json": {
            schema: RESPONSE_SCHEMA,
          },
        },
      },
    },
  } as any;

  async handle(_request: IRequest, env: Env, _ctx: ExecutionContext) {
    try {
      const data = await this.getValidatedData<typeof this.schema>();
      const userData = { ...(data.body as unknown as LoginUserRequest) };

      const user = await verifyUser(env, userData.email, userData.password);
      const tokens = await generateTokens(env, user);

      return Response.json({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      });
    } catch (error) {
      return handleError(error);
    }
  }
}
