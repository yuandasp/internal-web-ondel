import React, { useEffect } from "react";
import { Input, Modal, Form, Select } from "antd";
import { useUserStore } from "../store/userStore";
import Swal from "sweetalert2";

export default function CreateEmployeeModal({ openModal, onClose, onSubmit }) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const { createEmployee } = useUserStore();

  const onFinish = (values) => {
    onSubmit(values);

    try {
      createEmployee(values);
      onClose(false);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Success create employee",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!!",
      });
      onClose(false);
    }
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
          <p className="text-2xl font-bold mb-4 w-full">Create Employee</p>
        }
        open={openModal}
        onOk={handleOk}
        okText="Create Employee"
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please input the username!",
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>
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

          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select placeholder="Select an option" allowClear>
              <Option value="user">User</Option>
              <Option value="superadmin">Superadmin</Option>
              <Option value="headOfDepartment">Head Of Department</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
