import { Table, Space, Button, Input, Tooltip } from 'antd';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import PropTypes from 'prop-types';

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
    render: (text) => {
      if (searchedColumn === dataIndex) {
        return (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        );
      }
      return (
        <Tooltip title={text} placement="topLeft">
          <span
            style={{
              display: 'inline-block',
              maxWidth: '200px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {text}
          </span>
        </Tooltip>
      );
    }
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      ...getColumnSearchProps('name'),
      width: '10%',
      ellipsis: true
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
      ...getColumnSearchProps('email'),
      width: '15%',
      ellipsis: true
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      sorter: (a, b) => a.message.localeCompare(b.message),
      sortOrder: sortedInfo.columnKey === 'message' && sortedInfo.order,
      ...getColumnSearchProps('message'),
      width: '30%',
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          <div
            style={{
              maxHeight: '100px',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              lineHeight: '1.4'
            }}
          >
            {text}
          </div>
        </Tooltip>
      )
    },
    {
      title: 'Action',
      key: 'action',
      width: '15%',
      render: (text, record) => (
        <Space size="small">
          <Tooltip title="Delete Review">
            <Button
              onClick={() => handleDelete(record.id)}
              danger
              icon={<DeleteOutlined />}
              size="small"
              style={{
                padding: '0 8px',
                height: '28px'
              }}
              aria-label="Delete review"
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const filteredData = reviews?.filter((item) =>
    Object.keys(item).some((key) => item[key]?.toString().toLowerCase().includes(searchText.toLowerCase()))
  );

  const paginationSettings = {
    defaultPageSize: 5,
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '20', '50'],
    showTotal: (total) => `Total ${total} items`
  };

  return (
    <Table
      columns={columns}
      dataSource={filteredData || []}
      onChange={handleChange}
      pagination={paginationSettings}
      scroll={{ x: 'max-content' }}
      rowKey="id"
      bordered
      size="middle"
      style={{
        marginTop: 16,
        tableLayout: 'fixed'
      }}
    />
  );
};

ReviewTableComponent.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired
    })
  ).isRequired,
  handleDelete: PropTypes.func.isRequired,
  sortedInfo: PropTypes.object,
  handleChange: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  searchedColumn: PropTypes.string,
  handleSearch: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired
};

export default ReviewTableComponent;
