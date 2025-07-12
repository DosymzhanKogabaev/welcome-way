PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`password_hash` text,
	`language` text NOT NULL,
	`country_of_origin` text,
	`current_location` text,
	`coordinates_lat` real,
	`coordinates_lng` real,
	`user_type` text NOT NULL,
	`can_offer_help` integer DEFAULT 0,
	`help_categories` text,
	`reputation_score` integer DEFAULT 0,
	`verified` integer DEFAULT 0,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "full_name", "email", "phone", "password_hash", "language", "country_of_origin", "current_location", "coordinates_lat", "coordinates_lng", "user_type", "can_offer_help", "help_categories", "reputation_score", "verified", "created_at", "updated_at") SELECT "id", "full_name", "email", "phone", "password_hash", "language", "country_of_origin", "current_location", "coordinates_lat", "coordinates_lng", "user_type", "can_offer_help", "help_categories", "reputation_score", "verified", "created_at", "updated_at" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);