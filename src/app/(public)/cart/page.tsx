"use client"

import { useState } from "react"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { useCart } from "@/contexts/CartContext"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const applyPromoCode = () => {
    // Simple promo code logic
    if (promoCode.toLowerCase() === "health10") {
      setDiscount(0.1) // 10% discount
    } else if (promoCode.toLowerCase() === "save5") {
      setDiscount(0.05) // 5% discount
    } else {
      setDiscount(0)
      alert("Invalid promo code")
    }
  }

  const subtotal = getTotalPrice()
  const discountAmount = subtotal * discount
  const tax = (subtotal - discountAmount) * 0.08 // 8% tax
  const total = subtotal - discountAmount + tax

  if (items.length === 0) {
    return (
      <>
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/products">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>

      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <Link href="/products" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Shopping Cart</h1>
            <p className="text-muted-foreground">{items.length} items in your cart</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card className="border-border bg-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-card-foreground">Cart Items</CardTitle>
                  <Button variant="outline" size="sm" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border border-border rounded-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-20 w-20 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-card-foreground truncate">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                        <p className="text-lg font-bold text-primary">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center border border-input rounded-md">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="px-3 text-sm min-w-[3rem] text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-sm font-medium text-card-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Promo Code */}
                  <div>
                    <label className="text-sm font-medium text-card-foreground">Promo Code</label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="bg-background border-input"
                      />
                      <Button variant="outline" onClick={applyPromoCode}>
                        Apply
                      </Button>
                    </div>
                    {discount > 0 && <p className="text-sm text-green-600 mt-1">{discount * 100}% discount applied!</p>}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-card-foreground">${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Discount</span>
                        <span className="text-green-600">-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="text-card-foreground">${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-card-foreground">Total</span>
                      <span className="text-card-foreground">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link href="/checkout" className="w-full">
                    <Button className="w-full" size="lg">
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <div className="text-xs text-muted-foreground text-center">
                    <p>Secure checkout with SSL encryption</p>
                    <p className="mt-1">Free delivery on orders over $50</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
