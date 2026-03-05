"use client";

import { Modal, Form, Input, Select } from "antd";
import { useAppDispatch } from "@/store/hooks/reduxHooks";
import { addSubsidiary } from "@/features/subsidiaries/subsidiarySlice";
import { Subsidiary } from "@/types/models";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddSubsidiaryModal({ open, onClose }: Props) {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const onFinish = (values: Omit<Subsidiary, "id">) => {
    const newSubsidiary: Subsidiary = {
      id: Date.now().toString(),
      ...values,
    };

    dispatch(addSubsidiary(newSubsidiary));

    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Add Subsidiary"
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Subsidiary Name"
          name="name"
          rules={[{ required: true, message: "Enter subsidiary name" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          label="Default Currency"
          name="currency"
          rules={[{ required: true }]}
        >
          <Select
            options={[
              { label: "INR", value: "INR" },
              { label: "USD", value: "USD" },
              { label: "EUR", value: "EUR" },
              { label: "AED", value: "AED" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
