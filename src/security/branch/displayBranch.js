/* eslint-disable */

import { Stack, Typography, Button, Grid } from "@mui/material";
import ReusableModal from "components/modal/ReusableModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "components/Toast";
import { EditOutlined, DeleteOutlined, PlusCircleFilled } from "@ant-design/icons";
import DialogMessage from "components/DialogMessage";
import { Table, Pagination, Space, Input, Popconfirm } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { deleteBranch, fetchBranch, selectAllBranch } from "store/slice/branch";
import BranchForm from "./branchForm";
import { checkIsAuthorized } from "utils/checkIsAuthorized";
import { decodeBase64Data } from "utils/decode";

const DisplayBranch = () => {
  const dispatch = useDispatch();
  const [showForm, setshowForm] = useState(false);
  const branches = useSelector(selectAllBranch);
  const [branchId, setBranchId] = useState("");
  const [isNewBranch, setNewBranch] = useState(true);
  const [openMessageDialog, setopenDialogMessage] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredInfo, setFilteredInfo] = useState({});
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  let allModulePerms;
  const localToken = localStorage.getItem("token");
  const decodedData = decodeBase64Data(localToken);

  if (decodedData) {
    const { modulePermission } = decodedData;
    allModulePerms = modulePermission;
  }

  useEffect(() => {
    dispatch(fetchBranch());
  }, [dispatch]);

  const handleshowForm = () => {
    setshowForm(!showForm);
    setNewBranch(true);
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const handleEdit = (id) => {
    handleshowForm();
    setBranchId(id);
    setNewBranch(false);
  };

  const handleDelete = (id) => {
    setBranchId(id);
    handleDeleteFinal(id);
  };

  const handleDeleteFinal = (id) => {
    dispatch(deleteBranch(id))
      .unwrap()
      .then(() => {
        setBranchId("");
        setopenDialogMessage(false);
        setToastMessage("Deleted Successfully");
        setOpenToast(true);
      })
      .catch(() => {
        setBranchId("");
        setToastMessage("Unable to Delete");
        setopenDialogMessage(false);
      });
  };

  const handleChange = (_pagination, filters, sorter) => {
    setFilteredInfo(filters);
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
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(selectedKeys, confirm, dataIndex);
        }}
      >
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block"
          }}
        />
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90
            }}
          >
            Reset
          </Button>
        </Space>
      </form>
    ),
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      )
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      ...getColumnSearchProps("name")
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description")
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
      sortOrder: sortedInfo.columnKey === "code" && sortedInfo.order,
      ...getColumnSearchProps("code")
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {checkIsAuthorized(allModulePerms, "Master", "Update") && (
            <Button onClick={() => handleEdit(record.id)}>
              <EditOutlined />
            </Button>
          )}
          {checkIsAuthorized(allModulePerms, "Master", "Delete") && (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
              <DeleteOutlined style={{ color: "red" }} />
            </Popconfirm>
          )}
        </Space>
      )
    }
  ];

  const filteredData = branches?.filter(
    (item) =>
      item?.name?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      item?.description?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      item?.code?.toLowerCase()?.includes(searchText?.toLowerCase())
  );
  const paginationSettings = { defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ["3", "5", "10", "20", "30"] };

  return (
    <div style={{ padding: "50px" }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Branches
        </Typography>
        {checkIsAuthorized(allModulePerms, "Master", "Create") && (
          <Button onClick={handleshowForm} variant="primary" startIcon={<PlusCircleFilled />}>
            New Branch
          </Button>
        )}
      </Stack>
      <ReusableModal
        open={showForm}
        onClose={handleshowForm}
        title={isNewBranch === true ? "Add Branch" : "Edit Branch"}
        style={{ padding: "100px" }}
      >
        <BranchForm onClose={handleshowForm} branchId={branchId} isNewBranch={isNewBranch} />
      </ReusableModal>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Table
            columns={columns}
            dataSource={filteredData}
            onChange={handleChange}
            pagination={paginationSettings}
            filteredInfo={filteredInfo}
          />
        </Grid>
      </Grid>
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

export default DisplayBranch;
