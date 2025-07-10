import { Document, Model, Schema, model, models } from "mongoose";

export interface User extends Document {
  username: string;
  firstName: string;
  lastName?: string;
  phone?: string;
  email: string;
  password: string;
  verifyToken: string;
  verifyTokenExpiry: Date;
  isVerified: boolean;
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    default: ""
  },
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    unique: true,
    default: "",
    match: [/^\+?[1-9]\d{1,14}$/, "Please use a valid phone number"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use a valid email address"]
  },
  password: {
    type: String,
    required: [true, "Email is required"]
  },
  verifyToken: {
    type: String,
    required: [true, "VerifyToken is required"]
  },
  verifyTokenExpiry: {
    type: Date,
    required: [true, "VerifyTokenExpiry is required"]
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
})

const UserModel = (models?.User as Model<User>) || (model("User", UserSchema)<User>)

export default UserModel