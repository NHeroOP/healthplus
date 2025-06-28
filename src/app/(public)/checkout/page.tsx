"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { useCart } from "@/contexts/CartContext"

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    saveInfo: false,
  })

  const subtotal = getTotalPrice()
  const tax = subtotal * 0.08
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + tax + shipping

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsProcessing(false)
    setOrderComplete(true)
    clearCart()

    // Redirect to success page after 3 seconds
    setTimeout(() => {
      router.push("/")
    }, 3000)
  }

  if (items.length === 0 && !orderComplete) {
    return (
      <>
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">No items to checkout</h1>
            <p className="text-muted-foreground mb-6">Your cart is empty. Add some items before checking out.</p>
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

  if (orderComplete) {
    return (
      <>
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <CheckCircle className="mx-auto h-24 w-24 text-green-500 mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for your purchase. Your order has been successfully placed and will be processed shortly.
            </p>
            <div className="bg-muted p-4 rounded-lg mb-6">
              <p className="text-sm text-muted-foreground">
                Order Total: <span className="font-bold text-foreground">${total.toFixed(2)}</span>
              </p>
              <p className="text-sm text-muted-foreground">You will receive an email confirmation shortly.</p>
            </div>
            <p className="text-sm text-muted-foreground">Redirecting to home page...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>

      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <Link href="/cart" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Checkout</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Checkout Form */}
              <div className="space-y-6">
                {/* Contact Information */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-card-foreground">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-background border-input"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-card-foreground">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          required
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="bg-background border-input"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-card-foreground">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          required
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="bg-background border-input"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-card-foreground">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="bg-background border-input"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Address */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="address" className="text-card-foreground">
                        Address
                      </Label>
                      <Input
                        id="address"
                        required
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="bg-background border-input"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-card-foreground">
                          City
                        </Label>
                        <Input
                          id="city"
                          required
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          className="bg-background border-input"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-card-foreground">
                          State
                        </Label>
                        <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                          <SelectTrigger className="bg-background border-input">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border">
                            <SelectItem value="CA">California</SelectItem>
                            <SelectItem value="NY">New York</SelectItem>
                            <SelectItem value="TX">Texas</SelectItem>
                            <SelectItem value="FL">Florida</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="zipCode" className="text-card-foreground">
                        ZIP Code
                      </Label>
                      <Input
                        id="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        className="bg-background border-input"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Information */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center text-card-foreground">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="nameOnCard" className="text-card-foreground">
                        Name on Card
                      </Label>
                      <Input
                        id="nameOnCard"
                        required
                        value={formData.nameOnCard}
                        onChange={(e) => handleInputChange("nameOnCard", e.target.value)}
                        className="bg-background border-input"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardNumber" className="text-card-foreground">
                        Card Number
                      </Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        required
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                        className="bg-background border-input"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate" className="text-card-foreground">
                          Expiry Date
                        </Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          required
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                          className="bg-background border-input"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-card-foreground">
                          CVV
                        </Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          required
                          value={formData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                          className="bg-background border-input"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="saveInfo"
                        checked={formData.saveInfo}
                        onCheckedChange={(checked) => handleInputChange("saveInfo", checked as boolean)}
                      />
                      <Label htmlFor="saveInfo" className="text-sm text-muted-foreground">
                        Save payment information for future purchases
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <Card className="border-border bg-card sticky top-20">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="h-12 w-12 rounded object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-card-foreground truncate">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-medium text-card-foreground">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Price Breakdown */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="text-card-foreground">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="text-card-foreground">
                          {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                        </span>
                      </div>
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

                    {/* Security Features */}
                    <div className="space-y-2 pt-4 border-t border-border">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Shield className="mr-2 h-4 w-4" />
                        SSL Encrypted Checkout
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Truck className="mr-2 h-4 w-4" />
                        {shipping === 0 ? "Free shipping on orders over $50" : "Standard shipping"}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        `Complete Order - $${total.toFixed(2)}`
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      By placing your order, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>

    </>
  )
}
