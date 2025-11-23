import { useState, useEffect, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function OrdersPage() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api
      .get("/orders/mine", { headers: { Authorization: `Bearer ${user.token}` } })
      .then((res) => setOrders(res.data));
  }, [user]);

  return (
    <div style={{ padding: 20 }}>
      <h1>My Orders</h1>
      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((order) => (
        <div key={order._id} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 10 }}>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Total:</strong> ${order.totalPrice}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Paid:</strong> {order.isPaid ? "Yes" : "No"}</p>
          <div>
            {order.orderItems.map((item) => (
              <div key={item._id}>
                {item.name} x{item.qty} - ${item.price}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}