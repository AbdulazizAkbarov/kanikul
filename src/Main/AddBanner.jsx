import { Button, Drawer, Form, Input, message, Radio, Switch } from "antd";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import api from "./Axios";

function AddBanner({ setOpen, open, onRefresh }) {
  const [form] = useForm();

  const handleSubmit = (values) => {
    api
      .post("/api/banners", {
        title: values.title,
        imageUrl: values.imageUrl,
        isActive: values.isActive,
        createdAt: values.createdAt,
      })
      .then((res) => {
        message.success("Foydalanuvchi qo‘shildi!");
        form.resetFields();
        setOpen(false);
        onRefresh?.();
      })
      .catch((e) => {
        console.error("Xatolik", e);
        message.error("Xatolik yuz berdi");
      });
  };

  return (
    <div>
      <Button
        className="ml-[1200px] my-4"
        type="primary"
        onClick={() => setOpen(true)}
      >
        Qo‘shish
      </Button>

      <Drawer open={open} onClose={() => setOpen(false)} destroyOnClose>
      <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>

          <Form.Item label="isActive" name="isActive">
          <Switch />
          </Form.Item>

          <Form.Item label="Parol" name="createdAt">
            <Input />
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

export default AddBanner;
