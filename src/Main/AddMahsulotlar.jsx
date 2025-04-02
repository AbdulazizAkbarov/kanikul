import { Button, Drawer, Form, Input, message, Radio } from "antd";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import useMyStor from "./Store/Mystore";
import api from "./Axios";

function AddMahsulotlarPage({ setOpen, open, onRefresh }) {
  const accessToken = useMyStor((state) => state.accessToken);
  const [form] = useForm();

  const handleSubmit = (values) => {
    api
      .post(
        "api/products",
        {
          name: values.name,
          description: values.description,
          price: values.price,
          imageUrl: values.imageUrl,
          stock: values.stock,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        message.success("Mahsulot qo‘shildi!");
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
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Ism" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>

          <Form.Item label="Price" name="price">
            <Input />
          </Form.Item>

          <Form.Item name="Stock" label="stock">
            <Input />
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

export default AddMahsulotlarPage;
