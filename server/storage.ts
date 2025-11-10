import { 
  users,
  courses,
  experiences,
  purchases,
  type User, 
  type InsertUser,
  type Course,
  type InsertCourse,
  type Experience,
  type InsertExperience,
  type Purchase,
  type InsertPurchase
} from "@shared/schema";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { db as drizzleDb } from "./db";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Course methods
  getAllCourses(): Promise<Course[]>;
  getPublishedCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: string, course: Partial<InsertCourse>): Promise<Course | undefined>;
  deleteCourse(id: string): Promise<boolean>;
  
  // Experience methods
  getAllExperiences(): Promise<Experience[]>;
  getPublishedExperiences(): Promise<Experience[]>;
  getExperience(id: string): Promise<Experience | undefined>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  updateExperience(id: string, experience: Partial<InsertExperience>): Promise<Experience | undefined>;
  deleteExperience(id: string): Promise<boolean>;
  
  // Purchase methods
  createPurchase(purchase: InsertPurchase): Promise<Purchase>;
  getUserPurchases(userId: string): Promise<Purchase[]>;
  getPurchase(id: string): Promise<Purchase | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private courses: Map<string, Course>;
  private experiences: Map<string, Experience>;
  private purchases: Map<string, Purchase>;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.experiences = new Map();
    this.purchases = new Map();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      isAdmin: insertUser.isAdmin ?? false,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Course methods
  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getPublishedCourses(): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(c => c.isPublished);
  }

  async getCourse(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = randomUUID();
    const now = new Date();
    const course: Course = {
      ...insertCourse,
      id,
      longDescription: insertCourse.longDescription ?? null,
      image: insertCourse.image ?? null,
      duration: insertCourse.duration ?? null,
      level: insertCourse.level ?? null,
      isPublished: insertCourse.isPublished ?? true,
      createdAt: now,
      updatedAt: now,
    };
    this.courses.set(id, course);
    return course;
  }

  async updateCourse(id: string, updates: Partial<InsertCourse>): Promise<Course | undefined> {
    const course = this.courses.get(id);
    if (!course) return undefined;
    
    const updated: Course = {
      ...course,
      ...updates,
      updatedAt: new Date(),
    };
    this.courses.set(id, updated);
    return updated;
  }

  async deleteCourse(id: string): Promise<boolean> {
    return this.courses.delete(id);
  }

  // Experience methods
  async getAllExperiences(): Promise<Experience[]> {
    return Array.from(this.experiences.values());
  }

  async getPublishedExperiences(): Promise<Experience[]> {
    return Array.from(this.experiences.values()).filter(e => e.isPublished);
  }

  async getExperience(id: string): Promise<Experience | undefined> {
    return this.experiences.get(id);
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const id = randomUUID();
    const now = new Date();
    const experience: Experience = {
      ...insertExperience,
      id,
      longDescription: insertExperience.longDescription ?? null,
      image: insertExperience.image ?? null,
      date: insertExperience.date ?? null,
      location: insertExperience.location ?? null,
      maxAttendees: insertExperience.maxAttendees ?? null,
      isPublished: insertExperience.isPublished ?? true,
      currentAttendees: 0,
      createdAt: now,
      updatedAt: now,
    };
    this.experiences.set(id, experience);
    return experience;
  }

  async updateExperience(id: string, updates: Partial<InsertExperience>): Promise<Experience | undefined> {
    const experience = this.experiences.get(id);
    if (!experience) return undefined;
    
    const updated: Experience = {
      ...experience,
      ...updates,
      updatedAt: new Date(),
    };
    this.experiences.set(id, updated);
    return updated;
  }

  async deleteExperience(id: string): Promise<boolean> {
    return this.experiences.delete(id);
  }

  // Purchase methods
  async createPurchase(insertPurchase: InsertPurchase): Promise<Purchase> {
    const id = randomUUID();
    const purchase: Purchase = {
      ...insertPurchase,
      id,
      stripePaymentId: insertPurchase.stripePaymentId ?? null,
      status: "completed",
      createdAt: new Date(),
    };
    this.purchases.set(id, purchase);
    return purchase;
  }

  async getUserPurchases(userId: string): Promise<Purchase[]> {
    return Array.from(this.purchases.values()).filter(p => p.userId === userId);
  }

  async getPurchase(id: string): Promise<Purchase | undefined> {
    return this.purchases.get(id);
  }
}

type DrizzleClient = NonNullable<typeof drizzleDb>;

function ensureDb(): DrizzleClient {
  if (!drizzleDb) {
    throw new Error("DATABASE_URL is not set; cannot create PgStorage");
  }
  return drizzleDb;
}

function coerceNullable<T>(value: T | null | undefined): T | null {
  return value ?? null;
}

export class PgStorage implements IStorage {
  private readonly db: DrizzleClient;

  constructor(dbInstance = ensureDb()) {
    this.db = dbInstance;
  }

