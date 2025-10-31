import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post('/api/resend-email', async (req, res) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Email resend requested');
      
      res.json({ 
        success: true, 
        message: 'Email resent successfully' 
      });
    } catch (error) {
      console.error('Error resending email:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to resend email' 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
