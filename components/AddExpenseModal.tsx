"use client";

import { Modal, Form, Input, Select, DatePicker } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks/reduxHooks";
import { addExpense } from "@/features/expenses/expenseSlice";
import { getExchangeRate } from "@/services/exchangeRateService";
import { Expense, ExpenseFormValues } from "@/types/models";

interface Props {
  open: boolean;
  onClose: () => void;
  subsidiaryId: string;
}

export default function AddExpenseModal({
  open,
  onClose,
  subsidiaryId,
}: Props) {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const organization = useAppSelector(
    (state) => state.organization.organization,
  );

  const subsidiaries = useAppSelector(
    (state) => state.subsidiaries.subsidiaries,
  );

  const subsidiary = subsidiaries.find((s) => s.id === subsidiaryId);

  const onFinish = async (values: ExpenseFormValues) => {
    if (!organization || !subsidiary) return;

    const rate = await getExchangeRate(
      subsidiary.currency,
      organization.baseCurrency,
    );

    const newExpense: Expense = {
      id: Date.now().toString(),
      subsidiaryId,

      name: values.name,
      category: values.category,
      amount: Number(values.amount),

      currency: subsidiary.currency,
      exchangeRate: rate,

      date: values.date.format("YYYY-MM-DD"),
      notes: values.notes || "",
    };

    dispatch(addExpense(newExpense));

    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Add Expense"
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="Expense Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter expense name" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true }]}
        >
          <Select
            options={[
              { label: "Travel", value: "Travel" },
              { label: "Software", value: "Software" },
              { label: "Hardware", value: "Hardware" },
              { label: "Food", value: "Food" },
              { label: "Other", value: "Other" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
          <Input type="number" placeholder="Enter amount" />
        </Form.Item>

        <Form.Item label="Date" name="date" rules={[{ required: true }]}>
          <DatePicker className="w-full" />
        </Form.Item>

        <Form.Item label="Notes" name="notes">
          <Input.TextArea rows={3} placeholder="Optional notes" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
