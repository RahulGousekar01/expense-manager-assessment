"use client";

import { Button, Form, Input, Select } from "antd";
import { useAppDispatch } from "@/store/hooks/reduxHooks";
import { setOrganization } from "@/features/organization/organizationSlice";
import { useRouter } from "next/navigation";
import { OrganizationFormValues } from "@/types/models";

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onFinish = (values: OrganizationFormValues) => {
    dispatch(
      setOrganization({
        id: Date.now().toString(),
        name: values.name,
        baseCurrency: values.baseCurrency,
      }),
    );
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 rounded bg-teal flex items-center justify-center text-white text-xs font-bold">
            ST
          </div>
          <span className="font-semibold text-gray-900">SpendTrack</span>
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Create your organization
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Set up your workspace to get started.
        </p>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
            <Form.Item
              label="Organization Name"
              name="name"
              rules={[{ required: true, message: "Please enter a name" }]}
            >
              <Input placeholder="e.g. Acme Corp" size="large" />
            </Form.Item>

            <Form.Item
              label="Base Currency"
              name="baseCurrency"
              rules={[{ required: true, message: "Please select a currency" }]}
            >
              <Select
                size="large"
                placeholder="Select currency"
                className="w-full"
                options={[
                  { label: "USD — US Dollar", value: "USD" },
                  { label: "INR — Indian Rupee", value: "INR" },
                  { label: "EUR — Euro", value: "EUR" },
                  { label: "AED — UAE Dirham", value: "AED" },
                ]}
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              style={{ backgroundColor: "#1D6A6A", borderColor: "#1D6A6A" }}
            >
              Get Started
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
