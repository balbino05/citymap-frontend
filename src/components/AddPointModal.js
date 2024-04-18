import { Modal, Form, Input, Button } from 'antd';

const AddPointModal = ({ visible, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

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
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPointModal;
