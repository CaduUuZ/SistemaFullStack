"use client";

import { useEffect, useState } from "react";
import api from "../../../services/api";
import toast from "react-hot-toast";

export default function ProdutosPage() {
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch {
      toast.error("Erro ao carregar produtos");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Produtos</h1>

      <table className="w-full bg-white rounded-2xl shadow overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Nome</th>
            <th className="p-3">Preço</th>
            <th className="p-3">Estoque</th>
            <th className="p-3">Categoria</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr
              key={p._id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="p-3">{p.name}</td>
              <td className="p-3 text-center">R$ {p.price}</td>
              <td className="p-3 text-center">{p.stock}</td>
              <td className="p-3 text-center">{p.category}</td>
              <td className="p-3 text-center space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  Editar
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}