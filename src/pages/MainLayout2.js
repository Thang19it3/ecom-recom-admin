import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import AdminMenu from "./AdminMenu"; // Import the AdminMenu component
import BrandMenu from "./BrandMenu"; // Import the BrandMenu component

const { Header, Sider, Content } = Layout;

const MainLayout2 = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // Assume you have logic to determine the user role after login
  const userRole = "admin"; // Replace this with actual logic to determine user role

  const handleMenuClick = (key) => {
    if (key === "signout") {
      // Perform logout logic
    } else {
      navigate(key);
    }
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* Based on the user role, render the appropriate menu */}
        {userRole === "admin" ? (
          <AdminMenu onClick={handleMenuClick} />
        ) : (
          <BrandMenu onClick={handleMenuClick} />
        )}
      </Sider>
      {/* Rest of your layout code */}
    </Layout>
  );
};

export default MainLayout2;