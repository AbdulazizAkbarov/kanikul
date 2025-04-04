import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStor from "./Store/Mystore";
import { Button, Table } from "antd";
import AddMahsulotlarPage from "../Main/AddMahsulotlar";
import api from "./Axios";

function MahsulotlarPage() {
  const [mahsulot, setmahsulot] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);

  const accessToken = useMyStor((state) => state.accessToken);

  const Mahsulot = () => {
    api
      .get("api/products?limit=10&page=1&order=ASC", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setmahsulot(res.data.items);
      })
      .catch((e) => {
        console.error("Xatolik", e);
      });
  };

  useEffect(() => {
    Mahsulot();
    api.get("api/categories?limit=10&page=1&order=ASC",
)
    .then((res) => {
      setCategory(res.data.items);
    });
  }, []);

  function Delet(id) {
    api.delete(`/api/products/${id}`).then((res) => {
      setmahsulot((i) => i.filter((item) => item.id !== id));
    });
  }

  return (
    <div className="w-[1300px]">
      <AddMahsulotlarPage
        setOpen={setOpen}
        open={open}
        onRefresh={MahsulotlarPage}
      />

      <Table
        bordered
        style={{ width: "100%" }}
        npmstyle={{
          width: "500px",
        }}
        rowKey="id"
        columns={[
          {
            title: "id",
            dataIndex: "id",
          },

          {
            title: "Nomi",
            dataIndex: "name",
          },
          {
            title: "Description",
            dataIndex: "description",
          },

          {
            title: "Price",
            dataIndex: "price",
          },
          {
            title: "Stock",
            dataIndex: "stock",
          },

          {
            title: "Rasm",
            dataIndex: "imageUrl",
            render: (image) => {
              return <img className="h-8 w-10" src={image}></img>;
            },
          },
          {
            title: "Catigory",
            dataIndex: "categoryId",
            render: (categoryId) => {
              const s = category.find((a) => {
                return a.id === categoryId;
              });
              return s?.name;
            },
          },

          {
            title: "Delet & Edit",
            dataIndex: "",
            render: (_, record) => {
              return (
                <div className=" flex gap-2">
                  <Button
                    type="primary"
                    style={{ background: "red" }}
                    onClick={() => Delet(record.id)} // To‘g‘ri chaqirilishi kerak
                  >
                    Delet
                  </Button>
                  <Button type="primary">Edit</Button>
                </div>
              );
            },
          },
        ]}
        dataSource={mahsulot}
      />
    </div>
  );
}

export default MahsulotlarPage;
