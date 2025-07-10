import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/server/connectDB";
import UserModel from "@/server/model/User.model";
import sendEmail from "@/server/actions/sendEmail";
import { hash } from "bcryptjs";

/**
 * Handles user registration by creating a new user or updating an existing one.
 * It checks if the username is already taken, verifies the email, and sends a verification email.
 *
 * @param {NextRequest} req - The incoming request object.
 * @returns {Promise<NextResponse>} - A response indicating success or failure of the registration.
 */

export async function POST(req: NextRequest): Promise<NextResponse> {
  await connectDB()

  try {
    const { firstName, lastName, phone, email, password } = await req.json()

    const userByEmail = await UserModel.findOne({email})
    const verifyToken = Math.floor(100000 + Math.random() * 900000).toString()


    let userId;
    if (userByEmail){
      if(userByEmail.isVerified){
        return NextResponse.json({
          success: false,
          error: true,
          message: "User already exists with this email"
        }, {status: 400})
      } else {
        const hashedPass = await hash(password, 10)
        userByEmail.username = firstName + lastName
        userByEmail.firstName = firstName
        userByEmail.lastName = lastName
        userByEmail.phone = phone
        userByEmail.password = hashedPass
        userByEmail.verifyToken = verifyToken
        userByEmail.verifyTokenExpiry = new Date(Date.now() + 3600000)
        await userByEmail.save()
      }
    } else {
      const hashedPass = await hash(password, 10)
      const expiryDate = new Date()
      expiryDate.setHours(expiryDate.getHours() + 1)

      const newUser = new UserModel({
        username: firstName + lastName , firstName, lastName, phone, email, password: hashedPass,
        verifyToken, verifyTokenExpiry: expiryDate
      })
      userId = newUser._id
      await newUser.save()
    }

    const emailResponse = await sendEmail(email, `${firstName} ${lastName}`, verifyToken)

    if(!emailResponse.success){
      return NextResponse.json({
        success: false,
        error: true,
        message: emailResponse.message
      }, {status: 500})
    }
 
    return NextResponse.json({
      success: true,
      error: false,
      message: "User Registered Successfully, Please verify your email",
      data: {id: userId}
    }, {status: 200})
  } 
  catch (err) {
    console.log("Error while registering user", err);
    return NextResponse.json({
      success: false,
      error: true,
      message: "Error while registering user"
    }, {status: 500})
  }
}