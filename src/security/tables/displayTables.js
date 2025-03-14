import { Stack, Typography, Button, Grid } from '@mui/material';
import ReusableModal from 'components/modal/ReusableModal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'components/Toast';
import { EditOutlined, DeleteOutlined, PlusCircleFilled } from '@ant-design/icons';
import DialogMessage from 'components/DialogMessage';
import { Table, Space, Input, Popconfirm } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { deleteTable, fetchTables, selectAllTables } from 'store/slice/tables';
import TableForm from './tableForm';

const DisplayTables = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [tableId, setTableId] = useState('');
  const [isNewTable, setNewTable] = useState(true);
  const [openMessageDialog, setOpenDialogMessage] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [sortedInfo, setSortedInfo] = useState({});
  const [tableData, setTableData] = useState(null);
  console.log(sortedInfo);

  const tables = useSelector(selectAllTables);

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  const handleShowForm = () => {
    setShowForm(!showForm);
    setNewTable(true);
  };

  const handleCloseToast = () => setOpenToast(false);

  const handleEdit = (id) => {
    handleShowForm();
    setTableId(id);
    setNewTable(false);
    const table = tables.find((tab) => tab.id === id);
    setTableData(table);
  };

  const handleDeleteFinal = (id) => {
    dispatch(deleteTable(id))
      .unwrap()
      .then(() => {
        setTableId('');
        setOpenDialogMessage(false);
        setToastMessage('Deleted Successfully');
        setOpenToast(true);
      })
      .catch(() => {
        setTableId('');
        setToastMessage('Unable to Delete');
        setOpenDialogMessage(false);
      });
  };

  const handleChange = (_pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  });

  const statusFilters = [
    { text: 'Available', value: 'Available' },
    { text: 'Occupied', value: 'Occupied' },
    { text: 'Reserved', value: 'Reserved' }
  ];

  const columns = [
    {
      title: 'Table Name',
      dataIndex: 'tableName',
      key: 'tableName',
      sorter: (a, b) => a.tableName.localeCompare(b.tableName),
      ...getColumnSearchProps('tableName')
    },
    {
      title: 'Table Number',
      dataIndex: 'tableNumber',
      key: 'tableNumber',
      sorter: (a, b) => a.tableNumber - b.tableNumber,
      ...getColumnSearchProps('tableNumber')
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
      sorter: (a, b) => a.capacity - b.capacity,
      ...getColumnSearchProps('capacity')
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: statusFilters,
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <span
          style={{
            color: status === 'Available' ? 'green' : status === 'Occupied' ? 'red' : 'orange',
            fontWeight: '500'
          }}
        >
          {status}
        </span>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record.id)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Are you sure to delete this table?"
            onConfirm={() => handleDeleteFinal(record.id)}
            onCancel={() => setOpenDialogMessage(false)}
          >
            <DeleteOutlined style={{ color: 'red' }} />
          </Popconfirm>
        </Space>
      )
    }
  ];

  const filteredData = tables.filter((item) =>
    Object.keys(item).some((key) => item[key]?.toString().toLowerCase().includes(searchText.toLowerCase()))
  );

  const paginationSettings = {
    defaultPageSize: 5,
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '20', '50']
  };

  return (
    <div style={{ padding: '50px' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Table Management
        </Typography>
        <Button onClick={handleShowForm} variant="contained" color="primary" startIcon={<PlusCircleFilled />}>
          New Table
        </Button>
      </Stack>

      <ReusableModal open={showForm} onClose={handleShowForm} title={isNewTable ? 'Add New Table' : 'Edit Table Details'}>
        <TableForm onClose={handleShowForm} isNewTable={isNewTable} tableData={tableData} />
      </ReusableModal>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Table columns={columns} dataSource={filteredData} onChange={handleChange} pagination={paginationSettings} rowKey="id" bordered />
        </Grid>
      </Grid>

      <DialogMessage
        open={openMessageDialog}
        onClose={() => setOpenDialogMessage(false)}
        title="Confirm Deletion"
        message="This action cannot be undone. Are you sure you want to delete this table?"
        confirmText="Delete"
        cancelText="Cancel"
        handleConfirm={() => handleDeleteFinal(tableId)}
        handleCancel={() => setOpenDialogMessage(false)}
      />

      <Toast open={openToast} onClose={handleCloseToast} severity="success" message={toastMessage} duration={3000} />
    </div>
  );
};

export default DisplayTables;
