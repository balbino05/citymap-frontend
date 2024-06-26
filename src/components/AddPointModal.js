import { Modal, Form, Input, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddPointModal = ({ visible, onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/category-points');
        setCategories(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = () => {
    form.validateFields().then(values => {
      form.resetFields();
      onSubmit(values);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    window.location.reload(true);
  }



  return (
    <Modal
      title="Add New Point"
      visible={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="latitude" label="Latitude" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="longitude" label="Longitude" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
          <select name='category' label="Category" options={categories}>
          <option value="0">Select a category</option>
          {categories.map(category => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        </Form.Item>
        
      </Form>
    </Modal>
  );
};

export default AddPointModal;
