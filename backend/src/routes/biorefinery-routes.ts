import { Router } from "express";
import { editDesiredProduct, editForm, editIndustrialProcess, editInfrastructure, getAllDesiredProducts, getAllForms, getAllIndustrialProcesses, getAllInfrastructure, verifyDesiredProduct, verifyForm, verifyIndustrialProcess, verifyInfrastructure } from "../controllers/biorefinery-controllers.js";
import { verifyToken } from "../utils/token-manager.js";
const biorefineryRoutes = Router();

biorefineryRoutes.patch("/edit-infrastructure", editInfrastructure);
biorefineryRoutes.patch("/edit-industrial-process", editIndustrialProcess);
biorefineryRoutes.patch("/edit-desired-product", editDesiredProduct);
biorefineryRoutes.patch("/edit-form", editForm);

biorefineryRoutes.get("/get-infrastructure", getAllInfrastructure);
biorefineryRoutes.get("/get-industrial-process", getAllIndustrialProcesses);
biorefineryRoutes.get("/get-desired-product", getAllDesiredProducts);
biorefineryRoutes.get("/get-form", getAllForms);

biorefineryRoutes.get("/infrastructure-auth-status", verifyToken, verifyInfrastructure);
biorefineryRoutes.get("/industrial-process-auth-status", verifyToken, verifyIndustrialProcess);
biorefineryRoutes.get("/desired-product-auth-status", verifyToken, verifyDesiredProduct);
biorefineryRoutes.get("/form-auth-status", verifyToken, verifyForm);

export default biorefineryRoutes;