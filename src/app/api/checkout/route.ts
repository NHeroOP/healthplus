import { createAdminClient } from "@/appwrite/server/config";
import { DB, PRODUCTS } from "@/appwrite/server/name";
import { CART_COOKIE } from "@/const";
import { stripe } from "@/lib/stripe";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cartCookie = (await cookies()).get(CART_COOKIE)
    if (!cartCookie || !cartCookie.value) {
      return NextResponse.json({
        success: false,
        error: "Cart is empty."
      }, {status: 400})
    }

    const cartItems = JSON.parse(cartCookie.value);

    const { databases } = await createAdminClient();
    const items = cartItems.map(async (item: any) => {
      const product = await databases.getDocument(
        DB, PRODUCTS, item.id
      )

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: product.description,
            images: ["https://placehold.co/200x200.png"],
          },
          unit_amount_decimal: String(product.price * 100)
        },
        quantity: item.quantity
      }
    })

    const line_items = await Promise.all(items);

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${req.nextUrl.origin}/profile/orders`,
      cancel_url: `${req.nextUrl.origin}/cart`,
      billing_address_collection: "required",
    })

    if (!session || !session.url) {
      return NextResponse.json({
        success: false,
        error: "Failed to create checkout session."
      }, { status: 500 });
    }
    
    return NextResponse.redirect(session.url, { status: 303 });
    
  } catch (err) {
    console.log("Checkout error:", err);
    return NextResponse.json({
      success: false,
      error: "An error occurred while processing your request.",
    }, { status: 500 }); 
  }
}