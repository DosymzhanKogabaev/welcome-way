export type Middleware = (
  request: Request,
  env: Env,
  ctx: ExecutionContext,
  next: NextFunction
) => Promise<Response | null>;
export type NextFunction = (
  request: Request,
  env: Env,
  ctx: ExecutionContext
) => Promise<Response | null>;

export function composeMiddlewares(
  middlewares: Middleware[],
  apiHandler: (
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ) => Promise<Response | null>
) {
  return async (request: Request, env: Env, ctx: ExecutionContext) => {
    let currentIndex = 0;
    const executeMiddleware: NextFunction = async (req, env, ctx) => {
      if (currentIndex === middlewares.length) {
        return apiHandler(req, env, ctx);
      }
      const middleware = middlewares[currentIndex];
      currentIndex++;

      return middleware(req, env, ctx, executeMiddleware);
    };

    return executeMiddleware(request, env, ctx);
  };
}
