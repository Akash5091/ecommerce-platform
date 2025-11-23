import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./src/models/Product.js";
import { sampleProducts } from "./src/data/sampleProducts.js";

dotenv.config();

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");

    await Product.deleteMany({});
    const inserted = await Product.insertMany(sampleProducts);

    console.log(`Seeded ${inserted.length} products`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

runSeed();