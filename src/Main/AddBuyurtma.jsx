import { Button, Drawer, Form, Input, message, Radio, Select } from "antd";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import api from "./Axios";
import { useState } from "react";
import { useEffect } from "react";

function AddBuyurtma({ setOpen, open, onRefresh }) {
  const [form] = useForm();
  const [userState, setUserState] = useState([]);
  const [productState, setProductState] = useState([]);

  useEffect(() => {
    api.get("/api/users").then((res) => {
      setUserState(res.data.items);
    });
  }, []);

  useEffect(() => {
    api.get("/api/products").then((res) => {
      setProductState(res.data.items);
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

export default AddBuyurtma;
