import * as userRepo from "../repositories/userRepository.js";
import { hashPassword } from "../utils/hash.js";

export const listUsers = async () => {
  return await userRepo.getAllUsers();
};

export const createUserService = async (data) => {
  if (!data.email || !data.password || !data.name) {
    throw new Error("Campos obrigatórios");
  }

  data.password = await hashPassword(data.password);

  return await userRepo.createUser(data);
};

export const updateUserService = async (id, data) => {
  if (data.password) {
    data.password = await hashPassword(data.password);
  }

  return await userRepo.updateUser(id, data);
};

export const deleteUserService = async (id) => {
  return await userRepo.deleteUserById(id);
};