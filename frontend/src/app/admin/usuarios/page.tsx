"use client";

import { useEffect, useState } from "react";
import api from "../../../services/api";

export default function Usuarios() {
  const [users, setUsers] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState<any>({});

  // 🔄 Buscar usuários
  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ VALIDAÇÃO
  const validate = () => {
    let newErrors: any = {};

    if (!form.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email inválido";
    }

    if (!form.role.trim()) {
      newErrors.role = "Perfil é obrigatório";
    }

    if (!editingUser && !form.password.trim()) {
      newErrors.password = "Senha é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 💾 SALVAR
  const handleSave = async () => {
    if (!validate()) return;

    try {
      if (editingUser) {
        await api.put(`/users/${editingUser._id}`, {
          name: form.name,
          email: form.email,
          role: form.role,
          ...(form.password && { password: form.password }),
        });
      } else {
        await api.post("/users", form);
      }

      // reset
      setOpen(false);
      setEditingUser(null);
      setForm({ name: "", email: "", password: "", role: "" });
      setErrors({});
      fetchUsers();
    } catch {
      alert("Erro ao salvar usuário");
    }
  };

  // ❌ DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("Deseja excluir?")) return;

    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch {
      alert("Erro ao excluir");
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Usuários</h1>

        <button
          onClick={() => {
            setEditingUser(null);
            setForm({ name: "", email: "", password: "", role: "" });
            setErrors({});
            setOpen(true);
          }}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
        >
          + Novo Usuário
        </button>
      </div>

      {/* TABELA */}
      <div className="bg-white rounded-2xl shadow-md border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4 text-left">Nome</th>
              <th className="p-4 text-center">Email</th>
              <th className="p-4 text-center">Perfil</th>
              <th className="p-4 text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t hover:bg-gray-50">
                <td className="p-4">{u.name}</td>
                <td className="p-4 text-center">{u.email}</td>
                <td className="p-4 text-center">{u.role}</td>

                <td className="p-4 text-center space-x-2">
                  {/* EDITAR */}
                  <button
                    onClick={() => {
                      setEditingUser(u);
                      setForm({
                        name: u.name,
                        email: u.email,
                        password: "",
                        role: u.role,
                      });
                      setErrors({});
                      setOpen(true);
                    }}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Editar
                  </button>

                  {/* EXCLUIR */}
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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
              {editingUser ? "Editar Usuário" : "Novo Usuário"}
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

            {/* EMAIL */}
            <input
              placeholder="Email"
              className={`w-full p-2 border rounded mb-1 ${
                errors.email ? "border-red-500" : ""
              }`}
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm mb-2">{errors.email}</p>
            )}

            {/* SENHA */}
            <input
              placeholder="Senha"
              type="password"
              className={`w-full p-2 border rounded mb-1 ${
                errors.password ? "border-red-500" : ""
              }`}
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            {errors.password && (
              <p className="text-red-500 text-sm mb-2">
                {errors.password}
              </p>
            )}

            {/* ROLE */}
            <select
              className={`w-full p-2 border rounded mb-1 ${
                errors.role ? "border-red-500" : ""
              }`}
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            >
              <option value="">Selecione o perfil</option>
              <option value="admin">Admin</option>
              <option value="user">Usuário</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mb-2">{errors.role}</p>
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