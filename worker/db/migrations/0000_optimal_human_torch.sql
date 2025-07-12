CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
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
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);