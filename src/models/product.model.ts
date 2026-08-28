import pool from "../config/db.js";

// TIPADO DE LA TABLA
export interface Producto {
  id_productos: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

export async function getAllProducts(
  maxPrice?: number,
  page: number = 1,
  limit: number = 10,
): Promise<Producto[]> {
  const offset = (page - 1) * limit;

  const params: number[] = [];
  let query = "SELECT * FROM productos";

  if (maxPrice !== undefined) {
    params.push(maxPrice);
    query += ` WHERE precio <= $${params.length}`;
  }

  query += " ORDER BY id_productos ASC";

  params.push(limit);
  query += ` LIMIT $${params.length}`;

  params.push(offset);
  query += ` OFFSET $${params.length}`;

  const { rows } = await pool.query(query, params);

  return rows;
}

// OBTENER POR ID
export async function getProductById(id: number): Promise<Producto | null> {
  const { rows } = await pool.query(
    "SELECT * FROM productos WHERE id_productos = $1;",
    [id],
  );

  return rows[0] || null;
}

// CREAR
export async function insertProduct(
  nombre: string,
  descripcion: string,
  precio: number,
): Promise<Producto> {
  const { rows } = await pool.query(
    `INSERT INTO productos (nombre, descripcion, precio)
     VALUES ($1, $2, $3)
     RETURNING *;`,
    [nombre, descripcion, precio],
  );

  return rows[0];
}

// ACTUALIZAR
export async function updateProduct(
  id: number,
  nombre: string,
  descripcion: string,
  precio: number,
): Promise<Producto | null> {
  const { rows } = await pool.query(
    `UPDATE productos
     SET nombre = $1,
         descripcion = $2,
         precio = $3
     WHERE id_productos = $4
     RETURNING *;`,
    [nombre, descripcion, precio, id],
  );

  return rows[0] || null;
}

// ELIMINAR
export async function deleteProduct(id: number): Promise<boolean> {
  const { rowCount } = await pool.query(
    "DELETE FROM productos WHERE id_productos = $1;",
    [id],
  );

  return (rowCount ?? 0) > 0;
}
