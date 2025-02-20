import { SettingOutlined, DashboardOutlined } from '@ant-design/icons';

export const getMenuItems = () => {
  return [
    { key: '1', icon: <DashboardOutlined />, label: 'Dashboard', url: '/', alias: 'Dashboard' },
    {
      key: '2',
      icon: <SettingOutlined />,
      label: 'Setting',
      children: [{ key: '3', label: 'User', url: '/user', alias: 'Master' }]
    }
  ];
};
