import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  loginSchema,
  insertCourseSchema,
  insertExperienceSchema,
  type User 
} from "@shared/schema";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Extend Express Request to include user session
declare global {
  namespace Express {
    interface Request {
      session: {
        userId?: string;
        destroy(callback: (err?: any) => void): void;
      };
    }
  }
}

// Middleware to check if user is authenticated
function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

// Middleware to check if user is admin
async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  const user = await storage.getUser(req.session.userId);
  if (!user || !user.isAdmin) {
    return res.status(403).json({ error: "Forbidden - Admin access required" });
  }
  
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // ==================== AUTH ROUTES ====================
  
  // Register
  app.post("/api/auth/register", async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existing = await storage.getUserByEmail(data.email);
      if (existing) {
        return res.status(400).json({ error: "Email already registered" });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 10);
      
      // Create user
      const user = await storage.createUser({
        ...data,
        password: hashedPassword,
      });
      
      // Set session
      req.session.userId = user.id;
      
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Registration failed" });
    }
  });
  
  // Login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      
      // Find user
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // Verify password
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // Set session
      req.session.userId = user.id;
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Login failed" });
    }
  });
  
  // Logout
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ success: true });
    });
  });
  
  // Get current user
  app.get("/api/auth/me", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });
  
  // ==================== PUBLIC COURSE ROUTES ====================
  
  // Get all published courses
  app.get("/api/courses", async (req, res) => {
    const courses = await storage.getPublishedCourses();
    res.json(courses);
  });
  
  // Get single course
  app.get("/api/courses/:id", async (req, res) => {
    const course = await storage.getCourse(req.params.id);
    if (!course || !course.isPublished) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  });
  
  // ==================== PUBLIC EXPERIENCE ROUTES ====================
  
  // Get all published experiences
  app.get("/api/experiences", async (req, res) => {
    const experiences = await storage.getPublishedExperiences();
    res.json(experiences);
  });
  
  // Get single experience
  app.get("/api/experiences/:id", async (req, res) => {
    const experience = await storage.getExperience(req.params.id);
    if (!experience || !experience.isPublished) {
      return res.status(404).json({ error: "Experience not found" });
    }
    res.json(experience);
  });
  
  // ==================== ADMIN COURSE ROUTES ====================
  
  // Get all courses (admin)
  app.get("/api/admin/courses", requireAdmin, async (req, res) => {
    const courses = await storage.getAllCourses();
    res.json(courses);
  });
  
  // Create course (admin)
  app.post("/api/admin/courses", requireAdmin, async (req, res) => {
    try {
      const data = insertCourseSchema.parse(req.body);
      const course = await storage.createCourse(data);
      res.json(course);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create course" });
    }
  });
  
  // Update course (admin)
  app.put("/api/admin/courses/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertCourseSchema.partial().parse(req.body);
      const course = await storage.updateCourse(req.params.id, data);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update course" });
    }
  });
  
  // Delete course (admin)
  app.delete("/api/admin/courses/:id", requireAdmin, async (req, res) => {
    const deleted = await storage.deleteCourse(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json({ success: true });
  });
  
  // ==================== ADMIN EXPERIENCE ROUTES ====================
  
  // Get all experiences (admin)
  app.get("/api/admin/experiences", requireAdmin, async (req, res) => {
    const experiences = await storage.getAllExperiences();
    res.json(experiences);
  });
  
  // Create experience (admin)
  app.post("/api/admin/experiences", requireAdmin, async (req, res) => {
    try {
      const data = insertExperienceSchema.parse(req.body);
      const experience = await storage.createExperience(data);
      res.json(experience);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create experience" });
    }
  });
  
  // Update experience (admin)
  app.put("/api/admin/experiences/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertExperienceSchema.partial().parse(req.body);
      const experience = await storage.updateExperience(req.params.id, data);
      if (!experience) {
        return res.status(404).json({ error: "Experience not found" });
      }
      res.json(experience);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update experience" });
    }
  });
  
  // Delete experience (admin)
  app.delete("/api/admin/experiences/:id", requireAdmin, async (req, res) => {
    const deleted = await storage.deleteExperience(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Experience not found" });
    }
    res.json({ success: true });
  });
  
  // ==================== USER PURCHASE ROUTES ====================
  
  // Get user's purchases
  app.get("/api/purchases", requireAuth, async (req, res) => {
    const purchases = await storage.getUserPurchases(req.session.userId!);
    res.json(purchases);
  });
  
  // Create purchase (will be used with Stripe)
  app.post("/api/purchases", requireAuth, async (req, res) => {
    try {
      const purchase = await storage.createPurchase({
        ...req.body,
        userId: req.session.userId!,
      });
      res.json(purchase);
    } catch (error) {
      res.status(500).json({ error: "Failed to create purchase" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
