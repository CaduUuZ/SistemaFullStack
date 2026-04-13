import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findByEmail } from "../repositories/userRepository.js";
export const loginService = async (email, password) => {
  // 🔥 BUSCA USER
  const user = await findByEmail(email);

  console.log("USER:", user);

  if (!user) {
  throw new Error("Credenciais inválidas");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  console.log("SENHA DIGITADA:", password);
  console.log("HASH NO BANCO:", user.password);
  console.log("MATCH:", isMatch);

  if (!user) {
    throw new Error("Credenciais inválidas");
  }

  // 🔐 COMPARA SENHA
  console.log("MATCH:", isMatch);

  if (!isMatch) {
    throw new Error("Credenciais inválidas");
  }

  // 🎟️ TOKEN
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token };
};