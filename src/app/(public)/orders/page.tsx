"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Package, Clock, CheckCircle, Truck, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { useAuth } from "@/contexts/AuthContext"

// Mock order data
const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-25",
    status: "delivered",
    total: 45.97,
    items: [
      { name: "Paracetamol 500mg", quantity: 2, price: 12.99 },
      { name: "Vitamin D3", quantity: 1, price: 15.75 },
      { name: "Antiseptic Cream", quantity: 1, price: 6.25 },
    ],
    shippingAddress: "123 Main St, Anytown, CA 12345",
    trackingNumber: "TRK123456789",
  },
  {
    id: "ORD-002",
    date: "2024-01-20",
    status: "processing",
    total: 28.48,
    items: [
      { name: "Cough Syrup", quantity: 1, price: 8.5 },
      { name: "Ibuprofen 400mg", quantity: 2, price: 9.99 },
    ],
    shippingAddress: "123 Main St, Anytown, CA 12345",
  },
  {
    id: "ORD-003",
    date: "2024-01-15",
    status: "shipped",
    total: 22.5,
    items: [{ name: "Multivitamin", quantity: 1, price: 22.5 }],
    shippingAddress: "123 Main St, Anytown, CA 12345",
    trackingNumber: "TRK987654321",
  },
]

export default function OrdersPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState(mockOrders)

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <>

      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Orders</h1>
            <p className="text-muted-foreground">Track and manage your HealthPlus orders</p>
          </div>

          {orders.length === 0 ? (
            <Card className="border-border bg-card text-center py-12">
              <CardContent>
                <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-card-foreground mb-2">No orders yet</h3>
                <p className="text-muted-foreground mb-6">You haven't placed any orders with us yet.</p>
                <Link href="/products">
                  <Button>Start Shopping</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="border-border bg-card">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle className="text-card-foreground">Order {order.id}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </Badge>
                        <span className="text-lg font-bold text-card-foreground">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Order Items */}
                    <div>
                      <h4 className="font-medium text-card-foreground mb-3">Items</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2">
                            <div>
                              <span className="text-card-foreground">{item.name}</span>
                              <span className="text-muted-foreground ml-2">× {item.quantity}</span>
                            </div>
                            <span className="text-card-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Shipping Address */}
                    <div>
                      <h4 className="font-medium text-card-foreground mb-2">Shipping Address</h4>
                      <p className="text-muted-foreground text-sm">{order.shippingAddress}</p>
                    </div>

                    {/* Tracking Information */}
                    {order.trackingNumber && (
                      <>
                        <Separator />
                        <div>
                          <h4 className="font-medium text-card-foreground mb-2">Tracking Information</h4>
                          <p className="text-muted-foreground text-sm">
                            Tracking Number: <span className="font-mono">{order.trackingNumber}</span>
                          </p>
                        </div>
                      </>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 pt-4">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      {order.status === "delivered" && (
                        <Button variant="outline" className="flex-1 bg-transparent">
                          Reorder Items
                        </Button>
                      )}
                      {order.trackingNumber && (
                        <Button variant="outline" className="flex-1 bg-transparent">
                          <Truck className="mr-2 h-4 w-4" />
                          Track Package
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

    </>
  )
}
