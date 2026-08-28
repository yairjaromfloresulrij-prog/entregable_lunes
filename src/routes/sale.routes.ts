import { Router } from "express";

import { getSales, getSale, postSale } from "../controllers/sale.controller.js";

const router: Router = Router();

router.get("/sales", getSales);

router.get("/sales/:id", getSale);

router.post("/sales", postSale);

export default router;
