import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import { createAccessToken, createRefreshToken } from "../../../utils/jwt";

connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      await login(req, res);
      break;
  }
};

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user)
      return res.status(400).json({ err: "This user does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ err: "Incorrect password" });

    const access = createAccessToken({ id: user._id });
    const refresh = createRefreshToken({ id: user._id });

    res.status(200).json({
      msg: "Login Success!",
      access,
      refresh,
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
