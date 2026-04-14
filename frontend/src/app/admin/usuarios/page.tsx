"use client";

import { useEffect, useState } from "react";
import api from "../../../services/api";

export default function UsuariosPage() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async () => {
    await api.post("/users", form);
    setShowModal(false);
    fetchUsers();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza?")) return;
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Usuários</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowModal(true)}
      >
        Novo Usuário
      </button>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Nome</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user: any) => (
            <tr key={user._id} className="border-t">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(user._id)}
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
            <h2 className="text-xl mb-4">Novo Usuário</h2>

            <input
              placeholder="Nome"
              className="border p-2 w-full mb-2"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="Email"
              className="border p-2 w-full mb-2"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              placeholder="Senha"
              type="password"
              className="border p-2 w-full mb-2"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <select
              className="border p-2 w-full mb-4"
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)}>Cancelar</button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleCreate}
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}