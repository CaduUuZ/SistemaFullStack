"use client";

import { useEffect, useState } from "react";
import api from "../../../services/api";


export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.get("/dashboard").then((res: any) => {
        setData(res.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p>Total Usuários</p>
          <h2 className="text-xl">{data?.totalUsers}</h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p>Total Produtos</p>
          <h2 className="text-xl">{data?.totalProducts}</h2>
        </div>
      </div>
    </div>
  );
}