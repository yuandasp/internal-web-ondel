import React, { useEffect } from "react";
import { Input, Modal, Upload, DatePicker, Form, Select, Row, Col } from "antd";
import { InboxOutlined } from "@ant-design/icons";

export default function EditEmployeeProfileModal({
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
        title={<p className="text-2xl font-bold mb-4 w-full">Edit Employee</p>}
        open={openModal}
        onOk={handleOk}
        okText="Edit Employee"
        onCancel={handleCancel}
      >
        <Form
          // labelCol={{ span: 12 }}
          // wrapperCol={{ span: 18 }}
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name="employeeName"
            label="Employee Name"
            rules={[
              {
                required: true,
                message: "Please input the employee name!",
              },
            ]}
          >
            <Input placeholder="Employee Name" />
          </Form.Item>

          <Form.Item name="position" label="Position">
            <Input placeholder="Position" />
          </Form.Item>

          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select placeholder="Select an option" allowClear>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
              <Option value="On Holiday">On Holiday</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
