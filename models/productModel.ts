import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    images: { type: Array, required: true },
    category: { type: String, required: false },
    checked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Products =
  mongoose.models.product || mongoose.model("product", productSchema);

export default Products;
