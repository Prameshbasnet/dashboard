import React, { useEffect, useRef, useState } from 'react';
import { Grid } from '@mui/material';
import { Table, Space, Button, Input } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { decodeBase64Data } from 'utils/decode';

const UserTable = ({ users, handleEdit, handleDelete }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [tableKey, setTableKey] = useState(Math.random());

  let allModulePerms;
  console.log(allModulePerms);

  const localToken = localStorage.getItem('token');
  const decodedData = decodeBase64Data(localToken);

  if (decodedData) {
    const { modulePermission } = decodedData;
    allModulePerms = modulePermission;
  }

  useEffect(() => {
    setTableKey(Math.random());
  }, [users]);

  const searchInputRef = useRef(null);

  const handleSearch = (selectedKeys, confirmation, dataIndex) => {
    confirmation();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    setSearchText('');
    confirm();
  };

  const getColumnSearchProps = (dataIndex, searchPlaceholder) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8, position: 'fixed' }}>
        <Input
          ref={(node) => {
            searchInputRef.current = node;
          }}
          placeholder={searchPlaceholder}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
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
          <Button onClick={() => handleReset(clearFilters, confirm)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => (record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : ''),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInputRef.current.select(), 100);
      }
    },
    render: (text) => {
      const searchedText = searchedColumn === dataIndex ? searchText : null;
      return searchedText ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchedText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      );
    }
  });

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
      width: '10%',
      ...getColumnSearchProps('userName', 'Search User Name')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '15%',
      ...getColumnSearchProps('email', 'Search Email')
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '5%',
      ...getColumnSearchProps('phoneNumber', 'Search Phone Number')
    },
    {
      title: 'Role',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles) => <span>{roles?.map((role) => role?.name).join(', ')}</span>,
      width: '10%',
      headerStyle: { background: '#e6f7ff' }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button aria-label="Edit User" onClick={() => handleEdit(record.id)}>
            <EditOutlined />
          </Button>
          <Button onClick={() => handleDelete(record.id)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
      width: '25%',
      headerStyle: { background: '#e6f7ff' }
    }
  ];
  const paginationSettings = { defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['3', '5', '10', '20', '30'] };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Table key={tableKey} scroll={{ x: 'max-content' }} columns={columns} dataSource={users} pagination={paginationSettings} />;
      </Grid>
    </Grid>
  );
};

export default UserTable;
