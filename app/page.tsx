"use client";

import { Button, Card, Form, Input, Select } from "antd";
import { useAppDispatch } from "@/store/hooks/reduxHooks";
import { setOrganization } from "@/features/organization/organizationSlice";
import { useRouter } from "next/navigation";
import { OrganizationFormValues } from "@/types/models";

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onFinish = (values: OrganizationFormValues) => {
    const organization = {
      id: Date.now().toString(),
      name: values.name,
      baseCurrency: values.baseCurrency,
    };

    dispatch(setOrganization(organization));

    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <Card
        title="Create Organization"
        className="w-full max-w-md shadow-lg rounded-xl"
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Organization Name"
            name="name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="Enter organization name" />
          </Form.Item>

          <Form.Item
            label="Base Currency"
            name="baseCurrency"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { label: "USD", value: "USD" },
                { label: "INR", value: "INR" },
                { label: "EUR", value: "EUR" },
                { label: "AED", value: "AED" },
              ]}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Create Organization
          </Button>
        </Form>
      </Card>
    </div>
  );
}
