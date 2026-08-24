import express, { type Request, type Response } from "express";
import swaggerRouter from "./routes/swagger.router.js";
import cors from "cors";
import pool from "../src/config/db.js";
const port = process.env.PORT;

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

app.use("/api/docs", swaggerRouter);

app.get("/", (req: Request, res: Response) => {
  /*#swagger.tags = ['Tests']*/
  res.json({
    status: "Server online",
    version: "1.0.0",
  });
});

app.get("/api/menu", async function (req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT * FROM productos");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener el menu",
    });
  }
});

app.listen(port, () => {
  console.log(`URL: http://localhost:${port}`);
});
