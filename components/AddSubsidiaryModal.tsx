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
    dispatch(addSubsidiary({ id: Date.now().toString(), ...values }));
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={
        <span className="text-base font-semibold text-gray-900">
          Add Subsidiary
        </span>
      }
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Add Subsidiary"
      okButtonProps={{
        style: { backgroundColor: "#1D6A6A", borderColor: "#1D6A6A" },
      }}
      width={440}
    >
      <div className="py-2">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            label="Subsidiary Name"
            name="name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input placeholder="e.g. Acme India Pvt Ltd" size="large" />
          </Form.Item>

          <Form.Item
            label="Default Currency"
            name="currency"
            rules={[{ required: true, message: "Please select a currency" }]}
          >
            <Select
              size="large"
              placeholder="Select currency"
              options={[
                { label: "INR — Indian Rupee", value: "INR" },
                { label: "USD — US Dollar", value: "USD" },
                { label: "EUR — Euro", value: "EUR" },
                { label: "AED — UAE Dirham", value: "AED" },
              ]}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
