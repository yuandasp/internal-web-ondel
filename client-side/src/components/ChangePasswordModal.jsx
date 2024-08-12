import React from "react";
import { Input, Modal, Form } from "antd";

export default function ChangePasswordModal({ openModal, onClose, onSubmit }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log({ values });

    onSubmit(values);
  };

  const handleOk = async () => {
    try {
      await form.validateFields();
      form.submit();
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <Modal
        title={
          <p className="text-2xl font-bold mb-4 w-full">Change Password</p>
        }
        open={openModal}
        onOk={handleOk}
        okText="Change Password"
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              {
                required: true,
                message: "Please input the new password!",
              },
            ]}
          >
            <Input placeholder="New Password" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
