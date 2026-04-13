import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import { seedAdmin } from "./src/utils/seed.js";
import productRoutes from "./src/routes/productRoutes.js";

app.use("/api/v1/products", productRoutes);

dotenv.config();

const app = express();

app.use(express.json());

// Rotas
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

// Conectar banco + seed + start servidor
const startServer = async () => {
  try {
    await connectDB();
    await seedAdmin();

    app.listen(process.env.PORT, () => {
      console.log(`Servidor rodando na porta ${process.env.PORT} 🚀`);
    });
  } catch (error) {
    console.error("Erro ao iniciar servidor:", error);
  }
};

startServer();