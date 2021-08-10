import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import valid from "../../../utils/valid";

connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      await register(req, res);
      break;
  }
};

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const errMsg = valid(firstName, lastName, email, password);

    if (errMsg) return res.status(400).json({ err: errMsg });

    const user = await Users.findOne({ email });
    if (user)
      return res.status(400).json({ err: "This email already exists." });

    const passHash = await bcrypt.hash(password, 12);

    const newUser = new Users({
      firstName,
      lastName,
      email,
      password: passHash,
    });

    await newUser.save();
    res.json({ msg: "Register Success!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
