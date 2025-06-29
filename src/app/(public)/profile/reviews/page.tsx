"use client"

import { useState } from "react"
import Link from "next/link"
import { MessageSquare, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock reviews data
const mockReviews = [
  {
    id: "REV-001",
    productId: "1",
    productName: "Paracetamol 500mg",
    rating: 5,
    comment: "Very effective for headaches. Quick relief and no side effects.",
    date: "2024-01-20",
    helpful: 12,
  },
  {
    id: "REV-002",
    productId: "3",
    productName: "Vitamin D3",
    rating: 4,
    comment: "Good quality vitamin supplement. Easy to swallow tablets.",
    date: "2024-01-15",
    helpful: 8,
  },
  {
    id: "REV-003",
    productId: "5",
    productName: "Antiseptic Cream",
    rating: 5,
    comment: "Excellent for minor cuts and wounds. Heals quickly.",
    date: "2024-01-10",
    helpful: 15,
  },
]

export default function ReviewsPage() {
  const [reviews] = useState(mockReviews)

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-foreground">My Reviews</h2>
        <p className="text-sm text-muted-foreground">Reviews you've written for products</p>
      </div>

      {reviews.length === 0 ? (
        <Card className="border-border bg-card text-center py-8 sm:py-12">
          <CardContent>
            <MessageSquare className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-card-foreground mb-2">No reviews yet</h3>
            <p className="text-sm text-muted-foreground mb-4 sm:mb-6">You haven't written any reviews yet.</p>
            <Link href="/products">
              <Button size="sm">Shop Products</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="border-border bg-card">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/medicine/${review.productId}`}
                      className="text-base sm:text-lg font-medium text-card-foreground hover:text-primary truncate block"
                    >
                      {review.productName}
                    </Link>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 sm:h-4 sm:w-4 ${
                            i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-xs sm:text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {review.helpful} helpful
                  </Badge>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">{review.comment}</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" size="sm" className="bg-transparent text-xs sm:text-sm">
                    Edit Review
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent text-xs sm:text-sm text-red-600 hover:text-red-700"
                  >
                    Delete Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
