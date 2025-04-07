import { Button, Drawer, Form, Input, InputNumber, Radio, message } from "antd";
import { useForm } from "antd/es/form/Form";
import Item from "antd/es/list/Item";
import React from "react";
import api from "./Axios";

function EditMahsulot({ setEditMahsulot, editMahsulot }) {
  const [form] = useForm();

  const handleSubmit = (values) => {
    api
      .patch(`/api/products/${editMahsulot.id}`, {
        name: values.name,
        descrtiption: values.descrtiption,
        price: values.price,
        stock: values.stock,
        imageUrl: values.imageUrl,
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
        open={editMahsulot ? true : false}
        onClose={() => {
          setEditMahsulot(undefined);
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editMahsulot}
        >
          <Form.Item label="Ism" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="Descrtiption" name="descrtiption">
            <Input />
          </Form.Item>

          <Form.Item label="Price" name="price">
            <Input.Password />
          </Form.Item>

          <Form.Item name="stock" label="Stock">
            <InputNumber />
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

export default EditMahsulot;
