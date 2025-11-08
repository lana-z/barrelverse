import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const courses = pgTable("courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  image: text("image"),
  category: text("category").notNull(), // 'masterclass' | 'video' | 'membership'
  duration: text("duration"), // e.g., "2 hours" or "Self-paced"
  level: text("level"), // 'beginner' | 'intermediate' | 'advanced'
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const experiences = pgTable("experiences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  image: text("image"),
  date: timestamp("date"),
  location: text("location"),
  maxAttendees: integer("max_attendees"),
  currentAttendees: integer("current_attendees").notNull().default(0),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const purchases = pgTable("purchases", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  itemType: text("item_type").notNull(), // 'course' | 'experience'
  itemId: varchar("item_id").notNull(), // references courses.id or experiences.id
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  stripePaymentId: text("stripe_payment_id"),
  status: text("status").notNull().default("completed"), // 'pending' | 'completed' | 'refunded'
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
}).omit({ id: true, createdAt: true });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const insertCourseSchema = createInsertSchema(courses, {
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/),
  category: z.enum(["masterclass", "video", "membership"]),
  level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const insertExperienceSchema = createInsertSchema(experiences, {
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/),
}).omit({ id: true, createdAt: true, updatedAt: true, currentAttendees: true });

export const insertPurchaseSchema = createInsertSchema(purchases, {
  itemType: z.enum(["course", "experience"]),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/),
}).omit({ id: true, createdAt: true });

// TypeScript types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type LoginCredentials = z.infer<typeof loginSchema>;

export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof courses.$inferSelect;

export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type Experience = typeof experiences.$inferSelect;

export type InsertPurchase = z.infer<typeof insertPurchaseSchema>;
export type Purchase = typeof purchases.$inferSelect;
