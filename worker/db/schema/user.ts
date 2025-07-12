import { real, sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const userSchema = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
  full_name: text('full_name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone'),
  password_hash: text('password_hash'),
  language: text('language').notNull(),
  country_of_origin: text('country_of_origin'),
  current_location: text('current_location'),
  coordinates_lat: real('coordinates_lat'),
  coordinates_lng: real('coordinates_lng'),
  user_type: text('user_type').notNull(),
  can_offer_help: integer('can_offer_help').default(0),
  help_categories: text('help_categories'),
  reputation_score: integer('reputation_score').default(0),
  verified: integer('verified').default(0),
  created_at: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
  updated_at: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
});
