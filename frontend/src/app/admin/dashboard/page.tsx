"use client";

import { useEffect, useState } from "react";
import api from "../../../services/api";

export default function Dashboard() {
  const [data, setData] = useState({
    totalUsers: 0,
    totalProducts: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setData(res.data);
    } catch (err) {
      console.log("Erro ao carregar dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* USERS */}
        <div className="bg-white p-6 rounded-2xl shadow-md border">
          <h2 className="text-gray-500">Usuários</h2>
          <p className="text-3xl font-bold">{data.totalUsers}</p>
        </div>

        {/* PRODUCTS */}
        <div className="bg-white p-6 rounded-2xl shadow-md border">
          <h2 className="text-gray-500">Produtos</h2>
          <p className="text-3xl font-bold">{data.totalProducts}</p>
        </div>
      </div>
    </div>
  );
}