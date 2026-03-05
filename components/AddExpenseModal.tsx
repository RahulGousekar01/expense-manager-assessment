"use client";

import { Modal, Form, Input, Select, DatePicker, Alert } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "@/store/hooks/reduxHooks";
import { addExpense, updateExpense } from "@/features/expenses/expenseSlice";
import { getExchangeRate } from "@/services/exchangeRateService";
import { Expense, ExpenseFormValues } from "@/types/models";

interface Props {
  open: boolean;
  onClose: () => void;
  subsidiaryId: string;
  editingExpense?: Expense | null;
}

export default function AddExpenseModal({
  open,
  onClose,
  subsidiaryId,
  editingExpense,
}: Props) {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const organization = useAppSelector((s) => s.organization.organization);
  const subsidiaries = useAppSelector((s) => s.subsidiaries.subsidiaries);
  const subsidiary = subsidiaries.find((s) => s.id === subsidiaryId);

  const isEditing = !!editingExpense;

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Pre-fill form when editing
  useEffect(() => {
    if (open && editingExpense) {
      form.setFieldsValue({
        name: editingExpense.name,
        category: editingExpense.category,
        amount: editingExpense.amount,
        date: dayjs(editingExpense.date),
        notes: editingExpense.notes,
      });
    } else if (open && !editingExpense) {
      form.resetFields();
    }
    // clear error each time modal opens
    setApiError(null);
  }, [open, editingExpense, form]);

  const onFinish = async (values: ExpenseFormValues) => {
    if (!organization || !subsidiary) return;

    if (isEditing && editingExpense) {
      // Edit: preserve original exchange rate, no API call needed
      dispatch(
        updateExpense({
          ...editingExpense,
          name: values.name,
          category: values.category,
          amount: Number(values.amount),
          date: values.date.format("YYYY-MM-DD"),
          notes: values.notes || "",
        }),
      );
      form.resetFields();
      onClose();
    } else {
      // Add: fetch live exchange rate
      setLoading(true);
      setApiError(null);

      try {
        const rate = await getExchangeRate(
          subsidiary.currency,
          organization.baseCurrency,
        );

        dispatch(
          addExpense({
            id: Date.now().toString(),
            subsidiaryId,
            name: values.name,
            category: values.category,
            amount: Number(values.amount),
            currency: subsidiary.currency,
            exchangeRate: rate,
            date: values.date.format("YYYY-MM-DD"),
            notes: values.notes || "",
          } as Expense),
        );

        form.resetFields();
        onClose();
      } catch {
        setApiError(
          "Could not fetch the exchange rate. Please check your connection and try again.",
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Modal
      title={
        <div>
          <span className="text-base font-semibold text-gray-900">
            {isEditing ? "Edit Expense" : "Add Expense"}
          </span>
          {subsidiary && (
            <span className="ml-2 text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
              {subsidiary.name} · {subsidiary.currency}
            </span>
          )}
        </div>
      }
      open={open}
      onCancel={() => {
        form.resetFields();
        setApiError(null);
        onClose();
      }}
      onOk={() => form.submit()}
      okText={isEditing ? "Save Changes" : "Add Expense"}
      confirmLoading={loading}
      okButtonProps={{
        style: { backgroundColor: "#1D6A6A", borderColor: "#1D6A6A" },
      }}
      width={480}
    >
      <div className="py-2 space-y-3">
        {/* API error banner */}
        {apiError && (
          <Alert
            type="error"
            message={apiError}
            showIcon
            closable
            onClose={() => setApiError(null)}
          />
        )}

        {/* Fetching rate indicator — only shown in add mode */}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
            <svg
              className="animate-spin w-3 h-3 text-teal"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            Fetching live exchange rate for {subsidiary?.currency} →{" "}
            {organization?.baseCurrency}…
          </div>
        )}

        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          requiredMark={false}
        >
          <div className="grid grid-cols-2 gap-x-4">
            <Form.Item
              label="Expense Name"
              name="name"
              rules={[{ required: true, message: "Required" }]}
              className="col-span-2"
            >
              <Input placeholder="e.g. Flight to Delhi" size="large" />
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Required" }]}
            >
              <Select
                size="large"
                placeholder="Select"
                options={[
                  { label: "Travel", value: "Travel" },
                  { label: "Software", value: "Software" },
                  { label: "Hardware", value: "Hardware" },
                  { label: "Food", value: "Food" },
                  { label: "Other", value: "Other" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Amount"
              name="amount"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input
                type="number"
                placeholder="0.00"
                size="large"
                prefix={
                  <span className="text-gray-400 text-xs">
                    {subsidiary?.currency}
                  </span>
                }
              />
            </Form.Item>

            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Required" }]}
            >
              <DatePicker className="w-full" size="large" />
            </Form.Item>

            <Form.Item label="Notes" name="notes" className="col-span-2 mb-0">
              <Input.TextArea rows={2} placeholder="Optional notes" />
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
