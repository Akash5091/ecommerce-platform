import { useState, useEffect, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function AdminPage() {
  const { user } = useContext(AuthContext);
  const headers = { Authorization: `Bearer ${user.token}` };

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    brand: "",
    imageUrl: "",
    countInStock: 0
  });

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    const { data } = await api.get("/products");
    setProducts(data);
  };

  const fetchOrders = async () => {
    const { data } = await api.get("/admin/orders", { headers });
    setOrders(data);
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    await api.post("/admin/products", newProduct, { headers });
    alert("Product created");
    fetchProducts();
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm("Delete?")) return;
    await api.delete(`/admin/products/${id}`, { headers });
    fetchProducts();
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    await api.put(`/admin/orders/${orderId}/status`, { status }, { headers });
    fetchOrders();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>

      <section>
        <h2>Create Product</h2>
        <form onSubmit={handleCreateProduct}>
          <input placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required />
          <input placeholder="Price" type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })} required />
          <input placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
          <input placeholder="Category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
          <input placeholder="Brand" value={newProduct.brand} onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })} />
          <input placeholder="Image URL" value={newProduct.imageUrl} onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })} />
          <input placeholder="Stock" type="number" value={newProduct.countInStock} onChange={(e) => setNewProduct({ ...newProduct, countInStock: Number(e.target.value) })} />
          <button type="submit">Create</button>
        </form>
      </section>

      <section>
        <h2>Products</h2>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>${p.price}</td>
                <td>{p.countInStock}</td>
                <td>
                  <button onClick={() => handleDeleteProduct(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Orders</h2>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user?.email}</td>
                <td>${order.totalPrice}</td>
                <td>{order.status}</td>
                <td>
                  <select value={order.status} onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}