"use client";

import { useEffect, useState } from "react";
import api from "../../../services/api";

export default function Produtos() {
  const [products, setProducts] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
  });

  const [errors, setErrors] = useState<any>({});

  // BUSCAR PRODUTOS
  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // VALIDAÇÃO
  const validate = () => {
    let newErrors: any = {};

    if (!form.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!form.price) {
      newErrors.price = "Preço é obrigatório";
    } else if (Number(form.price) <= 0) {
      newErrors.price = "Preço deve ser maior que 0";
    }

    if (form.stock === "") {
      newErrors.stock = "Estoque é obrigatório";
    } else if (Number(form.stock) < 0) {
      newErrors.stock = "Estoque não pode ser negativo";
    }

    if (!form.category.trim()) {
      newErrors.category = "Categoria é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // SALVAR (CREATE + UPDATE)
  const handleSave = async () => {
    if (!validate()) return;

    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, {
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        });
      } else {
        await api.post("/products", {
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        });
      }

      // reset
      setOpen(false);
      setEditingProduct(null);
      setForm({ name: "", price: "", stock: "", category: "" });
      setErrors({});
      fetchProducts();
    } catch {
      alert("Erro ao salvar produto");
    }
  };

  // EXCLUIR
  const handleDelete = async (id: string) => {
    if (!confirm("Deseja excluir?")) return;

    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch {
      alert("Erro ao excluir");
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Produtos</h1>

        <button
          onClick={() => {
            setEditingProduct(null);
            setForm({ name: "", price: "", stock: "", category: "" });
            setErrors({});
            setOpen(true);
          }}
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
            {products.map((p) => (
              <tr key={p._id} className="border-t hover:bg-gray-50 transition">
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4 text-center text-green-600 font-semibold">
                  R$ {p.price}
                </td>
                <td className="p-4 text-center">{p.stock}</td>
                <td className="p-4 text-center">{p.category}</td>

                <td className="p-4 text-center space-x-2">
                  {/* EDITAR */}
                  <button
                    onClick={() => {
                      setEditingProduct(p);
                      setForm({
                        name: p.name,
                        price: String(p.price),
                        stock: String(p.stock),
                        category: p.category,
                      });
                      setErrors({});
                      setOpen(true);
                    }}
                    className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
                  >
                    Editar
                  </button>

                  {/* EXCLUIR */}
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
                  >
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
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? "Editar Produto" : "Novo Produto"}
            </h2>

            {/* NOME */}
            <input
              placeholder="Nome"
              className={`w-full p-2 border rounded mb-1 ${
                errors.name ? "border-red-500" : ""
              }`}
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
            {errors.name && (
              <p className="text-red-500 text-sm mb-2">{errors.name}</p>
            )}

            {/* PREÇO */}
            <input
              placeholder="Preço"
              type="number"
              className={`w-full p-2 border rounded mb-1 ${
                errors.price ? "border-red-500" : ""
              }`}
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />
            {errors.price && (
              <p className="text-red-500 text-sm mb-2">{errors.price}</p>
            )}

            {/* ESTOQUE */}
            <input
              placeholder="Estoque"
              type="number"
              className={`w-full p-2 border rounded mb-1 ${
                errors.stock ? "border-red-500" : ""
              }`}
              value={form.stock}
              onChange={(e) =>
                setForm({ ...form, stock: e.target.value })
              }
            />
            {errors.stock && (
              <p className="text-red-500 text-sm mb-2">{errors.stock}</p>
            )}

            {/* CATEGORIA */}
            <input
              placeholder="Categoria"
              className={`w-full p-2 border rounded mb-1 ${
                errors.category ? "border-red-500" : ""
              }`}
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            />
            {errors.category && (
              <p className="text-red-500 text-sm mb-2">
                {errors.category}
              </p>
            )}

            {/* BOTÕES */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Cancelar
              </button>

              <button
                onClick={handleSave}
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