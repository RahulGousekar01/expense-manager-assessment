"use client";

import { Button, Table } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";
import AddSubsidiaryModal from "@/components/AddSubsidiaryModal";
import { useAppSelector } from "@/store/hooks/reduxHooks";
import { Subsidiary } from "@/types/models";
import SubsidiaryLoginModal from "../SubsidiaryLoginModal/page";

export default function SubsidiariesPage() {
  const router = useRouter();
  const subsidiaries = useAppSelector((s) => s.subsidiaries.subsidiaries);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [loginTarget, setLoginTarget] = useState<Subsidiary | null>(null);

  const handleViewExpenses = (record: Subsidiary) => {
    setLoginTarget(record);
  };

  const handleLoginSuccess = () => {
    if (loginTarget) {
      router.push(`/expenses/${loginTarget.id}`);
      setLoginTarget(null);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (v: string) => (
        <span className="text-sm font-medium text-gray-900">{v}</span>
      ),
    },
    {
      title: "Currency",
      dataIndex: "currency",
      render: (v: string) => (
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
          {v}
        </span>
      ),
    },
    {
      title: "",
      render: (_: unknown, record: Subsidiary) => (
        <button
          onClick={() => handleViewExpenses(record)}
          className="text-xs font-medium text-teal hover:underline cursor-pointer"
        >
          View Expenses →
        </button>
      ),
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Subsidiaries
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {subsidiaries.length} entities
            </p>
          </div>
          <Button
            type="primary"
            onClick={() => setOpenAddModal(true)}
            style={{ backgroundColor: "#1D6A6A", borderColor: "#1D6A6A" }}
          >
            Add Subsidiary
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <Table
            columns={columns}
            dataSource={subsidiaries}
            rowKey="id"
            pagination={false}
            size="middle"
            locale={{
              emptyText: (
                <div className="py-10 text-center">
                  <p className="text-sm text-gray-400">No subsidiaries yet</p>
                  <button
                    onClick={() => setOpenAddModal(true)}
                    className="mt-2 text-sm text-teal hover:underline cursor-pointer"
                  >
                    Add your first one →
                  </button>
                </div>
              ),
            }}
          />
        </div>
      </div>

      <AddSubsidiaryModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
      />

      <SubsidiaryLoginModal
        open={!!loginTarget}
        subsidiaryName={loginTarget?.name ?? ""}
        onSuccess={handleLoginSuccess}
        onClose={() => setLoginTarget(null)}
      />
    </AppLayout>
  );
}
