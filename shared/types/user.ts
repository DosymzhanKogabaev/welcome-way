import { userSchema } from "@/worker/db/schema/user";

export type User = typeof userSchema.$inferSelect;

export type UserInfo = {
  id: number;
  full_name: string;
  email: string;
  phone: string | null;
  language: string;
  country_of_origin: string | null;
  current_location: string | null;
  coordinates_lat: number | null;
  coordinates_lng: number | null;
  user_type: string;
  can_offer_help: boolean;
  help_categories: string | null;
  reputation_score: number;
  verified: boolean;
  created_at: number;
  updated_at: number;
};