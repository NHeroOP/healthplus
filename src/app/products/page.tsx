"use client"

import { useState, useMemo } from "react"
import { Search, Grid, List, Filter, ChevronLeft, ChevronRight, ShoppingCart, Plus, Minus, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import ProductModal from "@/components/ProductModal"
import ProductReviews from "@/components/ProductReviews"
import { useCart } from "@/contexts/CartContext"
import { useReviews } from "@/contexts/ReviewContext"

const products = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Tablets",
    price: 12.99,
    image: "https://placehold.co/200x200.png",
    inStock: true,
    brand: "HealthCare Plus",
    description: "Effective pain relief and fever reducer. Suitable for adults and children over 12 years.",
    usage: "Take 1-2 tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours.",
    ingredients: "Paracetamol 500mg",
  },
  {
    id: 2,
    name: "Cough Syrup",
    category: "Syrups",
    price: 8.5,
    image: "https://placehold.co/200x200.png",
    inStock: true,
    brand: "MediCare",
    description: "Soothing cough syrup for dry and productive coughs. Cherry flavored.",
    usage: "Adults: 10ml every 4 hours. Children 6-12 years: 5ml every 4 hours.",
    ingredients: "Dextromethorphan, Guaifenesin, Menthol",
  },
  {
    id: 3,
    name: "Vitamin D3",
    category: "Supplements",
    price: 15.75,
    image: "https://placehold.co/200x200.png",
    inStock: false,
    brand: "VitaLife",
    description: "Essential vitamin D3 supplement for bone health and immune support.",
    usage: "Take 1 capsule daily with food or as directed by healthcare provider.",
    ingredients: "Cholecalciferol (Vitamin D3) 1000 IU",
  },
  {
    id: 4,
    name: "Antiseptic Cream",
    category: "Topical",
    price: 6.25,
    image: "https://placehold.co/200x200.png",
    inStock: true,
    brand: "SkinCare Pro",
    description: "Antiseptic cream for minor cuts, scrapes, and burns. Prevents infection.",
    usage: "Clean affected area and apply thin layer 2-3 times daily.",
    ingredients: "Chlorhexidine gluconate, Cetrimide",
  },
  {
    id: 5,
    name: "Ibuprofen 400mg",
    category: "Tablets",
    price: 9.99,
    image: "https://placehold.co/200x200.png",
    inStock: true,
    brand: "PainRelief Co",
    description: "Anti-inflammatory pain reliever for headaches, muscle pain, and arthritis.",
    usage: "Take 1 tablet every 6-8 hours with food. Maximum 3 tablets per day.",
    ingredients: "Ibuprofen 400mg",
  },
  {
    id: 6,
    name: "Multivitamin",
    category: "Supplements",
    price: 22.5,
    image: "https://placehold.co/200x200.png",
    inStock: true,
    brand: "VitaLife",
    description: "Complete daily multivitamin with essential vitamins and minerals.",
    usage: "Take 1 tablet daily with breakfast.",
    ingredients: "Vitamins A, C, D, E, B-complex, Iron, Calcium, Zinc",
  },
  {
    id: 7,
    name: "Aspirin 325mg",
    category: "Tablets",
    price: 7.99,
    image: "https://placehold.co/200x200.png",
    inStock: true,
    brand: "CardioHealth",
    description: "Low-dose aspirin for heart health and pain relief.",
    usage: "Take 1 tablet daily with food or as directed by physician.",
    ingredients: "Acetylsalicylic acid 325mg",
  },
  {
    id: 8,
    name: "Allergy Relief",
    category: "Tablets",
    price: 14.25,
    image: "https://placehold.co/200x200.png",
    inStock: true,
    brand: "AllergyFree",
    description: "24-hour allergy relief for seasonal and indoor allergies.",
    usage: "Take 1 tablet once daily. Do not exceed recommended dose.",
    ingredients: "Loratadine 10mg",
  },
  {
    id: 9,
    name: "Throat Lozenges",
    category: "Lozenges",
    price: 5.99,
    image: "https://placehold.co/200x200.png",
    inStock: true,
    brand: "SootheCare",
    description: "Honey and menthol throat lozenges for sore throat relief.",
    usage: "Dissolve 1 lozenge slowly in mouth every 2 hours as needed.",
    ingredients: "Menthol, Honey, Eucalyptus oil",
  },
  {
    id: 10,
    name: "Calcium Tablets",
    category: "Supplements",
    price: 18.99,
    image: "https://placehold.co/200x200.png",
    inStock: false,
    brand: "BoneStrong",
    description: "Calcium supplement with Vitamin D for bone health.",
    usage: "Take 2 tablets daily with meals.",
    ingredients: "Calcium carbonate 600mg, Vitamin D3 400 IU",
  },
  {
    id: 11,
    name: "Eye Drops",
    category: "Drops",
    price: 11.5,
    image: "https://placehold.co/200x200.png",
    inStock: true,
    brand: "ClearVision",
    description: "Lubricating eye drops for dry eyes and irritation.",
    usage: "Instill 1-2 drops in affected eye(s) as needed.",
    ingredients: "Polyethylene glycol, Propylene glycol",
  },
  {
    id: 12,
    name: "Antacid Tablets",
    category: "Tablets",
    price: 8.75,
    image: "https://placehold.co/200x200.png",
    inStock: true,
    brand: "DigestEase",
    description: "Fast-acting antacid for heartburn and indigestion relief.",
    usage: "Chew 2-4 tablets as symptoms occur. Maximum 16 tablets per day.",
    ingredients: "Calcium carbonate 750mg",
  },
]

