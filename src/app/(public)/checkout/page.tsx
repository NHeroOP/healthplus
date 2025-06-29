"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle, Lock, Package, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { useCart } from "@/contexts/CartContext"

// Payment Icons Component  
const PaymentIcons = () => (
  <div className="flex items-center space-x-2 mt-2">
    {/* Visa */}
    <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
      <span className="text-white text-xs font-bold">VISA</span>
    </div>
    {/* Mastercard */}
    <div className="w-10 h-6 bg-red-500 rounded flex items-center justify-center relative overflow-hidden">
      <div className="w-3 h-3 bg-red-500 rounded-full absolute left-1"></div>
      <div className="w-3 h-3 bg-yellow-400 rounded-full absolute right-1"></div>
    </div>
    {/* American Express */}
    <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center">
      <span className="text-white text-xs font-bold">AMEX</span>
    </div>
    {/* Discover */}
    <div className="w-10 h-6 bg-orange-500 rounded flex items-center justify-center">
      <span className="text-white text-xs font-bold">DISC</span>
    </div>
    {/* PayPal */}
    <div className="w-10 h-6 bg-blue-700 rounded flex items-center justify-center">
      <span className="text-white text-xs font-bold">PP</span>
    </div>
  </div>
)

// Stripe Payment Icons
const StripePaymentIcons = () => (
  <div className="flex items-center space-x-3 mt-3">
    <div className="flex items-center space-x-2">
      {/* Visa SVG */}
      <svg width="32" height="20" viewBox="0 0 32 20" fill="none" className="border rounded">
        <rect width="32" height="20" fill="white" />
        <path
          d="M13.3 6.5h-2.8l-1.7 7h2.8l1.7-7zm7.6 4.5c0-1.8-2.4-1.9-2.4-2.7 0-.2.2-.5.7-.5.8 0 1.4.2 1.4.2l.3-1.3s-.7-.3-1.6-.3c-1.7 0-2.9.9-2.9 2.2 0 1 .9 1.5 1.6 1.9.7.4 1 .7 1 1.1 0 .6-.7.9-1.4.9-.9 0-1.8-.2-1.8-.2l-.3 1.4s.8.3 2 .3c1.8 0 3-1 3-2.3zm4.8-4.5h-2.2c-.5 0-.9.3-1.1.7l-3.1 6.3h2.8s.5-1.2.6-1.5h3.4c.1.3.3 1.5.3 1.5h2.5l-2.2-7zm-1.9 4.4c.2-.5.9-2.4.9-2.4s.2-.5.3-.8l.2.9s.5 2.4.6 2.9h-2l-.1-.6zm-9.8-4.4l-2.7 4.8-.3-1.5c-.5-1.7-2.1-3.5-3.9-4.4l2.5 6.1h2.8l4.3-7h-2.7z"
          fill="#1434CB"
        />
      </svg>

      {/* Mastercard SVG */}
      <svg width="32" height="20" viewBox="0 0 32 20" fill="none" className="border rounded">
        <rect width="32" height="20" fill="white" />
        <circle cx="12" cy="10" r="6" fill="#EB001B" />
        <circle cx="20" cy="10" r="6" fill="#F79E1B" />
        <path d="M16 6.5c1.2 1 2 2.4 2 4s-.8 3-2 4c-1.2-1-2-2.4-2-4s.8-3 2-4z" fill="#FF5F00" />
      </svg>

      {/* American Express SVG */}
      <svg width="32" height="20" viewBox="0 0 32 20" fill="none" className="border rounded">
        <rect width="32" height="20" fill="#006FCF" />
        <path
          d="M8.5 7h1.8l.4 1h1.2l-.4-1h1.8v.8h1.5v-.8h3v.8h.8l.9-.8h2.1v6h-2.1l-.9-.8h-.8v.8h-3v-.8h-1.5v.8h-1.8l-.4-1h-1.2l.4 1h-1.8v-6z"
          fill="white"
        />
      </svg>

      {/* PayPal SVG */}
      <svg width="32" height="20" viewBox="0 0 32 20" fill="none" className="border rounded">
        <rect width="32" height="20" fill="white" />
        <path
          d="M8 5h4c2 0 3 1 3 3 0 2-1 3-3 3h-2l-.5 2h-1.5l1-8zm3 4c1 0 1.5-.5 1.5-1.5s-.5-1.5-1.5-1.5h-1.5l-.5 3h2zm5-4h4c2 0 3 1 3 3 0 2-1 3-3 3h-2l-.5 2h-1.5l1-8zm3 4c1 0 1.5-.5 1.5-1.5s-.5-1.5-1.5-1.5h-1.5l-.5 3h2z"
          fill="#003087"
        />
        <path
          d="M8 5h4c2 0 3 1 3 3 0 2-1 3-3 3h-2l-.5 2h-1.5l1-8zm3 4c1 0 1.5-.5 1.5-1.5s-.5-1.5-1.5-1.5h-1.5l-.5 3h2z"
          fill="#009CDE"
        />
      </svg>
    </div>
    <div className="text-xs text-muted-foreground">Secured by Stripe</div>
  </div>
)

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("card")
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
    shippingMethod: "standard",
  })

  const subtotal = getTotalPrice()
  const tax = subtotal * 0.08
  const shipping = formData.shippingMethod === "express" ? 12.99 : subtotal > 50 ? 0 : 5.99
  const total = subtotal + tax + shipping

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Here you would integrate with Stripe
    // const stripe = await stripePromise
    // const { error } = await stripe.confirmCardPayment(clientSecret, {
    //   payment_method: {
    //     card: elements.getElement(CardElement),
    //     billing_details: {
    //       name: formData.nameOnCard,
    //       email: formData.email,
    //     },
    //   }
    // })

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsProcessing(false)
    setOrderComplete(true)
    clearCart()

    // Redirect to success page after 5 seconds
    setTimeout(() => {
      router.push("/")
    }, 5000)
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
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
        <Footer />
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <CheckCircle className="mx-auto h-24 w-24 text-green-500 mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-6 text-lg">
              Thank you for your purchase. Your order has been successfully placed and will be processed shortly.
            </p>

            <div className="bg-muted p-6 rounded-lg mb-8 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Order Number:</span>
                <span className="font-mono font-bold">#HP{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Order Total:</span>
                <span className="font-bold text-lg text-primary">${total.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Estimated Delivery:</span>
                <span className="font-medium">
                  {formData.shippingMethod === "express" ? "1-2 business days" : "3-5 business days"}
                </span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 mb-8">
              <div className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Package className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-medium text-sm">Order Processing</h3>
                <p className="text-xs text-muted-foreground text-center">We'll prepare your order</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <Truck className="h-8 w-8 text-yellow-600 mb-2" />
                <h3 className="font-medium text-sm">In Transit</h3>
                <p className="text-xs text-muted-foreground text-center">Your order is on the way</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-medium text-sm">Delivered</h3>
                <p className="text-xs text-muted-foreground text-center">Enjoy your products!</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              You will receive an email confirmation with tracking information shortly.
            </p>
            <p className="text-sm text-muted-foreground">Redirecting to home page in 5 seconds...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <Link href="/cart" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Secure Checkout</h1>

            {/* Progress Steps */}
            <div className="flex items-center mt-6 space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step}
                  </div>
                  <span className={`ml-2 text-sm ${step <= currentStep ? "text-foreground" : "text-muted-foreground"}`}>
                    {step === 1 ? "Information" : step === 2 ? "Shipping" : "Payment"}
                  </span>
                  {step < 3 && <div className="w-8 h-px bg-muted mx-4" />}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Checkout Form */}
              <div className="space-y-6">
                {/* Step 1: Contact Information */}
                {currentStep === 1 && (
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="text-card-foreground flex items-center">
                        <Lock className="mr-2 h-5 w-5" />
                        Contact Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="email" className="text-card-foreground">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="bg-background border-input"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="text-card-foreground">
                            First Name *
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
                            Last Name *
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
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="bg-background border-input"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address" className="text-card-foreground">
                          Street Address *
                        </Label>
                        <Input
                          id="address"
                          required
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          className="bg-background border-input"
                          placeholder="123 Main Street"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city" className="text-card-foreground">
                            City *
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
                            State *
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
                              <SelectItem value="IL">Illinois</SelectItem>
                              <SelectItem value="PA">Pennsylvania</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="zipCode" className="text-card-foreground">
                          ZIP Code *
                        </Label>
                        <Input
                          id="zipCode"
                          required
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange("zipCode", e.target.value)}
                          className="bg-background border-input"
                          placeholder="12345"
                        />
                      </div>
                      <Button type="button" onClick={nextStep} className="w-full">
                        Continue to Shipping
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Step 2: Shipping Method */}
                {currentStep === 2 && (
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="text-card-foreground flex items-center">
                        <Truck className="mr-2 h-5 w-5" />
                        Shipping Method
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <RadioGroup
                        value={formData.shippingMethod}
                        onValueChange={(value) => handleInputChange("shippingMethod", value)}
                      >
                        <div className="flex items-center space-x-2 p-4 border border-border rounded-lg">
                          <RadioGroupItem value="standard" id="standard" />
                          <div className="flex-1">
                            <Label htmlFor="standard" className="text-card-foreground font-medium cursor-pointer">
                              Standard Shipping
                            </Label>
                            <p className="text-sm text-muted-foreground">3-5 business days</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-card-foreground">{subtotal > 50 ? "Free" : "$5.99"}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border border-border rounded-lg">
                          <RadioGroupItem value="express" id="express" />
                          <div className="flex-1">
                            <Label htmlFor="express" className="text-card-foreground font-medium cursor-pointer">
                              Express Shipping
                            </Label>
                            <p className="text-sm text-muted-foreground">1-2 business days</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-card-foreground">$12.99</p>
                          </div>
                        </div>
                      </RadioGroup>

                      <div className="flex gap-3">
                        <Button type="button" variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
                          Back
                        </Button>
                        <Button type="button" onClick={nextStep} className="flex-1">
                          Continue to Payment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Step 3: Payment Information */}
                {currentStep === 3 && (
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="text-card-foreground flex items-center">
                        <CreditCard className="mr-2 h-5 w-5" />
                        Payment Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-card-foreground mb-2 block">Payment Method</Label>
                        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                          <div className="flex items-center space-x-2 p-4 border border-border rounded-lg">
                            <RadioGroupItem value="card" id="card" />
                            <div className="flex-1">
                              <Label htmlFor="card" className="cursor-pointer font-medium">
                                Credit/Debit Card
                              </Label>
                              <StripePaymentIcons />
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border border-border rounded-lg">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <div className="flex-1">
                              <Label htmlFor="paypal" className="cursor-pointer font-medium flex items-center">
                                PayPal
                                <div className="ml-2 w-16 h-6 bg-blue-600 rounded flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">PayPal</span>
                                </div>
                              </Label>
                              <p className="text-sm text-muted-foreground mt-1">
                                Pay securely with your PayPal account
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border border-border rounded-lg">
                            <RadioGroupItem value="apple_pay" id="apple_pay" />
                            <div className="flex-1">
                              <Label htmlFor="apple_pay" className="cursor-pointer font-medium flex items-center">
                                Apple Pay
                                <div className="ml-2 w-12 h-6 bg-black rounded flex items-center justify-center">
                                  <span className="text-white text-xs">🍎</span>
                                </div>
                              </Label>
                              <p className="text-sm text-muted-foreground mt-1">Pay with Touch ID or Face ID</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border border-border rounded-lg">
                            <RadioGroupItem value="google_pay" id="google_pay" />
                            <div className="flex-1">
                              <Label htmlFor="google_pay" className="cursor-pointer font-medium flex items-center">
                                Google Pay
                                <div className="ml-2 w-12 h-6 bg-white border rounded flex items-center justify-center">
                                  <span className="text-xs">G Pay</span>
                                </div>
                              </Label>
                              <p className="text-sm text-muted-foreground mt-1">Pay with your Google account</p>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      {paymentMethod === "card" && (
                        <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                          <div className="text-sm text-muted-foreground mb-3">
                            <Shield className="inline w-4 h-4 mr-1" />
                            Your payment information is secured with 256-bit SSL encryption
                          </div>

                          {/* This is where you would integrate your custom Stripe components */}
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="nameOnCard" className="text-card-foreground">
                                Name on Card *
                              </Label>
                              <Input
                                id="nameOnCard"
                                required
                                value={formData.nameOnCard}
                                onChange={(e) => handleInputChange("nameOnCard", e.target.value)}
                                className="bg-background border-input"
                                placeholder="John Doe"
                              />
                            </div>

                            {/* Placeholder for Stripe Card Element */}
                            <div>
                              <Label className="text-card-foreground">Card Information *</Label>
                              <div className="mt-1 p-3 border border-input rounded-md bg-background">
                                <div className="text-muted-foreground text-sm">
                                  {/* Your custom Stripe CardElement would go here */}
                                  Card details will be handled by Stripe Elements
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "paypal" && (
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            You will be redirected to PayPal to complete your payment securely.
                          </p>
                        </div>
                      )}

                      {(paymentMethod === "apple_pay" || paymentMethod === "google_pay") && (
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            Use your device's biometric authentication to complete the payment.
                          </p>
                        </div>
                      )}

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

                      <div className="flex gap-3">
                        <Button type="button" variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
                          Back
                        </Button>
                        <Button type="submit" className="flex-1" disabled={isProcessing}>
                          {isProcessing ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Processing...
                            </>
                          ) : (
                            `Complete Order - $${total.toFixed(2)}`
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Order Summary */}
              <div>
                <Card className="border-border bg-card sticky top-20">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="h-12 w-12 rounded object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-card-foreground truncate">{item.name}</p>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                Qty: {item.quantity}
                              </Badge>
                              <span className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</span>
                            </div>
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
                          {shipping === 0 ? (
                            <span className="text-green-600 font-medium">Free</span>
                          ) : (
                            `$${shipping.toFixed(2)}`
                          )}
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
                        256-bit SSL Encryption
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-2 h-4 w-4" />
                        {formData.shippingMethod === "express" ? "1-2 day delivery" : "3-5 day delivery"}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Package className="mr-2 h-4 w-4" />
                        Licensed pharmacy guarantee
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CreditCard className="mr-2 h-4 w-4" />
                        PCI DSS Compliant
                      </div>
                    </div>

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

      <Footer />
    </div>
  )
}
