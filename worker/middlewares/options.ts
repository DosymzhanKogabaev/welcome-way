import { NextFunction } from "../middlewareComposer";

export async function optionsMiddleware(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
  next: NextFunction
) {
  if (request.method === "OPTIONS") {
    const optionsret = {
      headers: {
        "access-control-allow-credentials": "true",
        "access-control-allow-headers": "*",
        "access-control-allow-methods":
          "DELETE, GET, OPTIONS, PATCH, POST, PUT, HEAD",
        "access-control-allow-origin": "*",
        "access-control-expose-headers": "*",
        "access-control-max-age": "86400",
        "content-type": "text/html; charset=utf-8",
        "cross-origin-opener-policy": "same-origin",
        vary: "origin",
        "x-wcache-hit": "options",
        "x-content-type-options": "nosniff",
      },
      status: 200,
    };

    return new Response(null, optionsret);
  }

  return next(request, env, ctx);
}
