import { createSessionClient } from "@/appwrite/server/config";
import { DB, PRODUCTS } from "@/appwrite/server/name";
import { SESSION_COOKIE } from "@/const";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log(data)

    return NextResponse.json({
      success: true,
      message: "Product added successfully",
    }, {status: 201})
    
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to add product"
    }, { status: 500 });
  }
}


export async function GET() {
  try {
    console.log("hello 23124142")

    const session = (await cookies()).get(SESSION_COOKIE)  

    if (!session || !session.value) {
      return NextResponse.json({
        success: false,
        error: "Unauthorized"
      }, { status: 401})
    }

    
    const { databases } = await createSessionClient(session)



    return NextResponse.json({
      success: true,
      message: "Product added successfully",
    }, {status: 201})
    
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to add product"
    }, { status: 500 });
  }
}