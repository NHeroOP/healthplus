"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Edit, Trash2, Plus, Package, Users, TrendingUp, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AdminSidebar from "@/components/AdminSidebar"

const products = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Tablets",
    price: 12.99,
    stock: 150,
    inStock: true,
  },
  {
    id: 2,
    name: "Cough Syrup",
    category: "Syrups",
    price: 8.5,
    stock: 75,
    inStock: true,
  },
  {
    id: 3,
    name: "Vitamin D3",
    category: "Supplements",
    price: 15.75,
    stock: 0,
    inStock: false,
  },
  {
    id: 4,
    name: "Antiseptic Cream",
    category: "Topical",
    price: 6.25,
    stock: 200,
    inStock: true,
  },
  {
    id: 5,
    name: "Ibuprofen 400mg",
    category: "Tablets",
    price: 9.99,
    stock: 120,
    inStock: true,
  },
]

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
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

  const totalProducts = products.length
  const inStockProducts = products.filter((p) => p.inStock).length
  const outOfStockProducts = totalProducts - inStockProducts
  const totalValue = products.reduce((sum, product) => sum + product.price * product.stock, 0)

  return (
    <>
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
          <div className="px-4 sm:px-6 py-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Manage your pharmacy inventory and operations
            </p>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Stats Cards */}
          <div className="grid gap-4 sm:gap-6 mb-6 sm:mb-8 grid-cols-2 lg:grid-cols-4">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium dark:text-gray-200">Total Products</CardTitle>
                <Package className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pb-2 sm:pb-4">
                <div className="text-lg sm:text-2xl font-bold dark:text-white">{totalProducts}</div>
                <p className="text-xs text-muted-foreground dark:text-gray-400">Active inventory items</p>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium dark:text-gray-200">In Stock</CardTitle>
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
              </CardHeader>
              <CardContent className="pb-2 sm:pb-4">
                <div className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400">
                  {inStockProducts}
                </div>
                <p className="text-xs text-muted-foreground dark:text-gray-400">Available products</p>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium dark:text-gray-200">Out of Stock</CardTitle>
                <Users className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
              </CardHeader>
              <CardContent className="pb-2 sm:pb-4">
                <div className="text-lg sm:text-2xl font-bold text-red-600 dark:text-red-400">{outOfStockProducts}</div>
                <p className="text-xs text-muted-foreground dark:text-gray-400">Need restocking</p>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium dark:text-gray-200">Inventory Value</CardTitle>
                <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pb-2 sm:pb-4">
                <div className="text-lg sm:text-2xl font-bold dark:text-white">${totalValue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground dark:text-gray-400">Total stock value</p>
              </CardContent>
            </Card>
          </div>

          {/* Products Table */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="px-4 sm:px-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <CardTitle className="text-lg sm:text-xl dark:text-white">Product Management</CardTitle>
                <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-0 sm:px-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="dark:border-gray-700">
                      <TableHead className="dark:text-gray-200 min-w-[150px]">Product Name</TableHead>
                      <TableHead className="dark:text-gray-200 hidden sm:table-cell">Category</TableHead>
                      <TableHead className="dark:text-gray-200">Price</TableHead>
                      <TableHead className="dark:text-gray-200 hidden md:table-cell">Stock</TableHead>
                      <TableHead className="dark:text-gray-200">Status</TableHead>
                      <TableHead className="dark:text-gray-200">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id} className="dark:border-gray-700">
                        <TableCell className="font-medium dark:text-white">
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">{product.category}</div>
                          </div>
                        </TableCell>
                        <TableCell className="dark:text-gray-300 hidden sm:table-cell">{product.category}</TableCell>
                        <TableCell className="dark:text-gray-300">${product.price.toFixed(2)}</TableCell>
                        <TableCell className="dark:text-gray-300 hidden md:table-cell">{product.stock}</TableCell>
                        <TableCell>
                          <Badge
                            variant={product.inStock ? "default" : "secondary"}
                            className={`text-xs ${product.inStock ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "dark:bg-gray-600 dark:text-gray-300"}`}
                          >
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1 sm:gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="dark:border-gray-600 dark:text-gray-200 bg-transparent"
                            >
                              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 dark:border-gray-600 dark:text-red-400 dark:hover:text-red-300 bg-transparent"
                            >
                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  )
}
