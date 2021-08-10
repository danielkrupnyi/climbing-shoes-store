import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/connectDB";
import Orders from "../../../models/orderModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      await createOrder(req, res);
      break;
    case "GET":
      await getOrders(req, res);
      break;
  }
};

const createOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await auth(req, res);

    const { address, phone, cart, total } = req.body;

    const newOrder = new Orders({
      user: result && result.id,
      address,
      phone,
      cart,
      total,
    });

    await newOrder.save();

    res.status(200).json({
      msg: "Payment Success! We will contact you to confirm the order.",
      newOrder,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getOrders = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await auth(req, res);

    let orders;

    if (result && result.role !== "admin") {
      orders = await Orders.find({ user: result.id }).populate(
        "user",
        "-password"
      );
    } else {
      orders = await Orders.find().populate("user", "-password");
    }

    res.json({ orders });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
