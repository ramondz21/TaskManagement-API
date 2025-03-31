import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../services/authService";


const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Akses ditolak, token tidak tersedia" });
      return;
    }
  
    const token = authHeader.split(" ")[1];
  
    try {
      const decoded = verifyAccessToken(token);
      req.user = { id: decoded.userId };
      next();
    } catch (error) {
      res.status(403).json({ message: "Token tidak valid" });
    }
  };
  
  export default authMiddleware;
