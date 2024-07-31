// BrandMenu.js
import React from "react";
import { Menu } from "antd";
import { SiBrandfolder } from "react-icons/si";

const BrandMenu = ({ onClick }) => {
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[""]}
      onClick={({ key }) => onClick(key)}
    >
      <Menu.Item key="">
        <SiBrandfolder />
        <span>Brand Dashboard</span>
      </Menu.Item>
      {/* Add more menu items for brand */}
    </Menu>
  );
};

export default BrandMenu;
