"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Star, AlertTriangle, Info, Pill, ShoppingCart, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { useCart } from "@/contexts/CartContext"
import ProductFAQ from "@/components/ProductFAQ"
import ProductReviews from "@/components/ProductReviews"
import { useAuthStore } from "@/store/Auth"

// Extended product data with detailed medicine information
const medicineData = {
  1: {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Tablets",
    price: 12.99,
    image: "/medicine.jpg",
    inStock: true,
    brand: "HealthCare Plus",
    description: "Effective pain relief and fever reducer suitable for adults and children over 12 years.",
    usage: "Take 1-2 tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours.",
    ingredients: "Paracetamol 500mg",
    activeIngredient: "Paracetamol",
    strength: "500mg",
    dosageForm: "Tablet",
    packSize: "20 tablets",
    manufacturer: "HealthCare Plus Pharmaceuticals",
    prescriptionRequired: false,
    ageRestriction: "12+ years",
    storage: "Store below 25°C in a dry place. Keep out of reach of children.",
    expiryDate: "12/2025",
    batchNumber: "HC001-2024",
    indications: [
      "Mild to moderate pain relief",
      "Fever reduction",
      "Headaches",
      "Toothache",
      "Period pain",
      "Cold and flu symptoms",
    ],
    contraindications: ["Allergy to paracetamol", "Severe liver disease", "Chronic alcoholism"],
    sideEffects: [
      { severity: "Common", effects: ["Nausea", "Stomach upset"] },
      { severity: "Rare", effects: ["Skin rash", "Allergic reactions"] },
      { severity: "Very Rare", effects: ["Liver damage (with overdose)", "Blood disorders"] },
    ],
    interactions: [
      "Warfarin (blood thinner) - may increase bleeding risk",
      "Alcohol - increased risk of liver damage",
      "Other paracetamol-containing medicines - risk of overdose",
    ],
    warnings: [
      "Do not exceed the recommended dose",
      "Consult a doctor if symptoms persist for more than 3 days",
      "Not suitable for children under 12 years",
      "Avoid alcohol while taking this medicine",
    ],
    howItWorks:
      "Paracetamol works by blocking the production of prostaglandins, chemicals in the body that cause pain and fever. It acts on the central nervous system to reduce pain signals and affects the hypothalamus to reduce fever.",
    reviews: [
      {
        id: 1,
        userName: "Sarah M.",
        rating: 5,
        date: "2024-01-20",
        comment: "Very effective for headaches. Works quickly and no side effects for me.",
        helpful: 12,
        verified: true,
      },
      {
        id: 2,
        userName: "Mike R.",
        rating: 4,
        date: "2024-01-18",
        comment: "Good pain relief, though I prefer the liquid form for faster action.",
        helpful: 8,
        verified: true,
      },
      {
        id: 3,
        userName: "Emma L.",
        rating: 5,
        date: "2024-01-15",
        comment: "Great for fever reduction in my family. Always keep it in our medicine cabinet.",
        helpful: 15,
        verified: false,
      },
    ],
  },
  // Add more medicines as needed
}

