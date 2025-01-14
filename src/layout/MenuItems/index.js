import { SettingOutlined, DashboardOutlined, DollarOutlined } from "@ant-design/icons";
import { DescriptionOutlined, BusinessCenterOutlined, GroupOutlined, PersonOutlineOutlined, CreditCardOutlined, DirectionsCarOutlined, FlashOnOutlined } from "@mui/icons-material";
import { ApartmentOutlined, AppsOutlined, CategoryOutlined, LocalOfferOutlined } from "@mui/icons-material";

export const getMenuItems = (moduleName) => {
  const aliasForPromoAndSettings = moduleName == "Admin" ? "" : moduleName;
  return [
    { key: "1", icon: <DashboardOutlined />, label: "Dashboard", url: "/", alias: "Dashboard" },
    {
      key: "15",
      icon: <DollarOutlined />, // Icon for PromoCode section
      label: "PromoCode",
      children: [
        {
          key: "16",
          icon: <LocalOfferOutlined />, // Icon for PromoCode child
          label: "PromoCode",
          url: "/promocode",
          alias: aliasForPromoAndSettings // Use conditional alias
        }
      ]
    },
    {
      key: "7",
      icon: <SettingOutlined />, // Icon for Settings section
      label: "Settings",
      children: [
        {
          key: "9",
          icon: <AppsOutlined />, // Icon for AccountApplicationType
          label: "AccountApplicationType",
          url: "/account-application",
          alias: aliasForPromoAndSettings // Use conditional alias
        },
        {
          key: "10",
          icon: <CategoryOutlined />, // Icon for AccountType
          label: "AccountType",
          url: "/account-type",
          alias: aliasForPromoAndSettings // Use conditional alias
        },
        {
          key: "11",
          icon: <ApartmentOutlined />, // Icon for Branch
          label: "Branch",
          url: "/branch",
          alias: aliasForPromoAndSettings // Use conditional alias
        }
      ]
    },
    {
      key: "25",
      label: "Account Opening",
      icon: <DescriptionOutlined />, // Use DescriptionOutlined for Account Opening
      alias: moduleName,
      children: [
        {
          key: "21",
          icon: <PersonOutlineOutlined />, // Icon for Personal
          label: "Personal",
          url: "/reference/account/personal",
          alias: moduleName
        },
        {
          key: "22",
          icon: <CreditCardOutlined />, // Icon for Business
          label: "Business",
          url: "/reference/account/business",
          alias: moduleName
        }
      ]
    },
    {
      key: "30",
      label: "Loan Application",
      icon: <BusinessCenterOutlined />, // Use CreditCardOutlined for Loan Application
      alias: moduleName,
      children: [
        {
          key: "31",
          label: "Personal",
          alias: "Loan Application",
          icon: <PersonOutlineOutlined />, // Icon for Personal Loan section
          children: [
            {
              key: "311",
              icon: <GroupOutlined />, // Icon for Co-Applicant
              label: "Co-Applicant",
              url: "/reference/loan/personal/co-applicant",
              alias: moduleName
            },
            {
              key: "312",
              icon: <PersonOutlineOutlined />, // Icon for Individual
              label: "Individual",
              url: "/reference/loan/personal/individual",
              alias: moduleName
            }
          ]
        },
        {
          key: "32",
          icon: <CreditCardOutlined />, // Icon for Business Loan
          label: "Business",
          url: "/reference/loan/business",
          alias: moduleName
        },
        {
          key: "33",
          icon: <DirectionsCarOutlined />, // Icon for Vehicle Loan
          label: "Vehicle",
          url: "/reference/loan/vehicle",
          alias: moduleName
        },
        {
          key: "34",
          icon: <FlashOnOutlined />, // Icon for Quick Loan
          label: "Quick Loan",
          url: "/reference/loan/quick-loan",
          alias: moduleName
        }
      ]
    }
  ];
};
