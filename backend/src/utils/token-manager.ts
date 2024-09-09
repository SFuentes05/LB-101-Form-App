import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id: string, email: string, companyID: string, expiresIn: string) => {
  const payload = { id, email, companyID }; // Include companyID in the payload
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[COOKIE_NAME];
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token Expired or Invalid" });
    }
    
    res.locals.jwtData = decoded; // Save the decoded data (including id and companyID) to res.locals
    next(); // Proceed to the next middleware or route handler
  });
};
