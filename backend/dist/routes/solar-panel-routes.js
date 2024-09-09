import { Router } from "express";
import { editSolarPanel, getAllSolarPanels, verifySolarPanel } from "../controllers/solar-panel-controllers.js";
import { verifyToken } from "../utils/token-manager.js";
const solarPanelRoutes = Router();
solarPanelRoutes.get("/", getAllSolarPanels);
solarPanelRoutes.patch("/edit-solar-panel", editSolarPanel);
solarPanelRoutes.get("/auth-status", verifyToken, verifySolarPanel);
export default solarPanelRoutes;
//# sourceMappingURL=solar-panel-routes.js.map