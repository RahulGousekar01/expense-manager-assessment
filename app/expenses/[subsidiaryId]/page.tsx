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
  const params = useParams();
  const subsidiaryId = params.subsidiaryId as string;

  const [openModal, setOpenModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const subsidiary = useAppSelector((s) =>
    s.subsidiaries.subsidiaries.find((sub) => sub.id === subsidiaryId),
  );

  const expenses = useAppSelector((s) =>
    s.expenses.expenses.filter((e) => e.subsidiaryId === subsidiaryId),
  );

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setEditingExpense(null);
  };

  const columns: ColumnsType<Expense> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (v: string) => (
        <span className="text-sm font-medium text-gray-900">{v}</span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (v: string) => (
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
          {v}
        </span>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      align: "right" as const,
      render: (v: number) => (
        <span className="text-sm font-medium text-gray-900 tabular-nums">
          {subsidiary?.currency} {v.toFixed(2)}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (v: string) => <span className="text-sm text-gray-500">{v}</span>,
    },
    {
      title: "Notes",
      dataIndex: "notes",
      render: (v: string) => (
        <span className="text-sm text-gray-400">{v || "—"}</span>
      ),
    },
    {
      title: "",
      align: "right" as const,
      render: (_: unknown, record: Expense) => (
        <button
          onClick={() => handleEdit(record)}
          className="text-xs font-medium text-teal hover:underline cursor-pointer"
        >
          Edit
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
              {subsidiary?.name ?? "Expenses"}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {expenses.length} transactions
              {subsidiary && (
                <span className="ml-2 text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                  {subsidiary.currency}
                </span>
              )}
            </p>
          </div>
          <Button
            type="primary"
            onClick={() => {
              setEditingExpense(null);
              setOpenModal(true);
            }}
            style={{ backgroundColor: "#1D6A6A", borderColor: "#1D6A6A" }}
          >
            Add Expense
          </Button>
        </div>

        {/* Total bar */}
        {expenses.length > 0 && (
          <div className="bg-teal-light border border-teal-mid rounded-xl px-5 py-4 flex items-center justify-between">
            <p className="text-sm font-medium text-teal">Total Expenses</p>
            <p className="text-lg font-semibold text-teal tabular-nums">
              {subsidiary?.currency} {total.toFixed(2)}
            </p>
          </div>
        )}

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <Table
            columns={columns}
            dataSource={expenses}
            rowKey="id"
            pagination={false}
            size="middle"
            locale={{
              emptyText: (
                <div className="py-10 text-center">
                  <p className="text-sm text-gray-400">No expenses yet</p>
                  <button
                    onClick={() => {
                      setEditingExpense(null);
                      setOpenModal(true);
                    }}
                    className="mt-2 text-sm text-teal hover:underline cursor-pointer"
                  >
                    Add your first expense →
                  </button>
                </div>
              ),
            }}
          />
        </div>
      </div>

      <AddExpenseModal
        open={openModal}
        onClose={handleClose}
        subsidiaryId={subsidiaryId}
        editingExpense={editingExpense}
      />
    </AppLayout>
  );
}
