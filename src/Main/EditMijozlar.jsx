import { Button, Drawer, Form, Input, Radio, message } from "antd";
import { useForm } from "antd/es/form/Form";
import Item from "antd/es/list/Item";
import React from "react";
import api from "./Axios";

function EditMijozlar({ setSelected, selected }) {
  const [form] = useForm();

  const handleSubmit = (values) => {
    api
      .patch(`/api/users/${selected.id}`, {
        name: values.name,
        email: values.email,
        password: values.password,
        image: values.image,
        role: values.role,
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
        open={selected ? true : false}
        onClose={() => {
          setSelected(undefined);
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={selected}
        >
          <Form.Item label="Ism" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>

          <Form.Item label="Parol" name="password">
            <Input.Password />
          </Form.Item>

          <Form.Item name="role" label="Rol">
            <Radio.Group
              options={[
                { label: "Mijoz", value: "customer" },
                { label: "Admin", value: "admin" },
              ]}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>

          <Form.Item label="Rasm URL" name="image">
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

export default EditMijozlar;



