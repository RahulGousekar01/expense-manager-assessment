"use client";

import AppLayout from "@/components/AppLayout";
import { Card, Table } from "antd";
// import ExpenseCategoryChart from "@/components/ExpenseCategoryChart";
import { useAppSelector } from "@/store/hooks/reduxHooks";
import {
  calculateTotalExpenses,
  calculateCategoryTotals,
} from "@/utils/currencyUtils";

export default function Dashboard() {
  const expenses = useAppSelector((state) => state.expenses.expenses);
  const subsidiaries = useAppSelector(
    (state) => state.subsidiaries.subsidiaries,
  );
  const organization = useAppSelector(
    (state) => state.organization.organization,
  );

  const totalExpenses = calculateTotalExpenses(expenses);
  const categoryTotals = calculateCategoryTotals(expenses);

  const subsidiaryTotals = subsidiaries.map((sub) => {
    const subExpenses = expenses.filter((exp) => exp.subsidiaryId === sub.id);

    const total = subExpenses.reduce((sum, exp) => {
      return sum + exp.amount;
    }, 0);

    return {
      key: sub.id,
      name: sub.name,
      currency: sub.currency,
      total,
    };
  });

  const categoryData = Object.entries(categoryTotals).map(
    ([category, total]) => ({
      key: category,
      category,
      total,
    }),
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Total Expense Card */}

        <Card>
          <h2 className="text-lg font-semibold mb-2">
            Total Organization Expenses
          </h2>

          <p className="text-2xl font-bold">
            {organization?.baseCurrency} {totalExpenses.toFixed(2)}
          </p>
        </Card>

        {/* Subsidiary Totals */}

        <Card title="Expenses by Subsidiary">
          <Table
            dataSource={subsidiaryTotals}
            pagination={false}
            columns={[
              {
                title: "Subsidiary",
                dataIndex: "name",
              },
              {
                title: "Currency",
                dataIndex: "currency",
              },
              {
                title: "Total",
                dataIndex: "total",
              },
            ]}
          />
        </Card>

        {/* Category Summary */}

        <Card title="Expenses by Category (Base Currency)">
          <Table
            dataSource={categoryData}
            pagination={false}
            columns={[
              {
                title: "Category",
                dataIndex: "category",
              },
              {
                title: "Total",
                dataIndex: "total",
              },
            ]}
          />
        </Card>
      </div>
    </AppLayout>
  );
}
