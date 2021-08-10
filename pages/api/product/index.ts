import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/connectDB";
import Products from "../../../models/productModel";

connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      await getProducts(req, res);
      break;
    case "POST":
      await getProductsByCategory(req, res);
      break;
  }
};

const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const products = await Products.find();

    res.json({
      status: "success",
      result: products.length,
      products,
    });
  } catch (err) {
    res.status(500).json((err: { message: any }) => err.message);
  }
};

const getProductsByCategory = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const category = req.body;
    const products = await Products.find({ category });

    res.json({
      status: "success",
      result: products.length,
      products,
    });
  } catch (err) {
    res.status(500).json((err: { message: any }) => err.message);
  }
};
