import React, { useEffect } from "react";
import { Modal, Form, Select } from "antd";

export default function AssignRoleModal({
  openModal,
  onClose,
  employeeData,
  onSubmit,
}) {
  const { Option } = Select;
  const [form] = Form.useForm();

  const onFinish = (values) => {
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

  useEffect(() => {
    form.setFieldsValue(employeeData);
  }, [employeeData, form]);

  return (
    <>
      <Modal
        title={
          <p className="text-2xl font-bold mb-4 w-full">Assign New Role</p>
        }
        open={openModal}
        onOk={handleOk}
        okText="Assign Role"
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select placeholder="Select an option" allowClear>
              <Option value="User">User</Option>
              <Option value="Superadmin">Superadmin</Option>
              <Option value="Head Of Department">Head Of Department</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
