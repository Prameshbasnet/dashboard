import React, { useState, useEffect } from 'react';
import { Divider, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { getMenuItems } from '../../../MenuItems/index';
import { useSelector } from 'react-redux';

function DrawerContent() {
  const [mode] = useState('inline');
  const [theme] = useState('light');
  const [selectedKey, setSelectedKey] = useState('');

  const moduleName = useSelector((state) => state?.auth?.role);
  const menuItems = getMenuItems(moduleName);

  useEffect(() => {
    const matchingItem = menuItems.flatMap((item) => (item.children ? item.children : item)).find((item) => item.url === location.pathname);
    if (matchingItem) {
      setSelectedKey(matchingItem.key);
    }
  }, [location.pathname, menuItems]);

  const renderSubMenu = (item) => {
    if (item.children) {
      return (
        <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
          {item.children.map((child) =>
            child.children ? (
              renderSubMenu(child)
            ) : (
              <Menu.Item key={child.key} icon={child.icon}>
                <Link to={child.url}>{child.label}</Link>
              </Menu.Item>
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
        defaultOpenKeys={['sub1']}
        mode={mode}
        theme={theme}
      >
        {menuItems?.map((item) => {
          if (item.children) {
            return renderSubMenu(item);
          } else {
            return (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.url}>{item.label}</Link>
              </Menu.Item>
            );
          }
        })}
      </Menu>
    </>
  );
}

export default DrawerContent;
