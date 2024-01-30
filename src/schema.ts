import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: text('username').notNull(),
    email: text('email').notNull(),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
    password: text('password').notNull(),
    salt: text('salt'),
    sessiontoken: text('sessiontoken'),
});



