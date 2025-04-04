import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStor from "./Store/Mystore";
import { Button, Switch, Table } from "antd";
import AddBanner from "./AddBanner";
import api from "./Axios";
import EditBanner from "./EditBanner";

function Banner() {
  const [banner, setBanner] = useState([]);
  const [open, setOpen] = useState(false);
  const [editBanner, seteditBanner] = useState();

  const accessToken = useMyStor((state) => state.accessToken);

  const Banner = () => {
    api
      .get("/api/banners?limit=10&page=1&order=ASC", {})
      .then((res) => {
        setBanner(res.data.items);
      })
      .catch((e) => {
        console.error("Xatolik", e);
      });
  };

  useEffect(() => {
    Banner();
  }, [accessToken]);

  function Delet(id) {
    api.delete(`/api/banner/${id}`).then((res) => {
      console.log(res.data);
      setBanner((i) => i.filter((item) => item.id !== id));
    });
  }

  return (
    <div className="w-[1300px]">
      <AddBanner setOpen={setOpen} open={open} onRefresh={banner} />
      <EditBanner
        seteditBanner={seteditBanner}
        editBanner={editBanner}
        onRefresh={banner}
      />
      <Table
        bordered
        style={{ width: "100%" }}
        rowKey="id"
        columns={[
          {
            title: "id",
            dataIndex: "id",
          },

          {
            title: "title",
            dataIndex: "title",
          },
          {
            title: "isActive",
            dataIndex: "isActive",
            render: (isActive) => {
              return <Switch></Switch>;
            },
          },
          {
            title: "createdAt",
            dataIndex: "createdAt",
          },
          {
            title: "Rasm",
            dataIndex: "imageUrl",
            render: (imageUrl) => {
              return <img className="h-8 w-10" src={imageUrl} alt="user" />;
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
                    onClick={() => Delet(record.id)}
                  >
                    Delet
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      seteditBanner(record);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              );
            },
          },
        ]}
        dataSource={banner}
      />
    </div>
  );
}

export default Banner;
