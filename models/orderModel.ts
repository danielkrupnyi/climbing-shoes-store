import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    address: String,
    phone: String,
    cart: Array,
    total: Number,
    delivered: {
      type: Boolean,
      defaule: false,
    },
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.models.order || mongoose.model("order", orderSchema);

export default Orders;
