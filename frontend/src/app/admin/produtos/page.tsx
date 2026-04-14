"use client";

import { useEffect, useState } from "react";
import api from "../../../services/api";
import toast from "react-hot-toast";

export default function ProdutosPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: ""
  });

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async () => {
    if (editingProduct) {
        try {
  if (editingProduct) {
    await api.put(`/products/${editingProduct._id}`, form);
    toast.success("Produto atualizado!");
  } else {
    await api.post("/products", form);
    toast.success("Produto criado!");
  }
} catch {
  toast.error("Erro ao salvar produto");
}
      await api.put(`/products/${editingProduct._id}`, form);
    } else {
      await api.post("/products", form);
    }

    setShowModal(false);
    setEditingProduct(null);

    setForm({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: ""
    });

    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setForm({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: ""
    });
    setShowModal(true);
  };

  const openEditModal = (product: any) => {
    setEditingProduct(product);
    setForm(product);
    setShowModal(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={openCreateModal}
      >
        Novo Produto
      </button>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Nome</th>
            <th className="p-2">Preço</th>
            <th className="p-2">Estoque</th>
            <th className="p-2">Categoria</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-t">
              <td className="p-2">{p.name}</td>
              <td className="p-2">R$ {p.price}</td>
              <td className="p-2">{p.stock}</td>
              <td className="p-2">{p.category}</td>
              <td className="p-2">
                <button
                  className="text-blue-500 mr-2"
                  onClick={() => openEditModal(p)}
                >
                  Editar
                </button>

                <button
                  className="text-red-500"
                  onClick={() => handleDelete(p._id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded shadow w-96">
            <h2 className="text-xl mb-4">
              {editingProduct ? "Editar Produto" : "Novo Produto"}
            </h2>

            <input
              placeholder="Nome"
              className="border p-2 w-full mb-2"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder="Descrição"
              className="border p-2 w-full mb-2"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Preço"
              className="border p-2 w-full mb-2"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
            />

            <input
              type="number"
              placeholder="Estoque"
              className="border p-2 w-full mb-2"
              value={form.stock}
              onChange={(e) =>
                setForm({ ...form, stock: Number(e.target.value) })
              }
            />

            <input
              placeholder="Categoria"
              className="border p-2 w-full mb-4"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)}>
                Cancelar
              </button>

              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                {editingProduct ? "Atualizar" : "Criar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}