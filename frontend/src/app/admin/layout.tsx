"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Package,
  Menu,
  Moon,
  Sun,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(false);

  // Proteção + dark mode persistente
  useEffect(() => {
    const token = localStorage.getItem("token");
    const theme = localStorage.getItem("theme");

    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }

    if (theme === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, [router]);

  const toggleDark = () => {
    const newDark = !dark;
    setDark(newDark);

    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (loading) return null;

  const menu = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Usuários",
      path: "/admin/usuarios",
      icon: <Users size={20} />,
    },
    {
      name: "Produtos",
      path: "/admin/produtos",
      icon: <Package size={20} />,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950 transition-colors">
      {/* SIDEBAR */}
      <aside
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-gray-900 text-white p-4 transition-all duration-300 shadow-xl border-r border-gray-800`}
      >
        {/* TOPO */}
        <div className="flex items-center justify-between mb-6">
          {!collapsed && <h1 className="text-xl font-bold">Admin</h1>}

          <div className="flex gap-2">
            {/* DARK MODE */}
            <button
              onClick={toggleDark}
              className="p-2 hover:bg-gray-800 rounded-lg"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* COLLAPSE */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 hover:bg-gray-800 rounded-lg"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* MENU */}
        <nav className="space-y-2">
          {menu.map((item) => {
            const active = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center ${
                  collapsed ? "justify-center" : "gap-3"
                } p-3 rounded-xl transition-all ${
                  active
                    ? "bg-blue-600 shadow-md"
                    : "hover:bg-gray-800 text-gray-300"
                }`}
              >
                {item.icon}
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="bg-white dark:bg-gray-900 dark:text-white rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 p-6 min-h-full transition-colors">
          {children}
        </div>
      </main>
    </div>
  );
}