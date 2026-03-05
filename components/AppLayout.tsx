"use client";

import { useRouter, usePathname } from "next/navigation";

const navItems = [
  { key: "/dashboard", label: "Dashboard" },
  { key: "/subsidiaries", label: "Subsidiaries" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-teal flex items-center justify-center text-white text-xs font-bold">
            ST
          </div>
          <span className="font-semibold text-gray-900 text-sm">
            SpendTrack
          </span>
        </div>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const active = pathname === item.key;
            return (
              <button
                key={item.key}
                onClick={() => router.push(item.key)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer
                  ${
                    active
                      ? "bg-teal-light text-teal"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </header>

      <main className="p-6">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
