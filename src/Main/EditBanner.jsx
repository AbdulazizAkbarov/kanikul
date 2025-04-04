import { Button, Drawer, Form, Input, Radio, Switch, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import api from "./Axios";

function EditBanner({ seteditBanner, editBanner }) {
  const [form] = useForm();

  const handleSubmit = (values) => {
    api
      .patch(`/api/banners/${editBanner.id}`, {
        title: values.title,
        imageUrl: values.imageUrl,
        isActive: values.isActive,
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
        open={editBanner ? true : false}
        onClose={() => {
          seteditBanner(undefined);
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editBanner}
        >
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>

          <Form.Item label="isActive" name="isActive">
          <Switch />
          </Form.Item>

          <Form.Item label="Parol" name="createdAt">
            <Input.Password />
          </Form.Item>

          <Form.Item label="Rasm URL" name="imageUrl">
            <Input placeholder="Rasm URL kiriting" />
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

export default EditBanner;
