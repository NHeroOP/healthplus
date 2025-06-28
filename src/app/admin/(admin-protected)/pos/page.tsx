"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, Minus, Trash2, ShoppingCart, Calculator, Receipt, User, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import AdminSidebar from "@/components/AdminSidebar"

const products = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Tablets",
    price: 12.99,
    stock: 150,
    sku: "HC001",
    barcode: "1234567890123",
  },
  {
    id: 2,
    name: "Cough Syrup",
    category: "Syrups",
    price: 8.5,
    stock: 75,
    sku: "MC002",
    barcode: "1234567890124",
  },
  {
    id: 3,
    name: "Vitamin D3",
    category: "Supplements",
    price: 15.75,
    stock: 0,
    sku: "VL003",
    barcode: "1234567890125",
  },
  {
    id: 4,
    name: "Antiseptic Cream",
    category: "Topical",
    price: 6.25,
    stock: 200,
    sku: "SC004",
    barcode: "1234567890126",
  },
  {
    id: 5,
    name: "Ibuprofen 400mg",
    category: "Tablets",
    price: 9.99,
    stock: 120,
    sku: "PR005",
    barcode: "1234567890127",
  },
]

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  stock: number
}

export default function POSPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [amountPaid, setAmountPaid] = useState("")
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [discount, setDiscount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn")
    if (adminLoggedIn === "true") {
      setIsAuthenticated(true)
    } else {
      router.push("/admin/login")
    }
  }, [router])

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode.includes(searchTerm),
  )

  const addToCart = (product: any) => {
    if (product.stock <= 0) return

    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        if (existingItem.quantity < product.stock) {
          return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
        }
        return prev
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          stock: product.stock,
        },
      ]
    })
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
      return
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const maxQuantity = Math.min(newQuantity, item.stock)
          return { ...item, quantity: maxQuantity }
        }
        return item
      }),
    )
  }

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
    setCustomerName("")
    setCustomerPhone("")
    setDiscount(0)
    setAmountPaid("")
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = subtotal * (discount / 100)
  const tax = (subtotal - discountAmount) * 0.08
  const total = subtotal - discountAmount + tax
  const change = Number.parseFloat(amountPaid) - total

  const handleCheckout = () => {
    if (cart.length === 0) return

    // Simulate transaction processing
    const transaction = {
      id: Date.now(),
      items: cart,
      customer: { name: customerName, phone: customerPhone },
      subtotal,
      discount: discountAmount,
      tax,
      total,
      paymentMethod,
      amountPaid: Number.parseFloat(amountPaid),
      change,
      timestamp: new Date().toISOString(),
    }

    // Save transaction (in real app, this would go to backend)
    const transactions = JSON.parse(localStorage.getItem("pos-transactions") || "[]")
    transactions.push(transaction)
    localStorage.setItem("pos-transactions", JSON.stringify(transactions))

    alert("Transaction completed successfully!")
    clearCart()
    setIsCheckoutOpen(false)
  }

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <header className="bg-card shadow-sm border-b border-border">
          <div className="px-4 sm:px-6 py-4">
            <h1 className="text-xl sm:text-2xl font-bold text-card-foreground">Point of Sale</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Process in-store purchases</p>
          </div>
        </header>

        <main className="flex-1 overflow-hidden p-4 sm:p-6">
          <div className="grid gap-6 lg:grid-cols-3 h-full">
            {/* Product Search & Selection */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="border-border bg-card">
                <CardHeader className="pb-4">
                  <CardTitle className="text-card-foreground">Product Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, SKU, or barcode..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-background border-input"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card flex-1">
                <CardHeader className="pb-4">
                  <CardTitle className="text-card-foreground">Products</CardTitle>
                </CardHeader>
                <CardContent className="overflow-y-auto max-h-[calc(100vh-300px)]">
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredProducts.map((product) => (
                      <Card
                        key={product.id}
                        className={`cursor-pointer transition-all hover:shadow-md border-border bg-background ${
                          product.stock <= 0 ? "opacity-50" : ""
                        }`}
                        onClick={() => addToCart(product)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-card-foreground text-sm">{product.name}</h3>
                            <Badge
                              variant={product.stock > 0 ? "default" : "secondary"}
                              className={`text-xs ${
                                product.stock > 0
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              }`}
                            >
                              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">SKU: {product.sku}</p>
                          <p className="text-xs text-muted-foreground mb-2">{product.category}</p>
                          <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cart & Checkout */}
            <div className="space-y-4">
              <Card className="border-border bg-card">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-card-foreground flex items-center">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Cart ({cart.length})
                    </CardTitle>
                    {cart.length > 0 && (
                      <Button variant="outline" size="sm" onClick={clearCart}>
                        Clear
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 max-h-[300px] overflow-y-auto">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Cart is empty</p>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-card-foreground text-sm truncate">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-6 w-6 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm min-w-[2rem] text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-6 w-6 p-0"
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="h-6 w-6 p-0 text-destructive hover:text-destructive/80"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-sm font-medium text-card-foreground min-w-[4rem] text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card className="border-border bg-card">
                <CardHeader className="pb-4">
                  <CardTitle className="text-card-foreground flex items-center">
                    <Calculator className="mr-2 h-5 w-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-card-foreground">${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Discount ({discount}%)</span>
                        <span className="text-green-600">-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span className="text-card-foreground">${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-card-foreground">Total</span>
                      <span className="text-card-foreground">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full" size="lg" disabled={cart.length === 0}>
                        <Receipt className="mr-2 h-4 w-4" />
                        Checkout
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md bg-card border-border">
                      <DialogHeader>
                        <DialogTitle className="text-card-foreground">Complete Sale</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <div>
                            <Label className="text-card-foreground">Customer Name (Optional)</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                placeholder="Enter customer name"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                className="pl-10 bg-background border-input"
                              />
                            </div>
                          </div>
                          <div>
                            <Label className="text-card-foreground">Customer Phone (Optional)</Label>
                            <Input
                              placeholder="Enter phone number"
                              value={customerPhone}
                              onChange={(e) => setCustomerPhone(e.target.value)}
                              className="bg-background border-input"
                            />
                          </div>
                          <div>
                            <Label className="text-card-foreground">Discount (%)</Label>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              placeholder="0"
                              value={discount}
                              onChange={(e) => setDiscount(Number.parseFloat(e.target.value) || 0)}
                              className="bg-background border-input"
                            />
                          </div>
                          <div>
                            <Label className="text-card-foreground">Payment Method</Label>
                            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                              <SelectTrigger className="bg-background border-input">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-popover border-border">
                                <SelectItem value="cash">Cash</SelectItem>
                                <SelectItem value="card">Card</SelectItem>
                                <SelectItem value="digital">Digital Payment</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-card-foreground">Amount Paid</Label>
                            <div className="relative">
                              <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                type="number"
                                step="0.01"
                                placeholder={total.toFixed(2)}
                                value={amountPaid}
                                onChange={(e) => setAmountPaid(e.target.value)}
                                className="pl-10 bg-background border-input"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 p-3 bg-muted rounded-lg">
                          <div className="flex justify-between text-sm">
                            <span>Total Amount:</span>
                            <span className="font-medium">${total.toFixed(2)}</span>
                          </div>
                          {amountPaid && (
                            <>
                              <div className="flex justify-between text-sm">
                                <span>Amount Paid:</span>
                                <span className="font-medium">${Number.parseFloat(amountPaid).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Change:</span>
                                <span className={`font-medium ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
                                  ${change.toFixed(2)}
                                </span>
                              </div>
                            </>
                          )}
                        </div>

                        <Button
                          onClick={handleCheckout}
                          className="w-full"
                          disabled={!amountPaid || Number.parseFloat(amountPaid) < total}
                        >
                          Complete Sale
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
