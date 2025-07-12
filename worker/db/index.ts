import { drizzle } from "drizzle-orm/d1";

export const initDbConnect = (env: Env) => {
  return drizzle(env.DB_D1);
};
