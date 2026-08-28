import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

const customerSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  email: z.email("El email no es válido"),
  telefono: z.number().positive().int().min(1, "El teléfono es obligatorio"),
});

export function validateCustomer(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = customerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Datos del cliente inválidos",
      errors: result.error.issues,
    });
  }

  req.body = result.data;

  next();
}
