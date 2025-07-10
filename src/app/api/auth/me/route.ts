import { auth } from "@/server/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    const user = session?.user
    
    const data = {
      username: user?.username,
      email: user?.email,
      isVerified: user?.isVerified,
    }

    return NextResponse.json({
      success: true,
      error: false,
      message: "User fetched successfully",
      data,
    }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      success: false,
      error: true,
      message: "Failed to fetch user",
    }, { status: 500 });
  }
}