import React, { useState } from "react";
import { ToolOutlined, SettingOutlined, LeftCircleOutlined } from "@ant-design/icons";
import { Menu, Divider } from "antd";
import ChangePassword from "./ChangePassword";

const AccountSettings = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedSection, setSelectedSection] = useState("change-password");

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Menu
        mode="vertical"
        selectedKeys={[selectedSection]}
        onClick={({ key }) => handleSectionClick(key)}
        style={{ width: collapsed ? "80px" : "300px", transition: "width 0.3s" }}
        inlineCollapsed={collapsed}
      >
        <div style={{ textAlign: "center", marginTop: "1.6rem" }}>
          <p style={{ margin: "-3px 0", fontSize: "18px", fontWeight: "bold", color: "#1890ff" }}>
            {!collapsed ? (
              <>
                <LeftCircleOutlined onClick={toggleCollapsed} style={{ fontSize: "18px", marginRight: "5px", cursor: "pointer" }} />
                Account Settings
              </>
            ) : (
              <ToolOutlined onClick={toggleCollapsed} style={{ fontSize: "18px", cursor: "pointer" }} />
            )}
          </p>
        </div>

        <Divider
          style={{
            margin: "36px 0px"
          }}
        />
        <Menu.Item key="change-password" icon={<SettingOutlined />}>
          Security
        </Menu.Item>
      </Menu>

      <div style={{ flex: 1 }}>{selectedSection === "change-password" && <ChangePassword />}</div>
    </div>
  );
};

export default AccountSettings;
