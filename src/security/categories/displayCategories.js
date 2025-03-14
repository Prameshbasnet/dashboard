import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Space, Button, Input, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleFilled, SearchOutlined } from '@ant-design/icons';
import { Stack, Typography } from '@mui/material';
import Highlighter from 'react-highlight-words';
import ReusableModal from 'components/modal/ReusableModal';
import Toast from 'components/Toast';
import CategoryForm from './categoriesForm';
import { deleteCategory, fetchCategories, selectAllCategories } from 'store/slice/categories';

const DisplayCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);

  const [state, setState] = useState({
    showForm: false,
    categoryId: null,
    isNewCategory: true,
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

  useEffect(() => {
    const loadCategories = async () => {
      setState((prev) => ({ ...prev, loading: true }));
      try {
        await dispatch(fetchCategories()).unwrap();
      } catch (error) {
        showToast('Failed to load categories', 'error');
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    };

    loadCategories();
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
      isNewCategory: isNew,
      categoryId: id
    }));
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteCategory(id)).unwrap();
      showToast('Category deleted successfully');
    } catch (error) {
      showToast('Failed to delete category', 'error');
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
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
      sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
      sortOrder: state.sorting.columnKey === 'categoryName' && state.sorting.order,
      ...getColumnSearchProps('categoryName')
    },
    {
      title: 'Description',
      dataIndex: 'categoryDescription',
      key: 'categoryDescription',
      ...getColumnSearchProps('categoryDescription')
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button aria-label="Edit" onClick={() => handleModalToggle(false, record.id)} icon={<EditOutlined />} />
          <Popconfirm
            title="Are you sure you want to delete this category?"
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

  const filteredData = categories.filter((item) =>
    Object.keys(item).some((key) => item[key]?.toString().toLowerCase().includes(state.search.text.toLowerCase()))
  );

  return (
    <div style={{ padding: '2rem' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <Typography variant="h4" component="h1">
          Category Management
        </Typography>
        <Button type="primary" onClick={() => handleModalToggle()} icon={<PlusCircleFilled />} size="large">
          Add New Category
        </Button>
      </Stack>

      <ReusableModal open={state.showForm} onClose={() => handleModalToggle()} title={`${state.isNewCategory ? 'Add' : 'Edit'} Category`}>
        <CategoryForm onClose={() => handleModalToggle()} categoryId={state.categoryId} isNewCategory={state.isNewCategory} />
      </ReusableModal>

      <Table
        columns={columns}
        dataSource={filteredData}
        onChange={(pagination, filters, sorter) => setState((prev) => ({ ...prev, sorting: sorter }))}
        pagination={PAGINATION_CONFIG}
        loading={state.loading}
        rowKey="id"
        bordered
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

DisplayCategories.propTypes = {};

export default DisplayCategories;
