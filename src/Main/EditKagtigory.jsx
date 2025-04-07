import { Button, Drawer, Form, Input, InputNumber, Radio, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import api from "./Axios";

function EditCategory({ setEditCategory, editCategory }) {
  const [form] = useForm();

  const handleSubmit = (values) => {
    api
      .patch(`/api/categories/${editCategory.id}`, {
        name: values.name,
        description: values.description,
        createdAt: values.createdAt,
      })
      .then((res) => {
        message.success("Foydalanuvchi qo‘shildi!");
        form.resetFields();
      })
      .catch((e) => {
        console.error("Xatolik", e);
        message.error("Xatolik yuz berdi");
      });
  };
  return (
    <div>
      <Drawer
        open={editCategory ? true : false}
        onClose={() => {
          setEditCategory(undefined);
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editCategory}
        >
          <Form.Item label="Ism" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default EditCategory;
