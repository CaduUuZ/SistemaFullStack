"use client";

import { useEffect, useState } from "react";
import api from "../../../services/api";

export default function Produtos() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
  });

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = async () => {
    try {
      await api.post("/products", {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });

      setOpen(false);
      setForm({ name: "", price: "", stock: "", category: "" });
      fetchProducts();
    } catch (err) {
      alert("Erro ao criar produto");
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Produtos</h1>

        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-md"
        >
          + Novo Produto
        </button>
      </div>

      {/* TABELA */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4 text-left">Nome</th>
              <th className="p-4 text-center">Preço</th>
              <th className="p-4 text-center">Estoque</th>
              <th className="p-4 text-center">Categoria</th>
              <th className="p-4 text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p: any) => (
              <tr key={p._id} className="border-t hover:bg-gray-50 transition">
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4 text-center text-green-600 font-semibold">
                  R$ {p.price}
                </td>
                <td className="p-4 text-center">{p.stock}</td>
                <td className="p-4 text-center">{p.category}</td>

                <td className="p-4 text-center space-x-2">
                  <button className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300">
                    Editar
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600">
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-96 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Novo Produto</h2>

            <input
              placeholder="Nome"
              className="w-full p-2 border rounded mb-2"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder="Preço"
              className="w-full p-2 border rounded mb-2"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />

            <input
              placeholder="Estoque"
              className="w-full p-2 border rounded mb-2"
              value={form.stock}
              onChange={(e) =>
                setForm({ ...form, stock: e.target.value })
              }
            />

            <input
              placeholder="Categoria"
              className="w-full p-2 border rounded mb-4"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Cancelar
              </button>

              <button
                onClick={handleCreate}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}