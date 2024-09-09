import { Router } from 'express'
import userRoutes from './user-routes.js';
import companyRoutes from './company-routes.js';
import solarPanelRoutes from './solar-panel-routes.js';
import biorefineryRoutes from './biorefinery-routes.js';

const appRouter = Router();

appRouter.use("/user", userRoutes); // domain/api/v1/user
appRouter.use("/company", companyRoutes); // domain/api/v1/company
appRouter.use("/biorefinery", biorefineryRoutes); // domain/api/v1/biorefinery
appRouter.use("/solar-panel", solarPanelRoutes); // domain/api/v1/solar-panel

export default appRouter;