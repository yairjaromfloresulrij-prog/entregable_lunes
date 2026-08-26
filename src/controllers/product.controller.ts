import type { Request, Response } from "express";

import {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct as updateProductModel,
  deleteProduct as deleteProductModel,
} from "../models/product.model.js";

// GET /api/menu
export async function getMenu(req: Request, res: Response) {
  /*#swagger.tags = ['Products']
    #swagger.summary = 'Obtener todos los productos' */

  try {
    const products = await getAllProducts();

    res.json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener el menu",
    });
  }
}

// GET /api/menu/:id
export async function getProduct(req: Request, res: Response) {
  /*#swagger.tags = ['Products']
    #swagger.summary = 'Obtener un producto por su ID' */

  try {
    const id = Number(req.params.id);

    const product = await getProductById(id);

    if (product === null) {
      res.status(404).json({
        message: "Producto no encontrado",
      });
      return;
    }

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener el producto",
    });
  }
}

// POST /api/menu
export async function createProduct(req: Request, res: Response) {
  /*#swagger.tags = ['Products']
    #swagger.summary = 'Crear un nuevo producto' */

  try {
    const { nombre, descripcion, precio } = req.body;

    const product = await insertProduct(nombre, descripcion, precio);

    res.status(201).json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al crear el producto",
    });
  }
}

// PUT /api/menu/:id
export async function updateProduct(req: Request, res: Response) {
  /*#swagger.tags = ['Products']
    #swagger.summary = 'Actualizar un producto existente' */

  try {
    const id = Number(req.params.id);

    const { nombre, descripcion, precio } = req.body;

    const product = await updateProductModel(id, nombre, descripcion, precio);

    if (product === null) {
      res.status(404).json({
        message: "Producto no encontrado",
      });
      return;
    }

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al actualizar el producto",
    });
  }
}

// DELETE /api/menu/:id
export async function deleteProduct(req: Request, res: Response) {
  /*#swagger.tags = ['Products']
    #swagger.summary = 'Eliminar un producto' */

  try {
    const id = Number(req.params.id);

    const deleted = await deleteProductModel(id);

    if (!deleted) {
      res.status(404).json({
        message: "Producto no encontrado",
      });
      return;
    }

    res.json({
      message: "Producto eliminado correctamente",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al eliminar el producto",
    });
  }
}
