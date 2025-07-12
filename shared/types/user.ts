import { userSchema } from "@/worker/db/schema/user";

export type User = typeof userSchema.$inferSelect;
