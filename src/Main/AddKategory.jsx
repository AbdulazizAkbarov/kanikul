import { Button, Drawer, Form, Input, message, Radio } from "antd";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import useMyStor from "./Store/Mystore";
import api from "./Axios";

function AddCategory({ setOpen, open, onRefresh }) {
  const [form] = useForm();

  const handleSubmit = (values) => {
    api
      .post(
        "api/categories",
        {
          name: values.name,
          description: values.description,
          createdAt: values.createdAt,
        },
     
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

          {/* <Form.Item label="CreatedAt" name="createdAt">
            <Input type="date" />
          </Form.Item> */}

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

export default AddCategory;
