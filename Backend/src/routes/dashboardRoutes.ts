import { Router } from "express";

import dashboardController from "../controllers/dashboardController.js";
import isAuthenticated from "../public/authentication.js";

const router = Router();

router.get('/dashboard', isAuthenticated, dashboardController.getDashboard);

export default router;