import { loginService } from "../services/authService.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Campos obrigatórios" });
    }

    const result = await loginService(email, password);

    return res.json(result);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};