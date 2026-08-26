import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

const productSchema = z.object({
  nombre: z.string().min(1, "El nombre no puede estar vacío"),
  descripcion: z.string().min(1, "La descripción no puede estar vacía"),
  precio: z.number().positive("El precio debe ser mayor a cero"),
});

export function validateProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = productSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: "Datos del producto inválidos",
      errors: result.error.issues,
    });
    return;
  }

  next();
}
