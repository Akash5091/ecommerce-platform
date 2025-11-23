import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  const { keyword, category } = req.query;

  const query = {};
  if (keyword) query.name = { $regex: keyword, $options: "i" };
  if (category) query.category = category;

  const products = await Product.find(query).sort({ createdAt: -1 });
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};