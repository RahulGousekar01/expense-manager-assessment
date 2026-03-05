"use client";

import AppLayout from "@/components/AppLayout";
import { Table } from "antd";
import { useAppSelector } from "@/store/hooks/reduxHooks";
import {
  calculateTotalExpenses,
  calculateCategoryTotals,
} from "@/utils/currencyUtils";

export default function Dashboard() {
  const expenses = useAppSelector((s) => s.expenses.expenses);
  const subsidiaries = useAppSelector((s) => s.subsidiaries.subsidiaries);
  const organization = useAppSelector((s) => s.organization.organization);

  const totalExpenses = calculateTotalExpenses(expenses);
  const categoryTotals = calculateCategoryTotals(expenses);
  const currency = organization?.baseCurrency ?? "USD";

  const subsidiaryRows = subsidiaries.map((sub) => ({
    key: sub.id,
    name: sub.name,
    currency: sub.currency,
    total: expenses
      .filter((e) => e.subsidiaryId === sub.id)
      .reduce((sum, e) => sum + e.amount, 0),
  }));

  const categoryRows = Object.entries(categoryTotals).map(([cat, total]) => ({
    key: cat,
    category: cat,
    total,
  }));

  const stats = [
    {
      label: "Total Expenses",
      value: `${currency} ${totalExpenses.toFixed(2)}`,
    },
    { label: "Subsidiaries", value: subsidiaries.length },
    { label: "Transactions", value: expenses.length },
    { label: "Categories", value: Object.keys(categoryTotals).length },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {organization?.name ?? "Your organization"}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white border border-gray-200 rounded-xl p-4"
            >
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">
                {s.label}
              </p>
              <p className="text-2xl font-semibold text-gray-900">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-900">
                By Subsidiary
              </p>
            </div>
            <Table
              dataSource={subsidiaryRows}
              pagination={false}
              size="small"
              locale={{
                emptyText: (
                  <p className="text-gray-400 text-sm text-center py-4">
                    No data yet
                  </p>
                ),
              }}
              columns={[
                {
                  title: "Name",
                  dataIndex: "name",
                  render: (v: string) => (
                    <span className="text-sm text-gray-900">{v}</span>
                  ),
                },
                {
                  title: "CCY",
                  dataIndex: "currency",
                  render: (v: string) => (
                    <span className="text-xs text-gray-500">{v}</span>
                  ),
                },
                {
                  title: "Total",
                  dataIndex: "total",
                  align: "right" as const,
                  render: (v: number, row: { currency: string }) => (
                    <span className="text-sm font-medium text-gray-900 tabular-nums">
                      {row.currency} {v.toFixed(2)}
                    </span>
                  ),
                },
              ]}
            />
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-900">By Category</p>
            </div>
            <Table
              dataSource={categoryRows}
              pagination={false}
              size="small"
              locale={{
                emptyText: (
                  <p className="text-gray-400 text-sm text-center py-4">
                    No data yet
                  </p>
                ),
              }}
              columns={[
                {
                  title: "Category",
                  dataIndex: "category",
                  render: (v: string) => (
                    <span className="text-sm text-gray-900 capitalize">
                      {v}
                    </span>
                  ),
                },
                {
                  title: "Total",
                  dataIndex: "total",
                  align: "right" as const,
                  render: (v: number) => (
                    <span className="text-sm font-medium text-gray-900 tabular-nums">
                      {currency} {(v as number).toFixed(2)}
                    </span>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
