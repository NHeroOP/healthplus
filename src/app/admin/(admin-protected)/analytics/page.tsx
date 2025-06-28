"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { TrendingUp, TrendingDown, DollarSign, Package, Users, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdminSidebar from "@/components/AdminSidebar"

const salesData = [
  { month: "Jan", sales: 12500, orders: 145, customers: 89 },
  { month: "Feb", sales: 15200, orders: 167, customers: 102 },
  { month: "Mar", sales: 18900, orders: 198, customers: 125 },
  { month: "Apr", sales: 16800, orders: 178, customers: 118 },
  { month: "May", sales: 21300, orders: 234, customers: 142 },
  { month: "Jun", sales: 19600, orders: 212, customers: 135 },
]

const topProducts = [
  { name: "Paracetamol 500mg", sales: 245, revenue: 3185.55 },
  { name: "Vitamin D3", sales: 189, revenue: 2976.75 },
  { name: "Cough Syrup", sales: 167, revenue: 1419.5 },
  { name: "Ibuprofen 400mg", sales: 156, revenue: 1558.44 },
  { name: "Multivitamin", sales: 134, revenue: 3015.0 },
]

export default function AdminAnalyticsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [timeRange, setTimeRange] = useState("6months")
  const router = useRouter()

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn")
    if (adminLoggedIn === "true") {
      setIsAuthenticated(true)
    } else {
      router.push("/admin/login")
    }
  }, [router])

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  const totalSales = salesData.reduce((sum, month) => sum + month.sales, 0)
  const totalOrders = salesData.reduce((sum, month) => sum + month.orders, 0)
  const totalCustomers = salesData.reduce((sum, month) => sum + month.customers, 0)
  const avgOrderValue = totalSales / totalOrders

  const currentMonth = salesData[salesData.length - 1]
  const previousMonth = salesData[salesData.length - 2]
  const salesGrowth = ((currentMonth.sales - previousMonth.sales) / previousMonth.sales) * 100
  const ordersGrowth = ((currentMonth.orders - previousMonth.orders) / previousMonth.orders) * 100

  return (
    <>
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
          <div className="px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-300">Track your pharmacy's performance and insights</p>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-48 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                <SelectItem value="1month" className="dark:text-white">
                  Last Month
                </SelectItem>
                <SelectItem value="3months" className="dark:text-white">
                  Last 3 Months
                </SelectItem>
                <SelectItem value="6months" className="dark:text-white">
                  Last 6 Months
                </SelectItem>
                <SelectItem value="1year" className="dark:text-white">
                  Last Year
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Key Metrics */}
          <div className="grid gap-4 sm:gap-6 mb-6 sm:mb-8 grid-cols-2 lg:grid-cols-4">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium dark:text-gray-200">Total Revenue</CardTitle>
                <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pb-2 sm:pb-4">
                <div className="text-lg sm:text-2xl font-bold dark:text-white">${totalSales.toLocaleString()}</div>
                <div className="flex items-center text-xs text-muted-foreground dark:text-gray-400">
                  {salesGrowth > 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                  )}
                  <span className={salesGrowth > 0 ? "text-green-500" : "text-red-500"}>
                    {Math.abs(salesGrowth).toFixed(1)}%
                  </span>
                  <span className="ml-1 hidden sm:inline">from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium dark:text-gray-200">Total Orders</CardTitle>
                <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pb-2 sm:pb-4">
                <div className="text-lg sm:text-2xl font-bold dark:text-white">{totalOrders.toLocaleString()}</div>
                <div className="flex items-center text-xs text-muted-foreground dark:text-gray-400">
                  {ordersGrowth > 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                  )}
                  <span className={ordersGrowth > 0 ? "text-green-500" : "text-red-500"}>
                    {Math.abs(ordersGrowth).toFixed(1)}%
                  </span>
                  <span className="ml-1 hidden sm:inline">from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium dark:text-gray-200">Avg Order Value</CardTitle>
                <Package className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pb-2 sm:pb-4">
                <div className="text-lg sm:text-2xl font-bold dark:text-white">${avgOrderValue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground dark:text-gray-400">Per transaction</p>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium dark:text-gray-200">New Customers</CardTitle>
                <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pb-2 sm:pb-4">
                <div className="text-lg sm:text-2xl font-bold dark:text-white">{totalCustomers}</div>
                <p className="text-xs text-muted-foreground dark:text-gray-400">This period</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            {/* Sales Chart */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl dark:text-white">Sales Overview</CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="space-y-3 sm:space-y-4">
                  {salesData.map((month, index) => (
                    <div key={month.month} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 sm:space-x-4 flex-1">
                        <div className="w-8 sm:w-12 text-xs sm:text-sm font-medium dark:text-gray-300">
                          {month.month}
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full transition-all duration-300"
                              style={{
                                width: `${(month.sales / Math.max(...salesData.map((d) => d.sales))) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm font-medium dark:text-white ml-2">
                        ${month.sales.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl dark:text-white">Top Selling Products</CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="space-y-3 sm:space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={product.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-300 flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium dark:text-white text-sm sm:text-base truncate">
                            {product.name}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            {product.sales} units sold
                          </div>
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm font-medium dark:text-white ml-2 flex-shrink-0">
                        ${product.revenue.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Analytics */}
          <div className="grid gap-4 sm:gap-6 mt-4 sm:mt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-base sm:text-lg dark:text-white">Category Performance</CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm dark:text-gray-300">Tablets</span>
                    <span className="text-xs sm:text-sm font-medium dark:text-white">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm dark:text-gray-300">Supplements</span>
                    <span className="text-xs sm:text-sm font-medium dark:text-white">28%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm dark:text-gray-300">Syrups</span>
                    <span className="text-xs sm:text-sm font-medium dark:text-white">15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm dark:text-gray-300">Topical</span>
                    <span className="text-xs sm:text-sm font-medium dark:text-white">12%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-base sm:text-lg dark:text-white">Customer Insights</CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm dark:text-gray-300">Repeat Customers</span>
                    <span className="text-xs sm:text-sm font-medium text-green-600 dark:text-green-400">68%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm dark:text-gray-300">New Customers</span>
                    <span className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">32%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm dark:text-gray-300">Avg Visits/Month</span>
                    <span className="text-xs sm:text-sm font-medium dark:text-white">2.4</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm dark:text-gray-300">Customer Satisfaction</span>
                    <span className="text-xs sm:text-sm font-medium text-green-600 dark:text-green-400">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700 sm:col-span-2 lg:col-span-1">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-base sm:text-lg dark:text-white">Inventory Status</CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm dark:text-gray-300">In Stock</span>
                    <span className="text-xs sm:text-sm font-medium text-green-600 dark:text-green-400">156 items</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm dark:text-gray-300">Low Stock</span>
                    <span className="text-xs sm:text-sm font-medium text-yellow-600 dark:text-yellow-400">
                      12 items
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm dark:text-gray-300">Out of Stock</span>
                    <span className="text-xs sm:text-sm font-medium text-red-600 dark:text-red-400">3 items</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm dark:text-gray-300">Total Products</span>
                    <span className="text-xs sm:text-sm font-medium dark:text-white">171 items</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  )
}
