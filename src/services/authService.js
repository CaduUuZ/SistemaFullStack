import jwt from "jsonwebtoken";
import { findByEmail } from "../repositories/userRepository.js";
import { comparePassword } from "../utils/hash.js";

export const loginService = async (email, password) => {
  const user = await findByEmail(email);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    throw new Error("Senha inválida");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token };
};