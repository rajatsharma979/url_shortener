import { Router, Request, Response } from "express";

import urlController from "../controllers/urlController.js";
import isAuthenticated from "../public/authentication.js";

const router = Router();

router.post('/createUrl', isAuthenticated, urlController.createUrl);

router.get('/short/:url', urlController.getUrl);

export default router;