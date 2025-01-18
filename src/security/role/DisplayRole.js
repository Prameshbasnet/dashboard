import { Stack, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { deleteRole, fetchRoles, selectAllRole } from "../../store/slice/role";
import Toast from "components/Toast";
import { PlusCircleFilled } from "@ant-design/icons";
import DialogMessage from "components/DialogMessage";
import TableComponent from "./RoleTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuthorized } from "utils/checkIsAuthorized";
import { decodeBase64Data } from "utils/decode";

const DisplayRoles = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roles = useSelector(selectAllRole);
  const [roleId, setRoleId] = useState("");
  const [openMessageDialog, setopenDialogMessage] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [sortedInfo, setSortedInfo] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [roleData, setRoleData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [toastSeverity, setToastSeverity] = useState("success");

      let allModulePerms;
      const localToken = localStorage.getItem("token");
      const decodedData = decodeBase64Data(localToken);

      if (decodedData) {
        const { modulePermission } = decodedData;
        allModulePerms = modulePermission;
      }

  useEffect(() => {
    dispatch(fetchRoles());
  }, []);

  const handleshowForm = (isEdit = false, id = null) => {
    if (isEdit) {
      setRoleData(id);
      navigate(`/edit-role/${id}`);
    } else {
      setRoleData(null);
      navigate("/add-role");
    }
  };

  const handleEdit = (id) => {
    handleshowForm(true, id);
  };

  const handleDelete = (id) => {
    setRoleId(id);
    setopenDialogMessage(true);
  };

  const handleDeleteFinal = () => {
    dispatch(deleteRole(roleId))
      .unwrap()
      .then((res) => {
        if (res.success) {
          setToastSeverity("success");
          setToastMessage(res.message);
          setOpenToast(true);
        } else {
          setToastSeverity("error");
          setToastMessage(res.message);
          setOpenToast(true);
        }
        setopenDialogMessage(false);
      })
      .catch((error) => {
        setRoleId("");
        setToastSeverity("error");
        setToastMessage(error.message);
        setOpenToast(true);
      });
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  return (
    <div style={{ width: "100%", padding: "50px" }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Roles
        </Typography>
        {checkIsAuthorized(allModulePerms, "Master", "Create") && (
          <Button onClick={() => handleshowForm(false)} variant="primary" startIcon={<PlusCircleFilled />}>
            New Role
          </Button>
        )}
      </Stack>
      <TableComponent
        roles={roles}
        sortedInfo={sortedInfo}
        handleChange={handleChange}
        searchText={searchText}
        searchedColumn={searchedColumn}
        handleSearch={handleSearch}
        handleReset={handleReset}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <DialogMessage
        open={openMessageDialog}
        onClose={() => setopenDialogMessage(!openMessageDialog)}
        title={"Warning!!!"}
        message={"Are you sure you want to Delete?"}
        disagreeButton
        handlefunction={handleDeleteFinal}
      />
      <Toast open={openToast} onClose={handleCloseToast} severity="success" message={toastMessage} />
    </div>
  );
};

export default DisplayRoles;
