import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { CartContext } from "../context/CartContext";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <img src={product.imageUrl} alt={product.name} width="400" />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p><strong>${product.price}</strong></p>
      <p>In Stock: {product.countInStock}</p>

      <input
        type="number"
        min="1"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
      />
      <button onClick={() => addToCart(product, qty)}>Add to Cart</button>
    </div>
  );
}