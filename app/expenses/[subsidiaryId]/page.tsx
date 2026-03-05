"use client";

import { useParams } from "next/navigation";
import { Button, Table } from "antd";
import { useState } from "react";

import AppLayout from "@/components/AppLayout";
import AddExpenseModal from "@/components/AddExpenseModal";

import { useAppSelector } from "@/store/hooks/reduxHooks";
import { Expense } from "@/types/models";
import { ColumnsType } from "antd/es/table";

export default function ExpensesPage() {
  const { subsidiaryId } = useParams();

  const expenses = useAppSelector((state) =>
    state.expenses.expenses.filter((exp) => exp.subsidiaryId === subsidiaryId),
  );

  const [openModal, setOpenModal] = useState(false);

  const columns: ColumnsType<Expense> = [
    { title: "Name", dataIndex: "name" },
    { title: "Category", dataIndex: "category" },
    { title: "Amount", dataIndex: "amount" },
    { title: "Date", dataIndex: "date" },
  ];

  return (
    <AppLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Expenses</h1>

        <Button type="primary" onClick={() => setOpenModal(true)}>
          Add Expense
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={expenses}
        rowKey="id"
        pagination={false}
      />

      <AddExpenseModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        subsidiaryId={subsidiaryId as string}
      />
    </AppLayout>
  );
}
