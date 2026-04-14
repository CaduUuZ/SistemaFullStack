"use client";

import { useEffect, useState } from "react";
import api from "../../../services/api";

export default function Dashboard() {
  const [data, setData] = useState({
    totalUsers: 0,
    totalProducts: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/dashboard").then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-500 text-white p-6 rounded shadow">
          <h2 className="text-lg">Usuários</h2>
          <p className="text-3xl font-bold">{data.totalUsers}</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded shadow">
          <h2 className="text-lg">Produtos</h2>
          <p className="text-3xl font-bold">{data.totalProducts}</p>
        </div>
      </div>
    </div>
  );
}