import { User } from '@/shared/types/user';
import { RegisterUserRequest } from '@/shared/types/register';
import { InvalidCredentialsException } from '@/worker/apps/auth/exceptions/user';
import { initDbConnect } from '@/worker/db';
import { userSchema } from '@/worker/db/schema/user';
import { eq } from 'drizzle-orm';

interface GeographicData {
  country: string | null;
  region: string | null;
  coordinates_lat: number | null;
  coordinates_lng: number | null;
}

export async function createUser(
  env: Env,
  userData: RegisterUserRequest,
  geographicData?: GeographicData
) {
  const db = initDbConnect(env);
  const [user] = await db
    .insert(userSchema)
    .values({
      full_name: userData.full_name,
      email: userData.email,
      password_hash: userData.password,
      language: userData.language,
      user_type: 'newcomer',
      country: geographicData?.country,
      region: geographicData?.region,
      coordinates_lat: geographicData?.coordinates_lat,
      coordinates_lng: geographicData?.coordinates_lng,
    })
    .returning();
  return user;
}

export async function getUserByEmail(env: Env, email: string) {
  const db = initDbConnect(env);
  const [user] = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.email, email))
    .limit(1);
  return user;
}

export async function verifyUser(env: Env, email: string, password: string) {
  const db = initDbConnect(env);
  const [user] = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.email, email))
    .limit(1);

  if (!user || user.password_hash !== password) {
    throw new InvalidCredentialsException();
  }
  return user;
}

export async function getUserById(env: Env, id: number): Promise<User> {
  const db = initDbConnect(env);
  const [user] = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.id, id))
    .limit(1);
  return user;
}
