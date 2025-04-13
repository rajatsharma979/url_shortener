import { Router, Request, Response } from "express";

import urlController from "../controllers/urlController.js";
import isAuthenticated from "../public/authentication.js";

const router = Router();

router.post('/createUrl', (req, res)=>{console.log("cookies in createurl",req.cookies)},isAuthenticated, urlController.createUrl);

router.get('/dwarf_url/:url', urlController.getUrl);

export default router;