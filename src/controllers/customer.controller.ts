import type { Request, Response } from "express";

import {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
} from "../models/customer.model.js";

export async function getAllCustomers(req: Request, res: Response) {
  try {
    const customers = await getCustomers();

    res.json({
      message: "Clientes obtenidos correctamente",
      total: customers.length,
      data: customers,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener los clientes",
    });
  }
}

export async function getCustomerById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "El ID debe ser un número",
      });
    }

    const customer = await getCustomer(id);

    if (!customer) {
      return res.status(404).json({
        message: "Cliente no encontrado",
      });
    }

    res.json({
      message: "Cliente encontrado",
      data: customer,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener el cliente",
    });
  }
}

export async function postCustomer(req: Request, res: Response) {
  try {
    const { nombre, email, telefono } = req.body;

    const customer = await createCustomer(nombre, email, telefono);

    res.status(201).json({
      message: "Cliente creado correctamente",
      data: customer,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al crear el cliente",
    });
  }
}

export async function putCustomer(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "El ID debe ser un número",
      });
    }

    const { nombre, email, telefono } = req.body;

    const customer = await updateCustomer(id, nombre, email, telefono);

    if (!customer) {
      return res.status(404).json({
        message: "Cliente no encontrado",
      });
    }

    res.json({
      message: "Cliente actualizado correctamente",
      data: customer,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al actualizar el cliente",
    });
  }
}
