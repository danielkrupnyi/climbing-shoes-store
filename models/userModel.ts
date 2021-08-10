import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    root: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.models.user || mongoose.model("user", userSchema);

export default Users;
