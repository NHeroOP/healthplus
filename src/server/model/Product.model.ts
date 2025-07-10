import { Document, Model, Schema, model, models } from "mongoose";

export interface Product extends Document {
  name: string,
  price: string,
  image: string,
  description: string,
  stock: number,
  inStock: boolean,
  usage: string,
  brand: string,
  category: string,
  ingredients: string,
}

const ProductSchema: Schema<Product> = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Product name is required"],
  },
  price: {
    type: String,
    required: [true, "Product price is required"],
  },
  image: {
    type: String,
    required: [true, "Product image is required"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  stock: {
    type: Number,
    required: [true, "Product stock is required"],
    default: 0,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  usage: {
    type: String,
    required: [true, "Product usage is required"],
  },
  brand: {
    type: String,
    required: [true, "Product brand is required"],
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
  },
  ingredients: {
    type: String,
    required: [true, "Product ingredients are required"],
  }
})

const ProductModel = (models?.Product as Model<Product>) || (model("Product", ProductSchema)<Product>)

export default ProductModel