  async getUser(id: string): Promise<User | undefined> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await this.db
      .insert(users)
      .values({
        ...insertUser,
        isAdmin: insertUser.isAdmin ?? false,
      })
      .returning();
    return user;
  }

  async getAllCourses(): Promise<Course[]> {
    return this.db.select().from(courses);
  }

  async getPublishedCourses(): Promise<Course[]> {
    return this.db
      .select()
      .from(courses)
      .where(eq(courses.isPublished, true));
  }

  async getCourse(id: string): Promise<Course | undefined> {
    const result = await this.db
      .select()
      .from(courses)
      .where(eq(courses.id, id));
    return result[0];
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const now = new Date();
    const [course] = await this.db
      .insert(courses)
      .values({
        ...insertCourse,
        longDescription: coerceNullable(insertCourse.longDescription),
        image: coerceNullable(insertCourse.image),
        duration: coerceNullable(insertCourse.duration),
        level: coerceNullable(insertCourse.level),
        isPublished: insertCourse.isPublished ?? true,
        createdAt: now,
        updatedAt: now,
      })
      .returning();
    return course;
  }

  async updateCourse(
    id: string,
    updates: Partial<InsertCourse>,
  ): Promise<Course | undefined> {
    const payload: Partial<typeof courses.$inferInsert> = {
      ...updates,
      updatedAt: new Date(),
    };
    if ("longDescription" in payload) {
      (payload as any).longDescription = coerceNullable(
        payload.longDescription,
      );
    }
    if ("image" in payload) {
      (payload as any).image = coerceNullable(payload.image);
    }
    if ("duration" in payload) {
      (payload as any).duration = coerceNullable(payload.duration);
    }
    if ("level" in payload) {
      (payload as any).level = coerceNullable(payload.level);
    }

    const [course] = await this.db
      .update(courses)
      .set(payload)
      .where(eq(courses.id, id))
      .returning();
    return course;
  }

  async deleteCourse(id: string): Promise<boolean> {
    const deleted = await this.db
      .delete(courses)
      .where(eq(courses.id, id))
      .returning({ id: courses.id });
    return deleted.length > 0;
  }

  async getAllExperiences(): Promise<Experience[]> {
    return this.db.select().from(experiences);
  }

  async getPublishedExperiences(): Promise<Experience[]> {
    return this.db
      .select()
      .from(experiences)
      .where(eq(experiences.isPublished, true));
  }

  async getExperience(id: string): Promise<Experience | undefined> {
    const result = await this.db
      .select()
      .from(experiences)
      .where(eq(experiences.id, id));
    return result[0];
  }

  async createExperience(
    insertExperience: InsertExperience,
  ): Promise<Experience> {
    const now = new Date();
    const [experience] = await this.db
      .insert(experiences)
      .values({
        ...insertExperience,
        longDescription: coerceNullable(insertExperience.longDescription),
        image: coerceNullable(insertExperience.image),
        date: coerceNullable(insertExperience.date),
        location: coerceNullable(insertExperience.location),
        maxAttendees: insertExperience.maxAttendees ?? null,
        isPublished: insertExperience.isPublished ?? true,
        currentAttendees: 0,
        createdAt: now,
        updatedAt: now,
      })
      .returning();
    return experience;
  }

  async updateExperience(
    id: string,
    updates: Partial<InsertExperience>,
  ): Promise<Experience | undefined> {
    const payload: Partial<typeof experiences.$inferInsert> = {
      ...updates,
      updatedAt: new Date(),
    };

    if ("longDescription" in payload) {
      (payload as any).longDescription = coerceNullable(
        payload.longDescription,
      );
    }
    if ("image" in payload) {
      (payload as any).image = coerceNullable(payload.image);
    }
    if ("date" in payload) {
      (payload as any).date = coerceNullable(payload.date);
    }
    if ("location" in payload) {
      (payload as any).location = coerceNullable(payload.location);
    }
    if ("maxAttendees" in payload && payload.maxAttendees === undefined) {
      delete payload.maxAttendees;
    }

    const [experience] = await this.db
      .update(experiences)
      .set(payload)
      .where(eq(experiences.id, id))
      .returning();
    return experience;
  }

  async deleteExperience(id: string): Promise<boolean> {
    const deleted = await this.db
      .delete(experiences)
      .where(eq(experiences.id, id))
      .returning({ id: experiences.id });
    return deleted.length > 0;
  }

  async createPurchase(insertPurchase: InsertPurchase): Promise<Purchase> {
    const [purchase] = await this.db
      .insert(purchases)
      .values({
        ...insertPurchase,
        stripePaymentId: coerceNullable(insertPurchase.stripePaymentId),
      })
      .returning();
    return purchase;
  }

  async getUserPurchases(userId: string): Promise<Purchase[]> {
    return this.db
      .select()
      .from(purchases)
      .where(eq(purchases.userId, userId));
  }

  async getPurchase(id: string): Promise<Purchase | undefined> {
    const result = await this.db
      .select()
      .from(purchases)
      .where(eq(purchases.id, id));
    return result[0];
  }
}

if (!drizzleDb && process.env.NODE_ENV === "production") {
  throw new Error(
    "DATABASE_URL is required in production to persist application data.",
  );
}

export const storage = drizzleDb ? new PgStorage(drizzleDb) : new MemStorage();
