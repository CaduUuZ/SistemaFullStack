import * as productRepo from "../repositories/productRepository.js";

export const listProducts = async () => {
  return await productRepo.getAllProducts();
};

export const createProductService = async (data) => {
  if (!data.name || data.price < 0 || data.stock < 0) {
    throw new Error("Dados inválidos");
  }

  return await productRepo.createProduct(data);
};

export const updateProductService = async (id, data) => {
  return await productRepo.updateProduct(id, data);
};

export const deleteProductService = async (id) => {
  return await productRepo.deleteProduct(id);
};