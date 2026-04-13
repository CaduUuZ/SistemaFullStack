import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";

import { seedAdmin } from "./src/utils/seed.js";

// 🔥 Config env
dotenv.config();

// 🔥 Criar app
const app = express();

// 🔥 Middlewares
app.use(express.json());
app.use(cors());
// 🔥 Rotas
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// 🔥 Start server
const startServer = async () => {
  try {
    await connectDB();

    await seedAdmin(); // 👈 cria admin automaticamente

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Servidor rodando na porta ${process.env.PORT || 3000} 🚀`);
    });
  } catch (error) {
    console.error("Erro ao iniciar servidor:", error);
  }
};

startServer();