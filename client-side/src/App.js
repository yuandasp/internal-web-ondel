import { Button, Layout } from "antd";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import PrivateRoute from "./components/PrivateRoute";
import AuthRoute from "./components/AuthRoute";
import AccountManagement from "./pages/AccountManagement";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";

const { Header, Content } = Layout;

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isUrlNotLogin = location.pathname !== "/login";

  return (
    <>
      <Layout className="min-h-screen">
        {isUrlNotLogin && <Sidebar />}

        {/* <Layout className="site-layout">
          {isUrlNotLogin && (
            <Fragment>
              <Header className="site-layout-background px-6 flex justify-between items-center">
                {collapsed ? (
                  <MenuUnfoldOutlined
                    className="trigger"
                    onClick={() => setCollapsed(!collapsed)}
                  />
                ) : (
                  <MenuFoldOutlined
                    className="trigger"
                    onClick={() => setCollapsed(!collapsed)}
                  />
                )}

                <Button
                  className="flex items-center gap-2 font-bold"
                  onClick={() => handleLogout()}
                >
                  <LogoutOutlined className="" />
                  <p>Logout</p>
                </Button>
              </Header>
            </Fragment>
          )}
        </Layout> */}

        {/* <Content className="site-layout-background h-[calc(100vh-(64px+24px+24px))] overflow-scroll hide-scrollbar"> */}
        <Content>
          <Routes>
            <Route element={<AuthRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route
                path="/account-management"
                element={<AccountManagement />}
              />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </Content>
      </Layout>
    </>
  );
}

export default App;
