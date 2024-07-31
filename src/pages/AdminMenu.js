import React from "react";
import { Menu } from "antd";
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";

const AdminMenu = ({ onClick }) => {
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[""]}
      onClick={({ key }) => onClick(key)}
    >
      <Menu.Item key="">
        <AiOutlineDashboard />
        <span>Dashboard2</span>
      </Menu.Item>
      <Menu.Item key="customers">
        <AiOutlineUser />
        <span>Customers</span>
      </Menu.Item>
      {/* Add more menu items for admin */}
    </Menu>
  );
};

export default AdminMenu;