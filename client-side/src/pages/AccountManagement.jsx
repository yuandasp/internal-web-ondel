import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { useUserStore } from "../store/userStore";
import Swal from "sweetalert2";
import { USER } from "../helpers/constant";
import EditEmployeeProfileModal from "../components/EditProfileEmployeeModal";
import ChangePasswordModal from "../components/ChangePasswordModal";
import AssignRoleModal from "../components/AssignRoleModal";
import CreateEmployeeModal from "../components/CreateEmployeeModal";

function AccountManagement() {
  const [dataUser, setDataUser] = useState({});
  const {
    employees,
    fetchAllEmployee,
    editEmployee,
    assignRole,
    changePasswordEmployee,
  } = useUserStore();
  const [formEditEmployee, setFormEditEmployee] = useState({
    employeeName: "",
    position: "",
    status: "",
  });
  const [formAssignRoleEmployee, setFormAssignRoleEmployee] = useState({
    role: "",
  });
  const [idEmployee, setIdEmployee] = useState("");
  const [isCreateEmployeeModalOpen, setIsCreateEmployeeModalOpen] =
    useState(false);
  const [isEditEmployeeModalOpen, setIsEditEmployeeModalOpen] = useState(false);
  const [isAssignRoleModalOpen, setIsAssignRoleModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //function to create employee
  const closeCreateEmployeeModal = () => {
    setIsCreateEmployeeModalOpen(false);
  };

  const handleCreateEmployee = () => {
    setIsCreateEmployeeModalOpen(true);
  };
  //

  //function to edit employee's profile
  const closeEditEmployeeModal = () => {
    setIsEditEmployeeModalOpen(false);
  };

  const handleEditEmployee = (record) => {
    setIdEmployee(record._id);
    setFormEditEmployee({
      employeeName: record.employeeName,
      position: record.position,
      status: record.status,
    });
    setIsEditEmployeeModalOpen(true);
  };

  const onClickSubmitEditHandler = async (values) => {
    try {
      setIsLoading(true);
      editEmployee(idEmployee, values);
      setIsLoading(false);
      setIsEditEmployeeModalOpen(false);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Success edit employee",
      });

      setFormEditEmployee({
        employeeName: "",
        position: "",
        status: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!!",
      });
      setIsLoading(false);
      setIsEditEmployeeModalOpen(false);
    }
  };
  //

  //function to change password employee
  const closeChangePasswordModal = () => {
    setIsChangePasswordModalOpen(false);
  };

  const handleChangePassword = (record) => {
    setIdEmployee(record._id);
    setIsChangePasswordModalOpen(true);
  };

  const onClickSubmitChangePasswordHandler = async (values) => {
    try {
      setIsLoading(true);
      changePasswordEmployee(idEmployee, values);
      setIsLoading(false);
      setIsChangePasswordModalOpen(false);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Success change password employee",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!!",
      });
      setIsLoading(false);
      setIsChangePasswordModalOpen(false);
    }
  };
  //

  //function to assign role employee
  const closeAssignRoleModal = () => {
    setIsAssignRoleModalOpen(false);
  };

  const handleAssignRole = (record) => {
    setIdEmployee(record._id);
    setFormAssignRoleEmployee({
      role: record.role,
    });
    setIsAssignRoleModalOpen(true);
  };

  const onClickSubmitAssignRoleHandler = async (values) => {
    try {
      setIsLoading(true);
      assignRole(idEmployee, values);
      setIsLoading(false);
      setIsAssignRoleModalOpen(false);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Success assign new role",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!!",
      });
      setIsLoading(false);
      setIsAssignRoleModalOpen(false);
    }
  };
  //

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <Button
            onClick={() => handleEditEmployee(record)}
            className="border-blue-500 border-1 text-blue-500 "
          >
            Edit Employee
          </Button>

          {["superadmin"].includes(dataUser?.role) && (
            <>
              <Button
                onClick={() => handleAssignRole(record)}
                className="border-blue-500 border-1 text-blue-500 "
              >
                Assign Role
              </Button>
              <Button
                onClick={() => handleChangePassword(record)}
                className="border-blue-500 border-1 text-blue-500 "
              >
                Change Password
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchAllEmployee();
  }, []);

  useEffect(() => {
    setDataUser(JSON.parse(localStorage.getItem(USER)));
  }, [localStorage[USER]]);

  return (
    <div className="m-11">
      <p className="text-2xl font-bold mb-11">Account Management</p>

      <div className="bg-white rounded-md p-4">
        <p className="text-lg font-semibold">Employee List</p>
        <div className="my-4">
          <Button
            type="primary"
            className="font-semibold flex gap-2 items-center"
            onClick={() => handleCreateEmployee()}
          >
            <p>+</p>
            <p>Create Employee</p>
          </Button>
        </div>
        <Table
          dataSource={employees}
          columns={columns}
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
        />

        <CreateEmployeeModal
          openModal={isCreateEmployeeModalOpen}
          onClose={closeCreateEmployeeModal}
        />
        <ChangePasswordModal
          openModal={isChangePasswordModalOpen}
          onClose={closeChangePasswordModal}
          onSubmit={onClickSubmitChangePasswordHandler}
        />
        <EditEmployeeProfileModal
          openModal={isEditEmployeeModalOpen}
          onClose={closeEditEmployeeModal}
          employeeData={formEditEmployee}
          onSubmit={onClickSubmitEditHandler}
        />
        <AssignRoleModal
          openModal={isAssignRoleModalOpen}
          onClose={closeAssignRoleModal}
          employeeData={formAssignRoleEmployee}
          onSubmit={onClickSubmitAssignRoleHandler}
        />
      </div>
    </div>
  );
}

export default AccountManagement;