export default function MedicinePage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const { user } = useAuthStore()
  const [quantity, setQuantity] = useState(1)
  const medicineId = Number.parseInt(params.id as string)
  const medicine = medicineData[medicineId as keyof typeof medicineData]

  if (!medicine) {
    return (
      <>
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Medicine Not Found</h1>
            <p className="text-muted-foreground mb-6">The medicine you're looking for doesn't exist.</p>
            <Link href="/products">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Button>
            </Link>
          </div>
        </div>
      </>
    )
  }

  const { reviews } = medicine
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => reviews.filter((review) => review.rating === rating).length)

  const handleAddToCart = () => {
    addToCart(medicine, quantity)
    setQuantity(1)
  }

  return (
    <>

      <div className="px-4 py-8 sm:px-6 lg:px-8 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl">
          <Link href="/products" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Product Image and Basic Info */}
            <div>
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <img
                    src={medicine.image || "/medicine.jpg"}
                    alt={medicine.name}
                    className="w-full h-96 object-cover rounded-lg mb-6"
                  />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-sm">
                        {medicine.category}
                      </Badge>
                      <Badge
                        variant={medicine.inStock ? "default" : "secondary"}
                        className={
                          medicine.inStock
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }
                      >
                        {medicine.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-card-foreground">{medicine.name}</h1>
                    <p className="text-muted-foreground">{medicine.brand}</p>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {averageRating.toFixed(1)} ({reviews.length} reviews)
                      </span>
                    </div>

                    <p className="text-3xl font-bold text-primary">${medicine.price.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Pack size: {medicine.packSize}</p>

                    {medicine.inStock && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <Label className="text-card-foreground">Quantity:</Label>
                          <div className="flex items-center border border-input rounded-md">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="px-4 text-sm min-w-[3rem] text-center">{quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setQuantity(quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <Button onClick={handleAddToCart} className="w-full" size="lg">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart - ${(medicine.price * quantity).toFixed(2)}
                        </Button>
                      </div>
                    )}

                    {!medicine.prescriptionRequired && (
                      <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                        <Info className="mr-2 h-4 w-4" />
                        No prescription required
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Information */}
            <div>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5 bg-neutral-300 dark:bg-muted">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="usage">Usage</TabsTrigger>
                  <TabsTrigger value="safety">Safety</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="text-card-foreground">Product Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{medicine.description}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-card-foreground">Active Ingredient:</span>
                          <p className="text-muted-foreground">{medicine.activeIngredient}</p>
                        </div>
                        <div>
                          <span className="font-medium text-card-foreground">Strength:</span>
                          <p className="text-muted-foreground">{medicine.strength}</p>
                        </div>
                        <div>
                          <span className="font-medium text-card-foreground">Dosage Form:</span>
                          <p className="text-muted-foreground">{medicine.dosageForm}</p>
                        </div>
                        <div>
                          <span className="font-medium text-card-foreground">Manufacturer:</span>
                          <p className="text-muted-foreground">{medicine.manufacturer}</p>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-medium text-card-foreground mb-2">How it works</h4>
                        <p className="text-muted-foreground text-sm">{medicine.howItWorks}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-card-foreground mb-2">Indications</h4>
                        <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                          {medicine.indications.map((indication, index) => (
                            <li key={index}>{indication}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="usage" className="space-y-6">
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="text-card-foreground flex items-center">
                        <Pill className="mr-2 h-5 w-5" />
                        Usage Instructions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Dosage</h4>
                        <p className="text-blue-700 dark:text-blue-300 text-sm">{medicine.usage}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-card-foreground mb-2">Storage Instructions</h4>
                        <p className="text-muted-foreground text-sm">{medicine.storage}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-card-foreground">Age Restriction:</span>
                          <p className="text-muted-foreground">{medicine.ageRestriction}</p>
                        </div>
                        <div>
                          <span className="font-medium text-card-foreground">Expiry Date:</span>
                          <p className="text-muted-foreground">{medicine.expiryDate}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="safety" className="space-y-6">
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="text-card-foreground flex items-center">
                        <AlertTriangle className="mr-2 h-5 w-5" />
                        Safety Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium text-card-foreground mb-3">Contraindications</h4>
                        <div className="space-y-2">
                          {medicine.contraindications.map((contraindication, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg"
                            >
                              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                              <span className="text-red-700 dark:text-red-300 text-sm">{contraindication}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-medium text-card-foreground mb-3">Side Effects</h4>
                        <div className="space-y-3">
                          {medicine.sideEffects.map((category, index) => (
                            <div key={index}>
                              <h5 className="text-sm font-medium text-card-foreground mb-2">{category.severity}</h5>
                              <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1 ml-4">
                                {category.effects.map((effect, effectIndex) => (
                                  <li key={effectIndex}>{effect}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-medium text-card-foreground mb-3">Drug Interactions</h4>
                        <div className="space-y-2">
                          {medicine.interactions.map((interaction, index) => (
                            <div key={index} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                              <span className="text-yellow-700 dark:text-yellow-300 text-sm">{interaction}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-medium text-card-foreground mb-3">Important Warnings</h4>
                        <div className="space-y-2">
                          {medicine.warnings.map((warning, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg"
                            >
                              <Info className="h-4 w-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                              <span className="text-orange-700 dark:text-orange-300 text-sm">{warning}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6">
                  <ProductReviews productId={medicine.id} productName={medicine.name} />
                </TabsContent>

                <TabsContent value="faq" className="space-y-6">
                  <ProductFAQ productId={medicine.id} productName={medicine.name} productCategory={medicine.category} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
  
    </>
  )
}
