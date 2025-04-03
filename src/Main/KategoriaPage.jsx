import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStor from "./Store/Mystore";
import { Button, Table } from "antd";
import api from "./Axios";
import AddCategory from "./AddKategory";

function Kategory() {
  const [mahsulot, setmahsulot] = useState([]);
  const [open, setOpen] = useState(false);

  const accessToken = useMyStor((state) => state.accessToken);

  const Category = () => {
    api
      .get("api/categories?limit=10&page=1&order=ASC", {
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
    Category();
  }, [accessToken]);

  function Delet(id) {
    api.delete(`/api/categories/${id}`).then((res) => {
      console.log(res.data);
      setmahsulot((i) => i.filter((item) => item.id !== id));
    });
  }


  return (
    <div className="w-[1300px]">
      <AddCategory setOpen={setOpen} open={open} onRefresh={Kategory} />

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
            title: "Stock",
            dataIndex: "createdAt",
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
          }
        ]}
        dataSource={mahsulot}
      />
    </div>
  );
}

export default Kategory;
