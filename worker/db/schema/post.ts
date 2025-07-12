import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { userSchema } from './user';

export const postSchema = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
  author_id: integer('author_id')
    .references(() => userSchema.id)
    .notNull(),
  type: text('type').notNull(),
  text: text('text').notNull(),
  created_at: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
  updated_at: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
});
