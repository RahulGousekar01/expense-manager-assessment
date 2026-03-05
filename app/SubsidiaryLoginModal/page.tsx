"use client";

import { Modal, Input, Form } from "antd";
import { useState } from "react";

const DEFAULT_PASSWORD = "sub@1234";

interface Props {
  open: boolean;
  subsidiaryName: string;
  onSuccess: () => void;
  onClose: () => void;
}

export default function SubsidiaryLoginModal({
  open,
  subsidiaryName,
  onSuccess,
  onClose,
}: Props) {
  const [form] = Form.useForm();
  const [error, setError] = useState("");

  const handleOk = () => {
    const password = form.getFieldValue("password");
    if (password === DEFAULT_PASSWORD) {
      setError("");
      form.resetFields();
      onSuccess();
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const handleClose = () => {
    setError("");
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={
        <div>
          <p className="text-base font-semibold text-gray-900">
            Subsidiary Login
          </p>
          <p className="text-xs text-gray-400 font-normal mt-0.5">
            {subsidiaryName}
          </p>
        </div>
      }
      open={open}
      onCancel={handleClose}
      onOk={handleOk}
      okText="Login"
      okButtonProps={{
        style: { backgroundColor: "#1D6A6A", borderColor: "#1D6A6A" },
      }}
      width={380}
    >
      <div className="py-3">
        <Form form={form} layout="vertical" requiredMark={false}>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter the password" }]}
          >
            <Input.Password
              placeholder="Enter subsidiary password"
              size="large"
            />
          </Form.Item>
        </Form>

        {error && <p className="text-xs text-red-500 -mt-2">{error}</p>}

        <p className="text-xs text-gray-400 mt-3">
          Default password is{" "}
          <span className="font-mono font-medium text-gray-600">sub@1234</span>
        </p>
      </div>
    </Modal>
  );
}
