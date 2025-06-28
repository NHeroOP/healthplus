"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import {
  Edit,
  Trash2,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  Upload,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminSidebar from "@/components/AdminSidebar"

const initialProducts = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Tablets",
    price: 12.99,
    stock: 150,
    inStock: true,
    brand: "HealthCare Plus",
    description: "Effective pain relief and fever reducer.",
    createdAt: "2024-01-15",
    sku: "HC001",
    supplier: "MedSupply Co",
    expiryDate: "2025-12-31",
    batchNumber: "B001",
  },
  {
    id: 2,
    name: "Cough Syrup",
    category: "Syrups",
    price: 8.5,
    stock: 75,
    inStock: true,
    brand: "MediCare",
    description: "Soothing cough syrup for dry and productive coughs.",
    createdAt: "2024-01-10",
    sku: "MC002",
    supplier: "PharmaCorp",
    expiryDate: "2025-08-15",
    batchNumber: "B002",
  },
  {
    id: 3,
    name: "Vitamin D3",
    category: "Supplements",
    price: 15.75,
    stock: 0,
    inStock: false,
    brand: "VitaLife",
    description: "Essential vitamin D3 supplement for bone health.",
    createdAt: "2024-01-05",
    sku: "VL003",
    supplier: "VitaSupplies",
    expiryDate: "2026-03-20",
    batchNumber: "B003",
  },
  {
    id: 4,
    name: "Antiseptic Cream",
    category: "Topical",
    price: 6.25,
    stock: 200,
    inStock: true,
    brand: "SkinCare Pro",
    description: "Antiseptic cream for minor cuts and scrapes.",
    createdAt: "2024-01-20",
    sku: "SC004",
    supplier: "DermaMed",
    expiryDate: "2025-11-10",
    batchNumber: "B004",
  },
  {
    id: 5,
    name: "Ibuprofen 400mg",
    category: "Tablets",
    price: 9.99,
    stock: 120,
    inStock: true,
    brand: "PainRelief Co",
    description: "Anti-inflammatory pain reliever.",
    createdAt: "2024-01-12",
    sku: "PR005",
    supplier: "MedSupply Co",
    expiryDate: "2025-09-25",
    batchNumber: "B005",
  },
]

const ITEMS_PER_PAGE = 10

