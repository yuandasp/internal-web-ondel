import React, { useEffect } from "react";
import { Table } from "antd";
import { useUserStore } from "../store/userStore";

function Home() {
  const {
    employees,
    fetchAllEmployee,
    fetchDetailEmployee,
    createEmployee,
    editEmployee,
    assignRole,
    changePasswordEmployee,
  } = useUserStore();

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
  ];

  useEffect(() => {
    fetchAllEmployee();
  }, []);

  return (
    <div className="m-11">
      <p className="text-2xl font-bold mb-11">Dashboard</p>

      <div className="bg-white rounded-md p-4">
        <p className="text-lg mb-4 font-semibold">Employee Summary</p>
        <Table
          dataSource={employees}
          columns={columns}
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
}

export default Home;
