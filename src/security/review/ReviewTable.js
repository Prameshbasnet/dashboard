import { Table, Space, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { decodeBase64Data } from 'utils/decode';

const ReviewTableComponent = ({
  reviews,
  handleDelete,
  sortedInfo,
  handleChange,
  searchText,
  searchedColumn,
  handleSearch,
  handleReset
}) => {
  const [tableKey, setTableKey] = useState(Math.random());

  useEffect(() => {
    setTableKey(Math.random());
  }, [reviews]);

  const localToken = localStorage.getItem('token');
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
            display: 'block'
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
            backgroundColor: '#ffc069',
            padding: 0
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      headerStyle: { background: '#e6f7ff' },
      ...getColumnSearchProps('name')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      headerStyle: { background: '#e6f7ff' },
      ...getColumnSearchProps('email')
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      headerStyle: { background: '#e6f7ff' },
      ...getColumnSearchProps('message')
    },

    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleDelete(record.id)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
      headerStyle: { background: '#e6f7ff' }
    }
  ];

  const filteredData = reviews?.filter(
    (item) =>
      item?.name?.toLowerCase().includes(searchText?.toLowerCase()) || item?.email?.toLowerCase().includes(searchText?.toLowerCase())
  );
  const paginationSettings = { defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['3', '5', '10', '20', '30'] };
  return (
    <>
      <Table
        key={tableKey}
        scroll={{ x: 'max-content' }}
        columns={columns}
        dataSource={Array.isArray(filteredData) ? filteredData : []}
        onChange={handleChange}
        pagination={paginationSettings}
      />
    </>
  );
};

export default ReviewTableComponent;
