"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: any) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="flex">
      <div className="w-64 bg-gray-800 text-white h-screen p-4">
        <h2 className="text-lg font-bold">Painel</h2>

        <ul className="mt-4 space-y-2">
          <li><a href="/admin/dashboard">Dashboard</a></li>
          <li><a href="/admin/usuarios">Usuários</a></li>
          <li><a href="/admin/produtos">Produtos</a></li>
        </ul>
      </div>

      <div className="flex-1 p-6 bg-gray-100">
        {children}
      </div>
    </div>
  );
}