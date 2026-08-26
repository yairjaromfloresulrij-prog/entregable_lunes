import { Router } from "express";

import {
  getMenu,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router: Router = Router();

router.get("/menu", getMenu);

router.get("/menu/:id", getProduct);

router.post("/menu", createProduct);

router.put("/menu/:id", updateProduct);

router.delete("/menu/:id", deleteProduct);

export default router;
