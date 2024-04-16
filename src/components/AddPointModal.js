import { Modal, Form, Input, Button } from 'antd';

const AddPointModal = ({ visible, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then(values => {
      form.resetFields();
      onSubmit(values);
    });
  };

  return (
    <Modal
      title="Add New Point"
      visible={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
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
        {/* Assuma que as coordenadas são preenchidas automaticamente */}
      </Form>
    </Modal>
  );
};

export default AddPointModal;
