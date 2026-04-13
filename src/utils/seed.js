import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const seedAdmin = async () => {
  try {
    const existingUser = await User.findOne({ email: "admin@teste.com" });

    if (existingUser) {
      console.log("Admin já existe");
      return;
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    await User.create({
      name: "Admin",
      email: "admin@teste.com",
      password: hashedPassword,
      role: "admin"
    });

    console.log("Admin criado com sucesso");
  } catch (error) {
    console.error("Erro ao criar admin:", error.message);
  }
};