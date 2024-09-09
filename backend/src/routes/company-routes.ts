import { Router } from "express";
import { editCompany, getAllCompanies, verifyCompany } from "../controllers/company-controllers.js";
import { editCompanyValidator, validate } from "../utils/validator.js";
import { verifyToken } from "../utils/token-manager.js";
const companyRoutes = Router();

companyRoutes.get("/", getAllCompanies);
companyRoutes.patch("/edit-company", editCompany);
companyRoutes.get("/auth-status", verifyToken, verifyCompany);

export default companyRoutes;