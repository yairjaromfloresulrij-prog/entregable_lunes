import type { Request, Response } from "express";

import { getAllSales, getSaleById, createSale } from "../models/sale.model.js";

// GET /api/sales
export async function getSales(req: Request, res: Response) {
  /*#swagger.tags = ['Sales']
    #swagger.summary = 'Obtener todas las ventas con nombre del cliente' */

  try {
    const sales = await getAllSales();

    res.json(sales);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener las ventas",
    });
  }
}

// GET /api/sales/:id
export async function getSale(req: Request, res: Response) {
  /*#swagger.tags = ['Sales']
    #swagger.summary = 'Obtener una venta por su ID' */

  try {
    const id = Number(req.params.id);

    const sale = await getSaleById(id);

    if (sale === null) {
      res.status(404).json({
        message: "Venta no encontrada",
      });
      return;
    }

    res.json(sale);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener la venta",
    });
  }
}

// POST /api/sales
export async function postSale(req: Request, res: Response) {
  /*#swagger.tags = ['Sales']
    #swagger.summary = 'Crear una nueva venta' */

  try {
    const { id_cliente, fecha } = req.body;

    const sale = await createSale(id_cliente, fecha);

    res.status(201).json(sale);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al crear la venta",
    });
  }
}
