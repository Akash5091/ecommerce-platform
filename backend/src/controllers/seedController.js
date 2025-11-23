import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import { sampleProducts } from "../data/sampleProducts.js";

export const seedProducts = async (req, res) => {
  const { clearFirst } = req.body;

  if (clearFirst) {
    await Product.deleteMany({});
  }

  const inserted = await Product.insertMany(sampleProducts);
  res.json({
    message: `Seeded ${inserted.length} products`,
    count: inserted.length
  });
};

export const resetStoreData = async (req, res) => {
  await Product.deleteMany({});
  await Order.deleteMany({});
  res.json({ message: "Store products and orders cleared." });
};

export const seedStatus = async (req, res) => {
  const productCount = await Product.countDocuments();
  const orderCount = await Order.countDocuments();
  const userCount = await User.countDocuments();
  res.json({ productCount, orderCount, userCount });
};