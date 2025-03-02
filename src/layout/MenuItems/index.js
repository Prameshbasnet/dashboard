import { SettingOutlined, DashboardOutlined, QrcodeOutlined, FileSearchOutlined, AppstoreOutlined } from '@ant-design/icons';

export const getMenuItems = () => {
  return [
    { key: '1', icon: <DashboardOutlined />, label: 'Dashboard', url: '/', alias: 'Dashboard' },
    { key: '3', icon: <FileSearchOutlined />, label: 'Review', url: '/review', alias: 'Reviews' },
    {
      key: '4',
      icon: <QrcodeOutlined />,
      label: 'Generate QR Code',
      url: '/generate-qr-code',
      alias: 'GenerateQrCode'
    },
    {
      key: '2',
      icon: <SettingOutlined />,
      label: 'Setting',
      children: [{ key: '5', icon: <AppstoreOutlined />, label: 'Food', url: '/food', alias: 'Master' }]
    }
  ];
};
