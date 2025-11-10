import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

export const connectionString = process.env.DATABASE_URL;

export const db = connectionString
  ? drizzle(neon(connectionString))
  : undefined;

