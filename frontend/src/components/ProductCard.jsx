import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div style={{ border: "1px solid #eee", padding: 10 }}>
      <img src={product.imageUrl} alt={product.name} width="100%" height="150" />
      <h4>{product.name}</h4>
      <p>${product.price}</p>
      <div style={{ display: "flex", gap: 8 }}>
        <Link to={`/product/${product._id}`}>View</Link>
        <button onClick={() => addToCart(product)}>Add to cart</button>
      </div>
    </div>
  );
}