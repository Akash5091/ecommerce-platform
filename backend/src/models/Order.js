import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    orderItems: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        qty: Number,
        price: Number,
        imageUrl: String
      }
    ],

    shippingAddress: {
      address: String,
      city: String,
      country: String,
      postalCode: String
    },

    paymentMethod: String,
    paymentResult: { id: String, status: String },

    totalPrice: Number,

    isPaid: { type: Boolean, default: false },
    paidAt: Date,

    status: { type: String, default: "Processing" }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);