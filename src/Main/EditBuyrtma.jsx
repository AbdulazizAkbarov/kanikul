import { Button, Drawer, Form, Input, Radio, Switch, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import api from "./Axios";

function EditBuyurtma({ setBuyurtma, editBuyurtma }) {
  const [form] = useForm();
  const [userState, setUserState] = useState([]);
  const [productState, setProductState] = useState([]);

  useEffect(() => {
    api.get("/api/users").then((res) => {
      setUserState(res.data.items);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    api.get("/api/products").then((res) => {
      setProductState(res.data.items);
      console.log("products", res.data.items);
    });
  }, []);


  const handleSubmit = (values) => {
    api
    .post("api/orders", {
      customerId: values.customerId,
      items: [
        {
          productId: values.productId,
          quantity: values.quantity,
        },
      ],
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
        open={editBuyurtma ? true : false}
        onClose={() => {
          setBuyurtma(undefined);
        }}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="CustomerId" name="customerId">
            <Select
              options={userState.map((i) => {
                return {
                  value: i.id,
                  label: i.name,
                };
              })}
            />
          </Form.Item>

          <Form.Item label="ProductId" name="productId">
            <Select
              options={productState.map((i) => {
                return {
                  value: i.id,
                  label: i.name,
                };
              })}
            />
          </Form.Item>
          <Form.Item label="Miqdori" name="quantity">
            <Input type="number" />
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

export default EditBuyurtma;
