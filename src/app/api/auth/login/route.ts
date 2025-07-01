import { SESSION_COOKIE } from "@/const";
import { createAdminClient, getLoggedInUser } from "@/appwrite/server/config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { AppwriteException } from "node-appwrite";

export async function POST(req: NextRequest) {
  console.log("test123")
  const { email, password } = await req.json();

  try {
    const { account, users } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);
  
    (await cookies()).set(SESSION_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: new Date(session.expire),
    });

    const user = await getLoggedInUser();
    const userObj = {
      id: user?.$id,
      email: user?.email,
      name: user?.name,
      firstName: user?.name.split(" ")[0] || "",
      lastName: user?.name.split(" ")[1] || "",
      phome: user?.phone,
      role: user?.labels[0] || "user",
    }


    return NextResponse.json({success: true, user: userObj, error: null}, {status: 200})
  }
  catch (error) {
    // console.log(error)
    return NextResponse.json({success: false, error: error instanceof AppwriteException ? error : null}, {status: 500})
  } 

}