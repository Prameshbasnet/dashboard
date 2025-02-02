import { Table, Space, Tag, Button, Input, Checkbox } from "antd";
import { SearchOutlined, CaretDownOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { checkIsAuthorized } from "utils/checkIsAuthorized";
import { useEffect, useState } from "react";
import { decodeBase64Data } from "utils/decode";

const TableComponent = ({
  roles,
  handleEdit,
  handleDelete,
  sortedInfo,
  handleChange,
  searchText,
  searchedColumn,
  handleSearch,
  handleReset
}) => {
  const [tableKey, setTableKey] = useState(Math.random());
  const [showActive, setShowActive] = useState(false);
  const [showInactive, setShowInactive] = useState(false);

  useEffect(() => {
    setTableKey(Math.random());
  }, [roles]);

  // const allModulePerms = useSelector((state) => state.auth.modulePermissions) || [];

      let allModulePerms;
      const localToken = localStorage.getItem("token");
      const decodedData = decodeBase64Data(localToken);

      if (decodedData) {
        const { modulePermission } = decodedData;
        allModulePerms = modulePermission;
      }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div role="button" tabIndex={0} onKeyDown={(e) => e.stopPropagation()}>
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
          <Button type="primary" onClick={() => handleSearch(selectedKeys, confirm, dataIndex)} icon={<SearchOutlined />} size="small">
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small">
            Reset
          </Button>
        </Space>
      </div>
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
      headerStyle: { background: "#e6f7ff" },
      ...getColumnSearchProps("name")
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      headerStyle: { background: "#e6f7ff" },
      ...getColumnSearchProps("description")
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <span>
          <Tag color={isActive ? "green" : "red"}>{isActive ? "true" : "false"}</Tag>
        </span>
      ),
      headerStyle: { background: "#e6f7ff" },
      filterDropdown: () => (
        <div style={{ padding: 8, display: "flex", flexDirection: "column" }}>
          <Checkbox checked={showActive} onChange={(e) => setShowActive(e.target.checked)} style={{ marginBottom: "5px" }}>
            Active
          </Checkbox>
          <Checkbox checked={showInactive} onChange={(e) => setShowInactive(e.target.checked)}>
            Inactive
          </Checkbox>
        </div>
      ),
      filterIcon: () => <CaretDownOutlined />,
      onFilter: (value, record) => {
        if (value === "active") {
          return record.isActive === true;
        } else if (value === "inactive") {
          return record.isActive === false;
        }
        return false;
      },
      filteredValue: showActive && showInactive ? null : showActive ? ["active"] : showInactive ? ["inactive"] : null
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {checkIsAuthorized(allModulePerms, "Master", "Update") && (
            <Button onClick={() => handleEdit(record.id)}>
              <EditOutlined />
            </Button>
          )}
          {checkIsAuthorized(allModulePerms, "Master", "Delete") && (
            <Button onClick={() => handleDelete(record.id)}>
              <DeleteOutlined />
            </Button>
          )}
        </Space>
      ),
      headerStyle: { background: "#e6f7ff" }
    }
  ];

  const filteredData = roles?.filter(
    (item) =>
      item?.name?.toLowerCase().includes(searchText?.toLowerCase()) || item?.description?.toLowerCase().includes(searchText?.toLowerCase())
  );
  const paginationSettings = { defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ["3", "5", "10", "20", "30"] };
  return (
    <>
      <Table
        key={tableKey}
        scroll={{ x: "max-content" }}
        columns={columns}
        dataSource={Array.isArray(filteredData) ? filteredData : []}
        onChange={handleChange}
        pagination={paginationSettings}
      />
    </>
  );
};

export default TableComponent;
