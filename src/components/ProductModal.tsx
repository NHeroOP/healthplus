"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
  inStock: boolean
  description: string
  usage: string
  ingredients: string
}

interface ProductModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border mx-4">
        <DialogHeader className="px-4 sm:px-6">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-card-foreground pr-8">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="px-4 sm:px-6">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            <div>
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 sm:h-64 rounded-lg object-cover"
              />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs sm:text-sm">
                  {product.category}
                </Badge>
                <Badge
                  variant={product.inStock ? "default" : "secondary"}
                  className={`text-xs sm:text-sm ${
                    product.inStock
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Reference price for in-store purchase</p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-2">Description</h3>
                <p className="text-sm sm:text-base text-muted-foreground">{product.description}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-2">Usage Instructions</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{product.usage}</p>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-2">Active Ingredients</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{product.ingredients}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border">
            <Link href={`/medicine/${product.id}`} className="flex-1">
              <Button className="w-full bg-primary hover:bg-primary/90">View Full Details</Button>
            </Link>
            <Button variant="outline" onClick={onClose} className="sm:w-auto bg-transparent">
              Close
            </Button>
          </div>

          <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200">
              <strong>Note:</strong> This is for reference only. Please visit our store to purchase this product. Our
              pharmacists are available to provide consultation and answer any questions.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
