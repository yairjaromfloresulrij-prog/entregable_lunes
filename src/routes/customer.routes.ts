import { Router } from "express";

import {
  getAllCustomers,
  getCustomerById,
  postCustomer,
  putCustomer,
} from "../controllers/customer.controller.js";

import { validateCustomer } from "../middlewares/validate-customer.js";

const router: Router = Router();

router.get("/customers", getAllCustomers);

router.get("/customers/:id", getCustomerById);

router.post("/customers", validateCustomer, postCustomer);

router.put("/customers/:id", validateCustomer, putCustomer);

export default router;
