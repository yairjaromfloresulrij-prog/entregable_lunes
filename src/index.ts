import express, { type Request, type Response } from "express";
import cors from "cors";
import productRouter from "./routes/productos.router.js";
import swaggerRouter from "./routes/swagger.router.js";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/docs", swaggerRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({
    status: "Server online",
    version: "1.0.0",
  });
});

app.use("/api", productRouter);

app.listen(port, () => {
  console.log(`URL: http://localhost:${port}`);
});
