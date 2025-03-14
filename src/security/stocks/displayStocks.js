import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Space, Button, Input, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleFilled, SearchOutlined } from '@ant-design/icons';
import { Stack, Typography } from '@mui/material';
import Highlighter from 'react-highlight-words';
import ReusableModal from 'components/modal/ReusableModal';
import Toast from 'components/Toast';
import StockForm from './stocksForm';
import { deleteStock, fetchStocks, selectAllStocks } from 'store/slice/stocks';
import { fetchFoods, selectAllFoods } from 'store/slice/food';

const DisplayStocks = () => {
  const dispatch = useDispatch();
  const stocks = useSelector(selectAllStocks);
  const foods = useSelector(selectAllFoods);

  const [state, setState] = useState({
    showForm: false,
    stockId: null,
    isNewStock: true,
    search: {
      text: '',
      column: ''
    },
    sorting: {},
    toast: {
      open: false,
      message: '',
      severity: 'success'
    },
    loading: false
  });

  const PAGINATION_CONFIG = {
    defaultPageSize: 5,
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '20', '50']
  };

  const enrichedStocks = stocks.map((stock) => {
    const food = foods.find((f) => f.id === stock.foodId);
    return {
      ...stock,
      foodName: food?.name || 'Unknown',
      availability: stock.isAvailable ? 'Available' : 'Out Of Stock'
    };
  });

  useEffect(() => {
    const loadData = async () => {
      setState((prev) => ({ ...prev, loading: true }));
      try {
        await Promise.all([dispatch(fetchStocks()), dispatch(fetchFoods())]);
      } catch (error) {
        showToast('Failed to load stock data', 'error');
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    };

    loadData();
  }, [dispatch]);

  const showToast = (message, severity = 'success') => {
    setState((prev) => ({
      ...prev,
      toast: { open: true, message, severity }
    }));
  };

  const handleModalToggle = (isNew = true, id = null) => {
    setState((prev) => ({
      ...prev,
      showForm: !prev.showForm,
      isNewStock: isNew,
      stockId: id
    }));
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteStock(id)).unwrap();
      showToast('Stock record deleted successfully');
      dispatch(fetchStocks());
    } catch (error) {
      showToast('Failed to delete stock record', 'error');
    }
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
      state.search.column === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[state.search.text]}
          autoEscape
          textToHighlight={text?.toString() || ''}
        />
      ) : (
        text
      )
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState((prev) => ({
      ...prev,
      search: {
        text: selectedKeys[0],
        column: dataIndex
      }
    }));
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setState((prev) => ({
      ...prev,
      search: { text: '', column: '' }
    }));
  };

  const columns = [
    {
      title: 'Food Item',
      dataIndex: 'foodName',
      key: 'foodName',
      sorter: (a, b) => a.foodName.localeCompare(b.foodName),
      sortOrder: state.sorting.columnKey === 'foodName' && state.sorting.order,
      ...getColumnSearchProps('foodName')
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
      render: (value) => Number(value).toLocaleString()
    },
    {
      title: 'Status',
      dataIndex: 'availability',
      key: 'availability',
      render: (text) => (
        <span
          style={{
            color: text === 'Available' ? '#52c41a' : '#ff4d4f',
            fontWeight: 500
          }}
        >
          {text}
        </span>
      ),
      filters: [
        { text: 'Available', value: 'Available' },
        { text: 'Out Of Stock', value: 'Out Of Stock' }
      ],
      onFilter: (value, record) => record.availability === value
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button aria-label="Edit" onClick={() => handleModalToggle(false, record.id)} icon={<EditOutlined />} />
          <Popconfirm
            title="Are you sure you want to delete this stock record?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button aria-label="Delete" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ];

  const filteredData = enrichedStocks.filter((item) =>
    Object.keys(item).some((key) => item[key]?.toString().toLowerCase().includes(state.search.text.toLowerCase()))
  );

  return (
    <div style={{ padding: '2rem' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <Typography variant="h4" component="h1">
          Stock Management
        </Typography>
        <Button type="primary" onClick={() => handleModalToggle()} icon={<PlusCircleFilled />} size="large">
          Add Stock Entry
        </Button>
      </Stack>

      <ReusableModal open={state.showForm} onClose={() => handleModalToggle()} title={`${state.isNewStock ? 'Add' : 'Edit'} Stock Entry`}>
        <StockForm onClose={() => handleModalToggle()} stockId={state.stockId} isNewStock={state.isNewStock} />
      </ReusableModal>

      <Table
        columns={columns}
        dataSource={filteredData}
        onChange={(pagination, filters, sorter) => setState((prev) => ({ ...prev, sorting: sorter }))}
        pagination={PAGINATION_CONFIG}
        loading={state.loading}
        rowKey="id"
        bordered
        scroll={{ x: true }}
      />

      <Toast
        open={state.toast.open}
        onClose={() =>
          setState((prev) => ({
            ...prev,
            toast: { ...prev.toast, open: false }
          }))
        }
        severity={state.toast.severity}
        message={state.toast.message}
      />
    </div>
  );
};

export default DisplayStocks;
