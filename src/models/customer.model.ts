import pool from "../config/db.js";

export async function getCustomers() {
  const result = await pool.query("SELECT * FROM cliente ORDER BY id_cliente");

  return result.rows;
}

export async function getCustomer(id: number) {
  const result = await pool.query(
    "SELECT * FROM cliente WHERE id_cliente = $1",
    [id],
  );

  return result.rows[0];
}

export async function createCustomer(
  nombre: string,
  email: string,
  telefono: string,
) {
  const result = await pool.query(
    `INSERT INTO cliente (nombre, email, telefono)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [nombre, email, telefono],
  );

  return result.rows[0];
}

export async function updateCustomer(
  id: number,
  nombre: string,
  email: string,
  telefono: string,
) {
  const result = await pool.query(
    `UPDATE cliente
     SET nombre = $1,
         email = $2,
         telefono = $3
     WHERE id_cliente = $4
     RETURNING *`,
    [nombre, email, telefono, id],
  );

  return result.rows[0];
}
