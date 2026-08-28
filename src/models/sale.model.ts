import pool from "../config/db.js";

export interface Venta {
  id_pedidos: number;
  id_cliente: number;
  fecha: Date;
  nombre_cliente: string;
}

export async function getAllSales(): Promise<Venta[]> {
  const { rows } = await pool.query(
    `SELECT pedidos.*, cliente.nombre AS nombre_cliente
     FROM pedidos
     INNER JOIN cliente ON pedidos.id_cliente = cliente.id_cliente
     ORDER BY pedidos.id_pedidos ASC;`,
  );

  return rows;
}

export async function getSaleById(id: number): Promise<Venta | null> {
  const { rows } = await pool.query(
    `SELECT pedidos.*, cliente.nombre AS nombre_cliente
     FROM pedidos
     INNER JOIN cliente ON pedidos.id_cliente = cliente.id_cliente
     WHERE pedidos.id_pedidos = $1;`,
    [id],
  );

  return rows[0] || null;
}

export async function createSale(
  id_cliente: number,
  fecha?: string,
): Promise<Venta> {
  const { rows } = await pool.query(
    `INSERT INTO pedidos (id_cliente, fecha)
     VALUES ($1, $2)
     RETURNING *;`,
    [id_cliente, fecha ?? new Date()],
  );

  return rows[0];
}
