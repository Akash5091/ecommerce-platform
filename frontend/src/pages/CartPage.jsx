import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQty } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);

  return (
    <div style={{ padding: 20 }}>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 && <p>Your cart is empty</p>}

      {cartItems.map((item) => (
        <div key={item._id} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
          <img src={item.imageUrl} alt={item.name} width="60" />
          <div>
            <p>{item.name}</p>
            <p>${item.price}</p>
            <input
              type="number"
              min="1"
              value={item.qty}
              onChange={(e) => updateQty(item._id, Number(e.target.value))}
            />
            <button onClick={() => removeFromCart(item._id)}>Remove</button>
          </div>
        </div>
      ))}

      {cartItems.length > 0 && (
        <div>
          <h3>Total: ${total}</h3>
          <Link to="/checkout">Proceed to Checkout</Link>
        </div>
      )}
    </div>
  );
}