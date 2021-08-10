import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import { createAccessToken } from "../../../utils/jwt";

connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token) return res.status(400).json({ err: "Please login now!" });

    const result: any = jwt.verify(rf_token, process.env.REFRESH_TOKEN);
    if (!result)
      return res
        .status(400)
        .json({ err: "Your token is incorrect or has expired" });

    const user = await Users.findById(result.id);
    if (!user) return res.status(400).json({ err: "User does not exist." });

    const access_token = createAccessToken({ id: user._id });

    res.json({
      access_token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        root: user.root,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
