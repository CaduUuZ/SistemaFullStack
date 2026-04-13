import User from "../models/User.js";
import { hashPassword } from "./hash.js";

export const seedAdmin = async () => {
  const exists = await User.findOne({ email: "admin@email.com" });

  if (!exists) {
    const hashed = await hashPassword("123456");

    await User.create({
      name: "Admin",
      email: "admin@email.com",
      password: hashed,
      role: "admin",
    });

    console.log("Admin criado com sucesso");
  }
};