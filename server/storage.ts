import { 
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
      isAdmin: false,
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

export const storage = new MemStorage();
