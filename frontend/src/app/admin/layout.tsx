"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, Package } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  // 👇 evita render antes de validar token
  if (loading) return null;

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Usuários", path: "/admin/usuarios", icon: <Users size={18} /> },
    { name: "Produtos", path: "/admin/produtos", icon: <Package size={18} /> },
  ];

  return (
    <div className="flex">
      <aside className="w-64 h-screen bg-gray-900 text-white p-6">
        <h1 className="text-xl font-bold mb-6">🚀 Admin</h1>

        <nav className="space-y-2">
          {menu.map((item) => {
            const active = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={
                  "flex items-center gap-2 p-2 rounded " +
                  (active
                    ? "bg-blue-600"
                    : "hover:bg-gray-800 text-gray-300")
                }
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}