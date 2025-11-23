import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CheckoutForm() {
  const { user } = useContext(AuthContext);
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { data } = await api.post(
      "/payments/create-intent",
      { amount: total },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );

    const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: { card: elements.getElement(CardElement) }
    });

    if (error) {
      alert("Payment failed: " + error.message);
      return;
    }

    await api.post(
      "/orders",
      {
        orderItems: cartItems.map((x) => ({
          product: x._id,
          name: x.name,
          qty: x.qty,
          price: x.price,
          imageUrl: x.imageUrl
        })),
        shippingAddress: { address, city, country, postalCode },
        paymentMethod: "Stripe",
        paymentResult: { id: paymentIntent.id, status: paymentIntent.status },
        totalPrice: total,
        isPaid: true,
        paidAt: new Date()
      },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );

    clearCart();
    alert("Order placed!");
    navigate("/orders");
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>Checkout</h2>

      <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
      <input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
      <input placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
      <input placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />

      <div style={{ border: "1px solid #ccc", padding: 10, marginTop: 10 }}>
        <CardElement />
      </div>

      <button type="submit" disabled={!stripe}>Pay ${total.toFixed(2)}</button>
    </form>
  );
}

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}