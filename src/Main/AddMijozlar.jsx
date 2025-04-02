import { Button, Drawer, Form, Input, message, Radio } from "antd";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import useMyStor from "./Store/Mystore";

function AddMijozlar({ setOpen, open, onRefresh }) {
  const accessToken = useMyStor((state) => state.accessToken);
  const [form] = useForm();

  const handleSubmit = (values) => {
    axios
      .post(
        "https://nt.softly.uz/api/users",
        {
          name: values.name,
          email: values.email,
          password: values.password,
          image: values.image,
          role: values.role,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
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
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
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

export default AddMijozlar;
