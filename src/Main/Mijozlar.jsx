import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStor from "./Store/Mystore";
import { Button, Table } from "antd";
import AddMijozlar from "./AddMijozlar";
import api from "./Axios";
import EditMijozlar from "./EditMijozlar";

function Mijozlar() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();
  const accessToken = useMyStor((state) => state.accessToken);

  const Users = () => {
    api
      .get("/api/users?limit=10&page=1&order=ASC", {})
      .then((res) => {
        setUsers(res.data.items);
      })
      .catch((e) => {
        console.error("Xatolik", e);
      });
  };

  useEffect(() => {
    Users();
  }, [accessToken]);

  function Delet(id) {
    api.delete(`/api/users/${id}`).then((res) => {
      console.log(res.data);
      setUsers((i) => i.filter((item) => item.id !== id));
    });
  }

  return (
    <div className="w-[1300px]">
      <AddMijozlar setOpen={setOpen} open={open} onRefresh={Users} />
      <EditMijozlar
        setSelected={setSelected}
        selected={selected}
        onRefresh={Users}
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
            title: "Nomi",
            dataIndex: "name",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Role",
            dataIndex: "role",
          },
          {
            title: "Rasm",
            dataIndex: "image",
            render: (image) => {
              return <img className="h-8 w-10" src={image} alt="user" />;
            },
          },

          {
            title: "Delet & Edit",
            dataIndex: "",
            render: (_, item) => {
              return (
                <div className=" flex gap-2">
                  <Button
                    type="primary"
                    onClick={() => {
                      setSelected(item);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    type="primary"
                    style={{ background: "red" }}
                    onClick={() => Delet(item.id)}
                  >
                    Delet
                  </Button>
                </div>
              );
            },
          },
        ]}
        dataSource={users}
      />
    </div>
  );
}

export default Mijozlar;
