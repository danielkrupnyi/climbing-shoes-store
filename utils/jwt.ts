import jwt from "jsonwebtoken";

type payloadData = {
  id: string;
};

export const createAccessToken = (payload: payloadData) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: "15m" });
};

export const createRefreshToken = (payload: payloadData) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: "7d" });
};
