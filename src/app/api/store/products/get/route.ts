import { createSessionClient } from "@/appwrite/server/config";
import { DB, PRODUCTS } from "@/appwrite/server/name";
import { SESSION_COOKIE } from "@/const";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {

  try {
    const session = (await cookies()).get(SESSION_COOKIE)  

    if (!session || !session.value) {
      return NextResponse.json({
        success: false,
        error: "Unauthorized"
      }, { status: 401})
    }
    
    const { databases } = await createSessionClient(session);
    const { documents } = await databases.listDocuments(
      DB,
      PRODUCTS
    )

    if (!documents) {
      return NextResponse.json({
        success: false,
        error: "No products found"
      }, { status: 404 });
    }

    const products = documents.map((doc) => ({
      id: Number(doc.$id),
      name: doc.name,
      category: doc.category,
      price: doc.price,
      image: doc.image,
      inStock: doc.inStock,
      brand: doc.brand,
      description: doc.description,
      usage: doc.usage,
      ingredients: doc.ingredients,
    }));

    products.sort((a, b) => a.id - b.id);

    return NextResponse.json({
      success: true,
      products: products
    }, { status: 200 });
    

  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch products"
    }, { status: 500 });
  }
}