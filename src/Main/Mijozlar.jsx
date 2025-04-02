import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStor from "./Store/Mystore";
import { Button, Table } from "antd";
import AddMijozlar from "./AddMijozlar";
import api from "./Axios";

function Mijozlar() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  

  const accessToken = useMyStor((state) => state.accessToken);

  const Users = () => {
    api
      .get("/api/users?limit=10&page=1&order=ASC", {
        headers:{
          Authorization:`Bearer ${accessToken}`
        }
      })
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

  return (
    <div className="w-[1300px]">
      <AddMijozlar setOpen={setOpen} open={open} onRefresh={Mijozlar} />

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
              return <img className="h-8 w-10" src={image}></img>;
            },
          },

          {
            title: "Delet & Edit",
            dataIndex: "Delet / Edit",
            render:()=>{
              return <div className=" flex gap-2">
                <Button type="primary" style={{background:"red"}}>Delet</Button>
                <Button type="primary">Edit</Button>

              </div>
            }
          },
        ]}
        dataSource={users}
      />
    </div>
  );
}

export default Mijozlar;
