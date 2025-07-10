import connectDB from "@/server/connectDB";
import { NextResponse } from "next/server";
import ProductModel from "@/server/model/Product.model";

export async function GET() {
  try {
    await connectDB();
    const products = await ProductModel.find({});
    const productsObj = products.map((product) => ({
      id: String(product._id),
      name: product.name,
      price: Number(product.price),
      image: product.image,
      description: product.description,
      // stock: product.stock,
      inStock: product.inStock,
      usage: product.usage,
      brand: product.brand,
      category: product.category,
      ingredients: product.ingredients,
    }));

    return NextResponse.json(
      {
        success: true,
        products: productsObj,
        error: null,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("/api/store/products GET error: ", err);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}
