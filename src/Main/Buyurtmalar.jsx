import { Button, Table } from "antd";
import api from "../Main/Axios";
import { useState, useEffect } from "react";
import AddBuyurtma from "./AddBuyurtma";
import EditBuyurtma from "./EditBuyrtma";

function B({ status }) {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function OrdersPage() {
  const [orderState, setOrderState] = useState([]);
  const [userState, setUserState] = useState([]);
  const [productState, setProductState] = useState([]);
  const [openOrderDrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(true);

  const orders = () => {
    setLoading(true);
    api
      .get("/api/orders?order=ASC")
      .then((res) => {
        console.log("order", res.data.items);
        setOrderState(res.data.items);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    orders();
  }, []);

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

  function onDelete(id) {
    api
      .delete(`/api/orders/${id}`)
      .then(() =>
        setOrderState((prev) => prev.filter((item) => item.id !== id))
      );
  }

  return (
    <div className=" bg-gray-50 w-[1300px]">
      <AddBuyurtma 
        open={openOrderDrawer}
        setOpen={setOpenDrawer}
        orderFuntion={orders} />

        <EditBuyurtma  />
      <Table
        style={{
          overflow: "auto",
          height: 560,
          width: "1400px",
        }}
        loading={loading}
        size="large"
        columns={[
          {
            key: "id",
            dataIndex: "id",
            title: "Buyurtma raqami",
          },
          {
            key: "customerId",
            dataIndex: "customerId",
            title: "Mijoz",
            render: (customerId) => {
              const new_customer = userState.find(
                (prev) => prev.id === customerId
              );
              return new_customer?.name;
            },
          },
          {
            key: "status",
            dataIndex: "status",
            title: "status",
            render: (status) => <p>{status}</p>,
          },
          {
            key: "totalPrice",
            dataIndex: "totalPrice",
            title: "Jami",
            render: (totalPrice) => {
              return <p>{totalPrice.toLocaleString("ru")} so'm</p>;
            },
          },
          {
            key: "items",
            dataIndex: "items",
            title: "Mahsulot",
            render: (items) => {
              return (
                <div>
                  {items?.map((item) => {
                    const nomi = productState.find((productItem) => {
                      return productItem.id === item.productId;
                    });
                    return <div key={item.productId}>{nomi?.name}</div>;
                  })}
                </div>
              );
            },
          },
          {
            key: "actions",
            dataIndex: "id",
            title: "Actions",
            render: (id) => {
              return (
                <div className="flex gap-2">
                  <Button
                    type="primary"
                    style={{ background: "red" }}
                    onClick={() => onDelete(id)}
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
        dataSource={orderState}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
     
    </div>
  );
}

export default OrdersPage;
