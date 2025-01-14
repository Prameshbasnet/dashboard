import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import {  QuestionCircleOutlined } from "@ant-design/icons";

const SettingTab = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    navigate("/account-settings");
  };

  return (
    <List component="nav" sx={{ p: 0, "& .MuiListItemIcon-root": { minWidth: 32, color: theme.palette.grey[500] } ,}}>
      <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
        <ListItemIcon>
          <QuestionCircleOutlined />
        </ListItemIcon>
        <ListItemText primary="Change Password" />
      </ListItemButton>
    </List>
  );
};

export default SettingTab;
