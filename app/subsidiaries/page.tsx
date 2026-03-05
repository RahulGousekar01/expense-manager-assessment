"use client";

import { Button, Card, Table } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";

import AppLayout from "@/components/AppLayout";
import AddSubsidiaryModal from "@/components/AddSubsidiaryModal";

import { useAppSelector } from "@/store/hooks/reduxHooks";
import { Subsidiary } from "@/types/models";

export default function SubsidiariesPage() {
  const router = useRouter();
  const subsidiaries = useAppSelector(
    (state) => state.subsidiaries.subsidiaries,
  );

  const [openModal, setOpenModal] = useState(false);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Currency",
      dataIndex: "currency",
    },
    {
      title: "Actions",
      render: (_: unknown, record: Subsidiary) => (
        <Button
          type="link"
          onClick={() => router.push(`/expenses/${record.id}`)}
        >
          Login
        </Button>
      ),
    },
  ];

  return (
    <AppLayout>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Subsidiaries</h1>

        <Button type="primary" onClick={() => setOpenModal(true)}>
          Add Subsidiary
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={subsidiaries}
          rowKey="id"
          pagination={false}
          locale={{ emptyText: "No subsidiaries added yet" }}
        />
      </Card>

      <AddSubsidiaryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </AppLayout>
  );
}
