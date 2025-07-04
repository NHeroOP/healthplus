"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, Truck, Shield, Tag, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast, useSonner } from "sonner"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/store/Cart"

interface CartItem { 
  id: number
  name: string
  category: string
  price: number
  image?: string
  quantity: number
}

const PROMO_CODES = {
  HEALTH10: { discount: 0.1, description: "10% off your order" },
  SAVE5: { discount: 5, description: "$5 off orders over $25", minOrder: 25 },
  WELCOME15: { discount: 0.15, description: "15% off for new customers" },
  FREESHIP: { discount: 0, description: "Free shipping", freeShipping: true },
}

export default function CartPage() {
  const { updateItems, removeItem, clearCart } = useCartStore()
  const [items, setItems] = useState<CartItem[]>([])
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [promoError, setPromoError] = useState("")

  const [isLoading, setIsLoading] = useState(true)
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false)

  const [subtotal, setsubtotal] = useState(0)
  const promoDiscount = appliedPromo ? calculatePromoDiscount(subtotal, appliedPromo) : 0
  const shipping = appliedPromo === "FREESHIP" || subtotal > 50 ? 0 : 5.99
  const tax = (subtotal - promoDiscount) * 0.08
  const total = subtotal - promoDiscount + shipping + tax

  function calculatePromoDiscount(subtotal: number, code: string): number {
    const promo = PROMO_CODES[code as keyof typeof PROMO_CODES]
    if (!promo) return 0

    if ("minOrder" in promo && promo.minOrder && subtotal < promo.minOrder) return 0

    if (promo.discount < 1) {
      return subtotal * promo.discount
    } else {
      return promo.discount
    }
  }

  const handleQuantityChange = async (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      try {
        removeItem(id.toString())
        const { data } = await axios.put("/api/store/cart", { id })
        setItems((prev) => prev.filter((item) => item.id !== id))
        toast.success("Item removed", {
          description: "Item has been removed from your cart",
        })
        
      } catch (error) {
        toast.error("Failed to update quantity")
        return
      }
    } else {
      try {
        updateItems({id: id.toString(), quantity: newQuantity})
        const { data } = await axios.put("/api/store/cart", { id, quantity: newQuantity })
        setItems((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        ))
        toast.success("Quantity updated", {
          description: `Quantity for item has been updated to ${newQuantity}`,
        })
      } catch (error) {
        toast.error("Failed to update quantity")
      }
    }
  }

  const handleRemoveItem = async(id: number, name: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
    removeItem(id.toString())
    const { data } = await axios.put("/api/store/cart", { id })
    toast.success("Item removed",{
      description: `${name} has been removed from your cart`,
    })
  }

  const handleApplyPromo = () => {
    const code = promoCode.toUpperCase()
    const promo = PROMO_CODES[code as keyof typeof PROMO_CODES]

    if (!promo) {
      setPromoError("Invalid promo code")
      return
    }

    if ("minOrder" in promo && promo.minOrder && subtotal < promo.minOrder) {
      setPromoError(`Minimum order of $${promo.minOrder} required`)
      return
    }

    setAppliedPromo(code)
    setPromoError("")
    setPromoCode("")
    toast.success("Promo code applied!", {
      description: promo.description,
    })
  }

  const handleRemovePromo = () => {
    setAppliedPromo(null)
    toast.warning("Promo code removed", {
      description: "Promo code has been removed from your order",
    })
  }

  const handleClearCart = async () => {
    try {
      await axios.delete("/api/store/cart")
      toast.success("Cart cleared")
    } catch (err) {
      toast.error("Failed to clear cart")
    }
  }


  useEffect(() => {
    setIsLoading(true)
    const getCartAndTotalPrice = async () => {
      try {
        const { data } = await axios.get("/api/store/cart")
        const priceArr = data.items.map((item: any) => (item.price * item.quantity))
        const totalPrice = priceArr.reduce((total: number, i: number) => total + i)
        setsubtotal(totalPrice)
        setItems(data.items || [])
      } catch (err) {
        setItems([])
        setsubtotal(0)
      }
      finally {
        setIsLoading(false)
      }
    }

    getCartAndTotalPrice()
  }, [])

  if (isLoading) { 
    return (
      <div className="flex items-center justify-center h-screen fixed z-[100] bg-black/50 w-full">
        <div className="text-muted-foreground text-sm sm:text-base">
          Loading your cart... &nbsp;
          <span className="loading loading-ring loading-xl"></span>
        </div>
      </div>
    )

  }

  if (items.length === 0) {
    return (
      <>
        <div className="px-2 py-4 sm:px-4 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <ShoppingBag className="mx-auto h-16 w-16 sm:h-24 sm:w-24 text-muted-foreground mb-4 sm:mb-6" />
            <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 px-4">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>

            {/* Features */}
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3 mb-6 sm:mb-8 px-4">
              <div className="flex flex-col items-center p-3 sm:p-4 bg-muted/50 rounded-lg">
                <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-2" />
                <h3 className="font-medium text-xs sm:text-sm">Free Shipping</h3>
                <p className="text-xs text-muted-foreground text-center">On orders over $50</p>
              </div>
              <div className="flex flex-col items-center p-3 sm:p-4 bg-muted/50 rounded-lg">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-2" />
                <h3 className="font-medium text-xs sm:text-sm">Secure Checkout</h3>
                <p className="text-xs text-muted-foreground text-center">SSL encrypted payments</p>
              </div>
              <div className="flex flex-col items-center p-3 sm:p-4 bg-muted/50 rounded-lg">
                <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-2" />
                <h3 className="font-medium text-xs sm:text-sm">Quality Products</h3>
                <p className="text-xs text-muted-foreground text-center">Licensed pharmacy</p>
              </div>
            </div>

            <Link href="/products">
              <Button size="lg" className="px-6 sm:px-8">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="flex flex-1 justify-center items-center px-2 py-4 sm:px-4 sm:py-8 lg:px-8 ">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 sm:mb-8">
            <Link
              href="/products"
              className="inline-flex items-center text-primary hover:text-primary/80 mb-3 sm:mb-4 text-sm"
            >
              <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Continue Shopping
            </Link>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Shopping Cart</h1>
              <Badge variant="secondary" className="text-xs sm:text-sm w-fit">
                {items.reduce((sum, item) => sum + item.quantity, 0)} items
              </Badge>
            </div>
          </div>

          <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="border-border bg-card">
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    <div className="flex gap-3 sm:gap-4">
                      <img
                        src={item.image || "https://placehold.co/80x80.png?text=No+Image"}
                        alt={item.name}
                        className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <h3 className="font-medium text-card-foreground text-sm sm:text-base leading-tight truncate">
                              {item.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1">{item.category}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant="outline" className="text-xs px-1 py-0">
                                In Stock
                              </Badge>
                              <span className="text-xs sm:text-sm font-medium text-primary">
                                ${Number(item.price).toFixed(2)}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id, item.name)}
                            className="text-muted-foreground hover:text-destructive p-1 sm:p-2 h-auto"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between mt-3 sm:mt-4">
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="h-6 w-6 sm:h-8 sm:w-8 p-0"
                            >
                              <Minus className="h-2 w-2 sm:h-3 sm:w-3" />
                            </Button>
                            <span className="w-8 sm:w-12 text-center font-medium text-sm">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="h-6 w-6 sm:h-8 sm:w-8 p-0"
                            >
                              <Plus className="h-2 w-2 sm:h-3 sm:w-3" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-card-foreground text-sm sm:text-base">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Order Summary */}
            <Card className="border-border bg-card gap-2">
              <CardHeader className="p-3 sm:p-4 lg:px-6 !pb-0">
                <CardTitle className="text-card-foreground sm:text-xl font-bold">Order Summary</CardTitle>
              </CardHeader>
              <Separator className="my-2 sm:my-3" />  
              <CardContent className="space-y-4 p-3 sm:p-4 lg:p-6 pt-0">
                <div className="space-y-2">
                  <div>
                    <label className="text-card-foreground flex items-center text-sm sm:text-base">
                      <Tag className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Promo Code
                    </label>

                    <div className="py-4">
                      {!appliedPromo ? (
                        <div className="space-y-2">
                          <div className="flex space-x-2">
                            <Input
                              placeholder="Enter code"
                              value={promoCode}
                              onChange={(e) => {
                                setPromoCode(e.target.value)
                                setPromoError("")
                              }}
                              className="bg-background border-input text-sm"
                            />
                            <Button onClick={handleApplyPromo} disabled={!promoCode.trim()} size="sm" className="px-3">
                              Apply
                            </Button>
                          </div>
                          {promoError && <p className="text-xs sm:text-sm text-destructive">{promoError}</p>}
                          <div className="text-xs text-muted-foreground">Try: HEALTH10, SAVE5, WELCOME15, FREESHIP</div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-2 sm:p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-green-700 dark:text-green-300 text-sm">{appliedPromo}</p>
                            <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 truncate">
                              {PROMO_CODES[appliedPromo as keyof typeof PROMO_CODES].description}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={handleRemovePromo} className="p-1 sm:p-2">
                            Remove
                          </Button>
                        </div>
                      )}
                    </div>
                  {/* {discount > 0 && <p className="text-sm text-green-600 mt-1">{discount * 100}% discount applied!</p>} */}
                  </div>
                  <Separator className="my-6" />

                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-card-foreground">${subtotal.toFixed(2)}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Discount ({appliedPromo})</span>
                      <span className="text-green-600">-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-card-foreground">
                      {shipping === 0 ? (
                        <span className="text-green-600 font-medium">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-card-foreground">${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-base sm:text-lg font-bold">
                    <span className="text-card-foreground">Total</span>
                    <span className="text-card-foreground">${total.toFixed(2)}</span>
                  </div>
                </div>

                {subtotal < 50 && !appliedPromo?.includes("FREESHIP") && (
                  <div className="p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                      Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <form action="/api/checkout" method="GET" onClick={() => setIsCheckoutLoading(true)}>
                    <Button
                      className="w-full"
                      size="lg"
                    >
                      Proceed to Checkout
                    </Button>
                  </form>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent text-sm"
                    onClick={handleClearCart}
                  >
                    Clear Cart
                  </Button>
                </div>

                {/* Security Features */}
                <div className="space-y-2 pt-3 sm:pt-4 border-t border-border">
                  <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                    <Shield className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Secure SSL Checkout
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                    <Truck className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Fast & Reliable Delivery
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {isCheckoutLoading && (
        <div className="flex items-center justify-center h-screen fixed z-[100] bg-black/50 w-full">
          <div className="text-muted-foreground text-sm sm:text-base">
            Processing your order... &nbsp;
            <span className="loading loading-ring loading-xl"></span>
          </div>
        </div>
      )}

    </>
  )
}
