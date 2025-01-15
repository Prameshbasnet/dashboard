import { SettingOutlined, DashboardOutlined, DollarOutlined } from '@ant-design/icons';
import {
  DescriptionOutlined,
  BusinessCenterOutlined,
  GroupOutlined,
  PersonOutlineOutlined,
  CreditCardOutlined,
  DirectionsCarOutlined,
  FlashOnOutlined
} from '@mui/icons-material';
import { ApartmentOutlined, AppsOutlined, CategoryOutlined, LocalOfferOutlined } from '@mui/icons-material';

export const getMenuItems = (moduleName) => {
  const aliasForPromoAndSettings = moduleName == 'Admin' ? '' : moduleName;
  return [
    { key: '1', icon: <DashboardOutlined />, label: 'Dashboard', url: '/', alias: 'Dashboard' },
    {
      key: '15',
      icon: <DollarOutlined />, // Icon for PromoCode section
      label: 'PromoCode',
      children: [
        {
          key: '16',
          icon: <LocalOfferOutlined />, // Icon for PromoCode child
          label: 'PromoCode',
          url: '/promocode',
          alias: aliasForPromoAndSettings // Use conditional alias
        }
      ]
    }
  ];
};
