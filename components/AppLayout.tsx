"use client";

import { Layout, Menu } from "antd";
import { useRouter, usePathname } from "next/navigation";

const { Header, Content } = Layout;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { key: "/dashboard", label: "Dashboard" },
    { key: "/subsidiaries", label: "Subsidiaries" },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(key);
  };

  return (
    <Layout className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header className="bg-white shadow-sm px-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-blue-600">Expense Manager</h1>

        <Menu
          mode="horizontal"
          selectedKeys={[pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Header>

      {/* Page Content */}
      <Content className="p-6">
        <div className="max-w-6xl mx-auto">{children}</div>
      </Content>
    </Layout>
  );
}
