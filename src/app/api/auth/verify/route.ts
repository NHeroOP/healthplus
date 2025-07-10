import { signIn } from "@/server/auth";
import connectDB from "@/server/connectDB";
import UserModel from "@/server/model/User.model";

export async function POST(req:Request ) {
  await connectDB()
  try {
    const { id, otp } = await req.json()
    const user = await UserModel.findOne({ _id: id})

    if (!user) {
      return Response.json({ 
        success: false,
        error: true,
        message: "User not found" 
      }, { status: 500 })
    }

    if (user.isVerified) {
      return Response.json({ 
        success: false,
        error: true,
        message: "User is already verified" 
      }, { status: 400 })
    }

    const isTokenValid = user.verifyToken === otp
    const isTokenExpired = new Date(user.verifyTokenExpiry) < new Date()

    if (isTokenValid && !isTokenExpired) {
      user.isVerified = true
      await user.save()

      await signIn("credentials", {
        redirect: false,
        identifier: user.email,
        isVerifiedLogin: true,
      })

      return Response.json({ 
        success: true, 
        error: false,
        message: "User verified successfully" 
      }, { status: 200 })
    } 
    else if (isTokenExpired) {
      return Response.json({ 
        success: false,
        error: true,
        message: "Verification code expired, Please Signup Again" 
      }, { status: 400 })
    } 
    else {
      return Response.json({ 
        success: false, 
        error: true,
        message: "Invalid verification code" 
      }, { status: 400 })
    }
  } catch (err) {
    console.error("Error while verifying user", err);
    return Response.json({
      success: false,
      error: true,
      message: "Failed to verify user",
    }, { status: 500})
  }
}