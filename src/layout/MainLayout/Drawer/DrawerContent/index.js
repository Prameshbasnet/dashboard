import React, { useState, useEffect } from "react";
import { Divider, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { getMenuItems } from "../../../MenuItems/index";
import { checkIsAuthorized } from "utils/checkIsAuthorized";
import { useSelector } from "react-redux";

function DrawerContent() {
  const [mode] = useState("inline");
  const [theme] = useState("light");
  const location = useLocation(); // Get current URL location
  const [selectedKey, setSelectedKey] = useState("");

  // Get the role (moduleName) from Redux state
  const moduleName = useSelector((state) => state?.auth?.role);
  const allModulePerms = useSelector((state) => state?.auth?.permissions) || [];

  // Generate menu items based on the module name
  const menuItems = getMenuItems(moduleName);

  // Set selected key based on the current location
  useEffect(() => {
    const matchingItem = menuItems
      .flatMap((item) => (item.children ? item.children : item))
      .find((item) => item.url === location.pathname);
    if (matchingItem) {
      setSelectedKey(matchingItem.key);
    }
  }, [location.pathname, menuItems]);

  const renderSubMenu = (item) => {
    if (item.children && item.children.some((child) => checkIsAuthorized(allModulePerms, child.alias))) {
      return (
        <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
          {item.children.map((child) =>
            child.children ? (
              renderSubMenu(child) // Recursively render submenus
            ) : (
              checkIsAuthorized(allModulePerms, child.alias) && (
                <Menu.Item key={child.key} icon={child.icon}>
                  <Link to={child.url}>{child.label}</Link>
                </Menu.Item>
              )
            )
          )}
        </Menu.SubMenu>
      );
    }
    return null;
  };

  return (
    <>
      <Divider type="vertical" />
      <br />
      <br />
      <Menu
        style={{ width: 256 }}
        selectedKeys={[selectedKey]} // Use the dynamic selected key
        defaultOpenKeys={["sub1"]}
        mode={mode}
        theme={theme}
      >
        {menuItems?.map((item) => {
          if (item.children) {
            return renderSubMenu(item);
          } else if (item.alias === "Dashboard") {
            return (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.url}>{item.label}</Link>
              </Menu.Item>
            );
          } else if (!item.children && checkIsAuthorized(allModulePerms, item.alias)) {
            return (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.url}>{item.label}</Link>
              </Menu.Item>
            );
          }
          return null; // Ensure we return null for non-rendered items
        })}
      </Menu>
    </>
  );
}

export default DrawerContent;