const categories = ["All", "Tablets", "Syrups", "Supplements", "Topical", "Lozenges", "Drops"]
const brands = ["All", ...Array.from(new Set(products.map((p) => p.brand)))]
const sortOptions = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
  { value: "rating-desc", label: "Highest Rated" },
]

const ITEMS_PER_PAGE = 6

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 50])
  const [stockFilter, setStockFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name-asc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})
  const [showReviews, setShowReviews] = useState<{ [key: number]: boolean }>({})

  const { addToCart } = useCart()
  const { getAverageRating } = useReviews()

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "in-stock" && product.inStock) ||
        (stockFilter === "out-of-stock" && !product.inStock)

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesStock
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "rating-desc":
          return getAverageRating(b.id) - getAverageRating(a.id)
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedCategories, selectedBrands, priceRange, stockFilter, sortBy, getAverageRating])

  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  const resetFilters = () => {
    setSearchTerm("")
    setSelectedCategories([])
    setSelectedBrands([])
    setPriceRange([0, 50])
    setStockFilter("all")
    setSortBy("name-asc")
    setCurrentPage(1)
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    }
  }

  const handleAddToCart = (product: any) => {
    const quantity = quantities[product.id] || 1
    addToCart(product, quantity)
    setQuantities({ ...quantities, [product.id]: 1 })
  }

  const updateQuantity = (productId: number, change: number) => {
    const current = quantities[productId] || 1
    const newQuantity = Math.max(1, current + change)
    setQuantities({ ...quantities, [productId]: newQuantity })
  }

  const toggleReviews = (productId: number) => {
    setShowReviews({ ...showReviews, [productId]: !showReviews[productId] })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Our Products</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Browse our comprehensive selection of medicines and healthcare products
            </p>
          </div>

          <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
            {/* Enhanced Filters Sidebar */}
            <div className={`xl:w-80 ${showFilters ? "block" : "hidden xl:block"}`}>
              <Card className="sticky top-20 border-border bg-card">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base sm:text-lg font-semibold text-card-foreground">Filters</h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetFilters}
                      className="text-xs sm:text-sm bg-transparent"
                    >
                      Reset
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {/* Search */}
                    <div>
                      <Label className="text-card-foreground">Search</Label>
                      <div className="relative mt-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Search products..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 bg-background border-input"
                        />
                      </div>
                    </div>

                    {/* Categories */}
                    <div>
                      <Label className="text-card-foreground">Categories</Label>
                      <div className="mt-2 space-y-2">
                        {categories
                          .filter((c) => c !== "All")
                          .map((category) => (
                            <div key={category} className="flex items-center space-x-2">
                              <Checkbox
                                id={`category-${category}`}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                              />
                              <Label
                                htmlFor={`category-${category}`}
                                className="text-sm text-muted-foreground cursor-pointer"
                              >
                                {category}
                              </Label>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Brands */}
                    <div>
                      <Label className="text-card-foreground">Brands</Label>
                      <div className="mt-2 space-y-2">
                        {brands
                          .filter((b) => b !== "All")
                          .map((brand) => (
                            <div key={brand} className="flex items-center space-x-2">
                              <Checkbox
                                id={`brand-${brand}`}
                                checked={selectedBrands.includes(brand)}
                                onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                              />
                              <Label
                                htmlFor={`brand-${brand}`}
                                className="text-sm text-muted-foreground cursor-pointer"
                              >
                                {brand}
                              </Label>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <Label className="text-card-foreground">
                        Price Range: ${priceRange[0]} - ${priceRange[1]}
                      </Label>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={50}
                        min={0}
                        step={1}
                        className="mt-2"
                      />
                    </div>

                    {/* Stock Filter */}
                    <div>
                      <Label className="text-card-foreground">Availability</Label>
                      <Select value={stockFilter} onValueChange={setStockFilter}>
                        <SelectTrigger className="mt-1 bg-background border-input">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border">
                          <SelectItem value="all">All Products</SelectItem>
                          <SelectItem value="in-stock">In Stock</SelectItem>
                          <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Controls */}
              <div className="mb-4 sm:mb-6 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      onClick={() => setShowFilters(!showFilters)}
                      className="xl:hidden w-full sm:w-auto"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {filteredAndSortedProducts.length} products found
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full sm:w-48 bg-background border-input">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        {sortOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div className="flex gap-2">
                      <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="flex-1 sm:flex-none"
                      >
                        <Grid className="h-4 w-4" />
                        <span className="ml-2 sm:hidden">Grid</span>
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="flex-1 sm:flex-none"
                      >
                        <List className="h-4 w-4" />
                        <span className="ml-2 sm:hidden">List</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Grid/List */}
              {paginatedProducts.length > 0 ? (
                <div className="space-y-6">
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
                        : "space-y-4"
                    }
                  >
                    {paginatedProducts.map((product) => {
                      const averageRating = getAverageRating(product.id)
                      return (
                        <div key={product.id} className="space-y-4">
                          <Card className="hover:shadow-lg transition-all duration-200 border-border bg-card">
                            <CardContent
                              className={viewMode === "grid" ? "p-3 sm:p-4" : "p-3 sm:p-4 flex gap-3 sm:gap-4"}
                            >
                              <div className={viewMode === "grid" ? "" : "flex-shrink-0"}>
                                <img
                                  src={product.image || "https://placehold.co/200x200.png"}
                                  alt={product.name}
                                  className={
                                    viewMode === "grid"
                                      ? "h-36 sm:h-48 w-full rounded-lg object-cover mb-3 sm:mb-4 cursor-pointer"
                                      : "h-20 sm:h-24 w-20 sm:w-24 rounded-lg object-cover cursor-pointer"
                                  }
                                  onClick={() => setSelectedProduct(product)}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                  <h3
                                    className="font-semibold text-card-foreground text-sm sm:text-base truncate pr-2 cursor-pointer hover:text-primary"
                                    onClick={() => setSelectedProduct(product)}
                                  >
                                    {product.name}
                                  </h3>
                                  <Badge
                                    variant={product.inStock ? "default" : "secondary"}
                                    className={`text-xs flex-shrink-0 ${
                                      product.inStock
                                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                    }`}
                                  >
                                    {product.inStock ? "In Stock" : "Out of Stock"}
                                  </Badge>
                                </div>
                                <p className="text-xs sm:text-sm text-muted-foreground mb-1">{product.category}</p>
                                <p className="text-xs text-muted-foreground mb-2">{product.brand}</p>

                                {/* Rating */}
                                {averageRating > 0 && (
                                  <div className="flex items-center space-x-1 mb-2">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`h-3 w-3 ${
                                            i < Math.floor(averageRating)
                                              ? "text-yellow-400 fill-current"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-xs text-muted-foreground">{averageRating.toFixed(1)}</span>
                                  </div>
                                )}

                                <p className="text-base sm:text-lg font-bold text-primary mb-3">
                                  ${product.price.toFixed(2)}
                                </p>

                                {/* Quantity and Add to Cart */}
                                {product.inStock && (
                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center border border-input rounded-md">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => updateQuantity(product.id, -1)}
                                        className="h-8 w-8 p-0"
                                      >
                                        <Minus className="h-3 w-3" />
                                      </Button>
                                      <span className="px-2 text-sm min-w-[2rem] text-center">
                                        {quantities[product.id] || 1}
                                      </span>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => updateQuantity(product.id, 1)}
                                        className="h-8 w-8 p-0"
                                      >
                                        <Plus className="h-3 w-3" />
                                      </Button>
                                    </div>
                                    <Button size="sm" onClick={() => handleAddToCart(product)} className="flex-1">
                                      <ShoppingCart className="h-3 w-3 mr-1" />
                                      Add to Cart
                                    </Button>
                                  </div>
                                )}

                                {/* Reviews Toggle */}
                                <div className="mt-3">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => toggleReviews(product.id)}
                                    className="w-full bg-transparent"
                                  >
                                    {showReviews[product.id] ? "Hide Reviews" : "Show Reviews"}
                                  </Button>
                                </div>

                                {viewMode === "list" && (
                                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 line-clamp-2">
                                    {product.description}
                                  </p>
                                )}
                              </div>
                            </CardContent>
                          </Card>

                          {/* Reviews Section */}
                          {showReviews[product.id] && (
                            <ProductReviews productId={product.id} productName={product.name} />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-base sm:text-lg">
                    No products found matching your criteria.
                  </p>
                  <Button variant="outline" onClick={resetFilters} className="mt-4 bg-transparent">
                    Clear Filters
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
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
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  )
}