export default function AdminProductsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [brandFilter, setBrandFilter] = useState("all")
  const [stockFilter, setStockFilter] = useState("all")
  const [supplierFilter, setSupplierFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    brand: "",
    description: "",
    sku: "",
    supplier: "",
    expiryDate: "",
    batchNumber: "",
  })
  const router = useRouter()

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn")
    if (adminLoggedIn === "true") {
      setIsAuthenticated(true)
    } else {
      router.push("/admin/login")
    }
  }, [router])

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
      const matchesBrand = brandFilter === "all" || product.brand === brandFilter
      const matchesSupplier = supplierFilter === "all" || product.supplier === supplierFilter
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "in-stock" && product.inStock) ||
        (stockFilter === "out-of-stock" && !product.inStock) ||
        (stockFilter === "low-stock" && product.stock < 50 && product.stock > 0)

      return matchesSearch && matchesCategory && matchesBrand && matchesSupplier && matchesStock
    })

    // Sort products
    filtered.sort((a, b) => {
      let aValue, bValue
      switch (sortBy) {
        case "name":
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case "price":
          aValue = a.price
          bValue = b.price
          break
        case "stock":
          aValue = a.stock
          bValue = b.stock
          break
        case "createdAt":
          aValue = new Date(a.createdAt).getTime()
          bValue = new Date(b.createdAt).getTime()
          break
        default:
          return 0
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return filtered
  }, [products, searchTerm, categoryFilter, brandFilter, supplierFilter, stockFilter, sortBy, sortOrder])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))]
  const brands = ["all", ...Array.from(new Set(products.map((p) => p.brand)))]
  const suppliers = ["all", ...Array.from(new Set(products.map((p) => p.supplier)))]

  const handleAddProduct = () => {
    const product = {
      id: Math.max(...products.map((p) => p.id)) + 1,
      ...newProduct,
      price: Number.parseFloat(newProduct.price),
      stock: Number.parseInt(newProduct.stock),
      inStock: Number.parseInt(newProduct.stock) > 0,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setProducts([...products, product])
    setNewProduct({
      name: "",
      category: "",
      price: "",
      stock: "",
      brand: "",
      description: "",
      sku: "",
      supplier: "",
      expiryDate: "",
      batchNumber: "",
    })
    setIsAddModalOpen(false)
  }

  const handleEditProduct = (product: any) => {
    setEditingProduct(product)
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      brand: product.brand,
      description: product.description,
      sku: product.sku,
      supplier: product.supplier,
      expiryDate: product.expiryDate,
      batchNumber: product.batchNumber,
    })
  }

  const handleUpdateProduct = () => {
    const updatedProducts = products.map((p) =>
      p.id === editingProduct.id
        ? {
            ...p,
            ...newProduct,
            price: Number.parseFloat(newProduct.price),
            stock: Number.parseInt(newProduct.stock),
            inStock: Number.parseInt(newProduct.stock) > 0,
          }
        : p,
    )
    setProducts(updatedProducts)
    setEditingProduct(null)
    setNewProduct({
      name: "",
      category: "",
      price: "",
      stock: "",
      brand: "",
      description: "",
      sku: "",
      supplier: "",
      expiryDate: "",
      batchNumber: "",
    })
  }

  const handleDeleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) {
      setProducts(products.filter((p) => !selectedProducts.includes(p.id)))
      setSelectedProducts([])
    }
  }

  const handleSelectProduct = (id: number) => {
    setSelectedProducts((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  const handleSelectAll = () => {
    if (selectedProducts.length === paginatedProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(paginatedProducts.map((p) => p.id))
    }
  }

  const exportToCSV = () => {
    const headers = ["Name", "SKU", "Category", "Brand", "Price", "Stock", "Supplier", "Expiry Date"]
    const csvContent = [
      headers.join(","),
      ...filteredProducts.map((product) =>
        [
          product.name,
          product.sku,
          product.category,
          product.brand,
          product.price,
          product.stock,
          product.supplier,
          product.expiryDate,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "products.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <header className="bg-card shadow-sm border-b border-border">
          <div className="px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-card-foreground">Product Management</h1>
                <p className="text-sm sm:text-base text-muted-foreground">Manage your pharmacy inventory</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={exportToCSV}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
                <Button variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Enhanced Filters */}
          <Card className="mb-6 border-border bg-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-card-foreground flex items-center">
                <Filter className="mr-2 h-5 w-5" />
                Advanced Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search products, SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background border-input"
                  />
                </div>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="bg-background border-input">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories
                      .filter((c) => c !== "all")
                      .map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <Select value={brandFilter} onValueChange={setBrandFilter}>
                  <SelectTrigger className="bg-background border-input">
                    <SelectValue placeholder="Brand" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="all">All Brands</SelectItem>
                    {brands
                      .filter((b) => b !== "all")
                      .map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <Select value={supplierFilter} onValueChange={setSupplierFilter}>
                  <SelectTrigger className="bg-background border-input">
                    <SelectValue placeholder="Supplier" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="all">All Suppliers</SelectItem>
                    {suppliers
                      .filter((s) => s !== "all")
                      .map((supplier) => (
                        <SelectItem key={supplier} value={supplier}>
                          {supplier}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <Select value={stockFilter} onValueChange={setStockFilter}>
                  <SelectTrigger className="bg-background border-input">
                    <SelectValue placeholder="Stock Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="all">All Products</SelectItem>
                    <SelectItem value="in-stock">In Stock</SelectItem>
                    <SelectItem value="low-stock">Low Stock</SelectItem>
                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={`${sortBy}-${sortOrder}`}
                  onValueChange={(value) => {
                    const [field, order] = value.split("-")
                    setSortBy(field)
                    setSortOrder(order as "asc" | "desc")
                  }}
                >
                  <SelectTrigger className="bg-background border-input">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    <SelectItem value="price-asc">Price (Low-High)</SelectItem>
                    <SelectItem value="price-desc">Price (High-Low)</SelectItem>
                    <SelectItem value="stock-asc">Stock (Low-High)</SelectItem>
                    <SelectItem value="stock-desc">Stock (High-Low)</SelectItem>
                    <SelectItem value="createdAt-desc">Newest First</SelectItem>
                    <SelectItem value="createdAt-asc">Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Showing {paginatedProducts.length} of {filteredProducts.length} products
              </div>
              {selectedProducts.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{selectedProducts.length} selected</span>
                  <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete Selected
                  </Button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "table" | "cards")}>
                <TabsList className="bg-muted">
                  <TabsTrigger value="table">Table</TabsTrigger>
                  <TabsTrigger value="cards">Cards</TabsTrigger>
                </TabsList>
              </Tabs>

              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="text-card-foreground">Add New Product</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-card-foreground">Product Name</Label>
                        <Input
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                          className="bg-background border-input"
                        />
                      </div>
                      <div>
                        <Label className="text-card-foreground">SKU</Label>
                        <Input
                          value={newProduct.sku}
                          onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                          className="bg-background border-input"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-card-foreground">Category</Label>
                        <Input
                          value={newProduct.category}
                          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                          className="bg-background border-input"
                        />
                      </div>
                      <div>
                        <Label className="text-card-foreground">Brand</Label>
                        <Input
                          value={newProduct.brand}
                          onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                          className="bg-background border-input"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-card-foreground">Price ($)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          className="bg-background border-input"
                        />
                      </div>
                      <div>
                        <Label className="text-card-foreground">Stock</Label>
                        <Input
                          type="number"
                          value={newProduct.stock}
                          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                          className="bg-background border-input"
                        />
                      </div>
                      <div>
                        <Label className="text-card-foreground">Supplier</Label>
                        <Input
                          value={newProduct.supplier}
                          onChange={(e) => setNewProduct({ ...newProduct, supplier: e.target.value })}
                          className="bg-background border-input"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-card-foreground">Expiry Date</Label>
                        <Input
                          type="date"
                          value={newProduct.expiryDate}
                          onChange={(e) => setNewProduct({ ...newProduct, expiryDate: e.target.value })}
                          className="bg-background border-input"
                        />
                      </div>
                      <div>
                        <Label className="text-card-foreground">Batch Number</Label>
                        <Input
                          value={newProduct.batchNumber}
                          onChange={(e) => setNewProduct({ ...newProduct, batchNumber: e.target.value })}
                          className="bg-background border-input"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-card-foreground">Description</Label>
                      <Textarea
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="bg-background border-input"
                      />
                    </div>
                    <Button onClick={handleAddProduct} className="w-full bg-primary hover:bg-primary/90">
                      Add Product
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Products Display */}
          {viewMode === "table" ? (
            <Card className="border-border bg-card">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border">
                        <TableHead className="w-12">
                          <Checkbox
                            checked={
                              selectedProducts.length === paginatedProducts.length && paginatedProducts.length > 0
                            }
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                        <TableHead className="text-card-foreground min-w-[200px]">Product</TableHead>
                        <TableHead className="text-card-foreground hidden sm:table-cell">SKU</TableHead>
                        <TableHead className="text-card-foreground hidden md:table-cell">Category</TableHead>
                        <TableHead className="text-card-foreground hidden lg:table-cell">Brand</TableHead>
                        <TableHead className="text-card-foreground">Price</TableHead>
                        <TableHead className="text-card-foreground">Stock</TableHead>
                        <TableHead className="text-card-foreground">Status</TableHead>
                        <TableHead className="text-card-foreground">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedProducts.map((product) => (
                        <TableRow key={product.id} className="border-border">
                          <TableCell>
                            <Checkbox
                              checked={selectedProducts.includes(product.id)}
                              onCheckedChange={() => handleSelectProduct(product.id)}
                            />
                          </TableCell>
                          <TableCell className="font-medium text-card-foreground">
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-xs text-muted-foreground sm:hidden">
                                {product.sku} • {product.category}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground hidden sm:table-cell text-sm">
                            {product.sku}
                          </TableCell>
                          <TableCell className="text-muted-foreground hidden md:table-cell text-sm">
                            {product.category}
                          </TableCell>
                          <TableCell className="text-muted-foreground hidden lg:table-cell text-sm">
                            {product.brand}
                          </TableCell>
                          <TableCell className="text-card-foreground text-sm">${product.price.toFixed(2)}</TableCell>
                          <TableCell className="text-card-foreground text-sm">
                            <span className={product.stock < 50 && product.stock > 0 ? "text-yellow-600" : ""}>
                              {product.stock}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={product.inStock ? "default" : "secondary"}
                              className={`text-xs ${
                                product.inStock
                                  ? product.stock < 50
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                    : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              }`}
                            >
                              {product.inStock ? (product.stock < 50 ? "Low Stock" : "In Stock") : "Out of Stock"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Dialog
                                open={editingProduct?.id === product.id}
                                onOpenChange={(open) => !open && setEditingProduct(null)}
                              >
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEditProduct(product)}
                                    className="p-1 sm:p-2"
                                  >
                                    <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
                                  <DialogHeader>
                                    <DialogTitle className="text-card-foreground">Edit Product</DialogTitle>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label className="text-card-foreground">Product Name</Label>
                                        <Input
                                          value={newProduct.name}
                                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                          className="bg-background border-input"
                                        />
                                      </div>
                                      <div>
                                        <Label className="text-card-foreground">SKU</Label>
                                        <Input
                                          value={newProduct.sku}
                                          onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                                          className="bg-background border-input"
                                        />
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label className="text-card-foreground">Category</Label>
                                        <Input
                                          value={newProduct.category}
                                          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                          className="bg-background border-input"
                                        />
                                      </div>
                                      <div>
                                        <Label className="text-card-foreground">Brand</Label>
                                        <Input
                                          value={newProduct.brand}
                                          onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                                          className="bg-background border-input"
                                        />
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                      <div>
                                        <Label className="text-card-foreground">Price ($)</Label>
                                        <Input
                                          type="number"
                                          step="0.01"
                                          value={newProduct.price}
                                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                          className="bg-background border-input"
                                        />
                                      </div>
                                      <div>
                                        <Label className="text-card-foreground">Stock</Label>
                                        <Input
                                          type="number"
                                          value={newProduct.stock}
                                          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                          className="bg-background border-input"
                                        />
                                      </div>
                                      <div>
                                        <Label className="text-card-foreground">Supplier</Label>
                                        <Input
                                          value={newProduct.supplier}
                                          onChange={(e) => setNewProduct({ ...newProduct, supplier: e.target.value })}
                                          className="bg-background border-input"
                                        />
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label className="text-card-foreground">Expiry Date</Label>
                                        <Input
                                          type="date"
                                          value={newProduct.expiryDate}
                                          onChange={(e) => setNewProduct({ ...newProduct, expiryDate: e.target.value })}
                                          className="bg-background border-input"
                                        />
                                      </div>
                                      <div>
                                        <Label className="text-card-foreground">Batch Number</Label>
                                        <Input
                                          value={newProduct.batchNumber}
                                          onChange={(e) =>
                                            setNewProduct({ ...newProduct, batchNumber: e.target.value })
                                          }
                                          className="bg-background border-input"
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <Label className="text-card-foreground">Description</Label>
                                      <Textarea
                                        value={newProduct.description}
                                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                        className="bg-background border-input"
                                      />
                                    </div>
                                    <Button
                                      onClick={handleUpdateProduct}
                                      className="w-full bg-primary hover:bg-primary/90"
                                    >
                                      Update Product
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-destructive hover:text-destructive/80 p-1 sm:p-2"
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
          ) : (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedProducts.map((product) => (
                <Card key={product.id} className="border-border bg-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={() => handleSelectProduct(product.id)}
                      />
                      <Badge
                        variant={product.inStock ? "default" : "secondary"}
                        className={`text-xs ${
                          product.inStock
                            ? product.stock < 50
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {product.inStock ? (product.stock < 50 ? "Low Stock" : "In Stock") : "Out of Stock"}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-card-foreground mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">SKU: {product.sku}</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {product.category} • {product.brand}
                    </p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                      <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)} className="flex-1">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline ml-1">Previous</span>
                </Button>

                <div className="flex gap-1 max-w-xs overflow-x-auto">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let page
                    if (totalPages <= 5) {
                      page = i + 1
                    } else if (currentPage <= 3) {
                      page = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      page = totalPages - 4 + i
                    } else {
                      page = currentPage - 2 + i
                    }

                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-8 sm:w-10 flex-shrink-0"
                      >
                        {page}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <span className="hidden sm:inline mr-1">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-xs sm:text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  )
}
