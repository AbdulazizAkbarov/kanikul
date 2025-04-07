import { Button, Drawer, Form, Input, Select, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import api from "./Axios";
import { useState } from "react";
import { useEffect } from "react";

function EditBuyurtma({ buyurtmaState ,setBuyurtmaState }) {
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
        open={buyurtmaState ? true : false}
        onClose={() => {
          setBuyurtmaState(undefined);
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={buyurtmaState}
        >
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
