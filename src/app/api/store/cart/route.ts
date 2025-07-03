import { createAdminClient, getLoggedInUser } from "@/appwrite/server/config";
import { DB, PRODUCTS } from "@/appwrite/server/name";
import { CART_COOKIE, SESSION_COOKIE } from "@/const";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await getLoggedInUser();
    const session = (await cookies()).get(SESSION_COOKIE);

    if (!user || !session) {
      return NextResponse.json({
        success: false,
        error: "User not authenticated.",
      }, { status: 401 });
    }

    const item = await req.json();

    if (!item || !item.id || !item.quantity) {
      return NextResponse.json({
        success: false,
        error: "Invalid item data provided.",
      }, { status: 400 });
    }

    let cartItems = [];
    const cart = (await cookies()).get(CART_COOKIE);

    if (cart && cart.value) {
      cartItems = JSON.parse(cart.value);
      const existingItemIndex = cartItems.findIndex((i: any) => i.id === item.id);

      if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity += item.quantity;
      } else {
        cartItems.push(item);
      }

    } else {
      cartItems = [item];
    }

    (await cookies()).set(CART_COOKIE, JSON.stringify(cartItems), {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });


    return NextResponse.json({
      success: true,
      message: "Item added to cart successfully.",  
      error: null,
    }, { status: 200})

  } catch (err) {
    console.log("Error in POST /api/store/cart:", err);
    return NextResponse.json({
      success: false,
      error: "An error occurred while processing your request.",
    }, { status: 500 });
  }
}


export async function GET() {
  try {
    const user = await getLoggedInUser();
    const session = (await cookies()).get(SESSION_COOKIE);

    if (!user || !session) {
      return NextResponse.json({
        success: false,
        error: "User not authenticated.",
      }, { status: 401 });
    }

    const cart = (await cookies()).get(CART_COOKIE);

    if (!cart || !cart.value) {
      return NextResponse.json({
        success: true,
        items: [],
      }, { status: 200 });
    }

    const cartItems = JSON.parse(cart.value);

    const { databases } = await createAdminClient();

    let products = cartItems.map((item: any) => {
      const product = databases.getDocument(
        DB, PRODUCTS, item.id
      ) 
      return product;
    });

    // if (!products) {
    //   return NextResponse.json({
    //     success: false,
    //     error: "No products found in the cart.",
    //   }, { status: 404 });
    // }

    products = await Promise.all(products);

    const productsObj = products.map((product: any) => (
      {
        id: product.$id,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
        quantity: cartItems.find((cartItem: any) => cartItem.id.toString() === product.$id)?.quantity || 1,
      }
    ))


    return NextResponse.json({
      success: true,
      items: productsObj,
    }, { status: 200 });

  } catch (err) {
    console.log("Error in GET /api/store/cart:", err);
    return NextResponse.json({
      success: false,
      error: "An error occurred while retrieving the cart.",
    }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getLoggedInUser();
    const session = (await cookies()).get(SESSION_COOKIE);

    if (!user || !session) {
      return NextResponse.json({
        success: false,
        error: "User not authenticated.",
      }, { status: 401 });
    }

    const item = await req.json()
    const cart = (await cookies()).get(CART_COOKIE);

    if (!cart) {
      return NextResponse.json({
        success: false,
        error: "Cart is empty.",
      }, { status: 400 });
    }
    
    const cartItems = JSON.parse(cart.value)
    const existingItemIndex = cartItems.findIndex((i: any) => i.id.toString() === item.id);


    if (existingItemIndex === -1) {
      return NextResponse.json({
        success: false,
        error: "Item not found in the cart.",
      }, { status: 404 });
    }
    
    if (!item.quantity) {
      cartItems.splice(existingItemIndex, 1);
    } else {
      cartItems[existingItemIndex].quantity = item.quantity;
    }

    (await cookies()).set(CART_COOKIE, JSON.stringify(cartItems), {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });


    return NextResponse.json({
      success: true,
      items: cartItems,
      error: null,
    }, { status: 200 });

  } catch (err) {
    console.log("Error in PUT /api/store/cart:", err);
    return NextResponse.json({
      success: false,
      error: "An error occurred while updating the cart.",
    }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const user = await getLoggedInUser();
    const session = (await cookies()).get(SESSION_COOKIE);

    if (!user || !session) {
      return NextResponse.json({
        success: false,
        error: "User not authenticated.",
      }, { status: 401 });
    }

    (await cookies()).set(CART_COOKIE, "", {});
    return NextResponse.json({
      success: true,
      message: "Cart cleared successfully.",
    }, { status: 200 });
  }
  catch (err) {
    console.log("Error in DELETE /api/store/cart:", err);
    return NextResponse.json({
      success: false,
      error: "An error occurred while clearing the cart.",
    }, { status: 500 });
  }
}