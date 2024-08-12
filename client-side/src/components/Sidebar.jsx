import { Menu, Button, Avatar } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import {
  UserOutlined,
  ApartmentOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { USER } from "../helpers/constant";
import Swal from "sweetalert2";
import { LogoutOutlined } from "@ant-design/icons";

const sidebarItems = [
  {
    key: "/",
    icon: <ApartmentOutlined />,
    label: "Dashboard",
  },
  {
    key: "/account-management",
    icon: <UsergroupAddOutlined />,
    label: "Account Management",
  },
];

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dataUser = JSON.parse(localStorage.getItem(USER));

  const handleLinks = (key) => {
    navigate(key);
  };

  const handleLogout = () => {
    localStorage.clear();
    Swal.fire({
      icon: "success",
      title: "Logout",
      text: "You already logout from Web Internal PT Ondel",
    });
    navigate("/login");
  };

  return (
    <>
      <Sider
        trigger={null}
        collapsible
        style={{ backgroundColor: "#2C75B6", color: "black" }}
      >
        <div className="flex flex-col gap-11 w-full h-screen overflow-scroll hide-scrollbar">
          <div className="flex flex-col gap-2 items-center h-24 mx-auto mt-11 w-fit text-white">
            <p className="text-xl">ONDELIVERY</p>

            <div>
              <Avatar
                size={64}
                icon={<UserOutlined className="text-black" />}
                className="bg-gray-200"
              />
            </div>

            <p className="text-lg">{dataUser?.username || "user"}</p>
          </div>
          <Menu
            onClick={({ key }) => handleLinks(key)}
            className="h-2/3 overflow-scroll hide-scrollbar"
            theme="dark"
            mode="inline"
            items={sidebarItems}
            style={{ backgroundColor: "#2C75B6", color: "black" }}
          />

          <div className="h-11 mx-auto mb-11 w-fit">
            <Button
              className="flex items-center gap-2 font-bold"
              onClick={() => handleLogout()}
            >
              <LogoutOutlined className="" />
              <p>Logout</p>
            </Button>
          </div>
        </div>
      </Sider>
    </>
  );
}

export default Sidebar;
