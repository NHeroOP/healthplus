"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface Review {
  id: number
  productId: number
  userId: number
  userName: string
  rating: number
  title: string
  comment: string
  date: string
  helpful: number
  verified: boolean
  images?: string[]
  pros?: string[]
  cons?: string[]
}

interface ReviewContextType {
  reviews: Review[]
  addReview: (review: Omit<Review, "id" | "date" | "helpful">) => void
  getProductReviews: (productId: number) => Review[]
  markHelpful: (reviewId: number) => void
  getAverageRating: (productId: number) => number
  getRatingCounts: (productId: number) => number[]
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined)

// Mock reviews data
const initialReviews: Review[] = [
  {
    id: 1,
    productId: 1,
    userId: 1,
    userName: "Sarah M.",
    rating: 5,
    title: "Excellent pain relief",
    comment:
      "Very effective for headaches. Works quickly and no side effects for me. I've been using this for months and it's consistently reliable.",
    date: "2024-01-20",
    helpful: 12,
    verified: true,
    pros: ["Fast acting", "No side effects", "Good value"],
    cons: [],
  },
  {
    id: 2,
    productId: 1,
    userId: 2,
    userName: "Mike R.",
    rating: 4,
    title: "Good but prefer liquid form",
    comment:
      "Good pain relief, though I prefer the liquid form for faster action. Still effective for general aches and pains.",
    date: "2024-01-18",
    helpful: 8,
    verified: true,
    pros: ["Effective", "Affordable"],
    cons: ["Slow to dissolve"],
  },
  {
    id: 3,
    productId: 1,
    userId: 3,
    userName: "Emma L.",
    rating: 5,
    title: "Family favorite",
    comment:
      "Great for fever reduction in my family. Always keep it in our medicine cabinet. Safe for the whole family.",
    date: "2024-01-15",
    helpful: 15,
    verified: false,
    pros: ["Family safe", "Fever reduction", "Reliable"],
    cons: [],
  },
  {
    id: 4,
    productId: 2,
    userId: 4,
    userName: "John D.",
    rating: 4,
    title: "Effective cough relief",
    comment: "Helped with my persistent cough. Cherry flavor is pleasant and not too sweet. Works well for dry coughs.",
    date: "2024-01-22",
    helpful: 6,
    verified: true,
    pros: ["Pleasant taste", "Effective for dry cough"],
    cons: ["Slightly expensive"],
  },
  {
    id: 5,
    productId: 3,
    userId: 5,
    userName: "Lisa K.",
    rating: 5,
    title: "Great vitamin supplement",
    comment: "Noticed improvement in energy levels after taking this regularly. Easy to swallow and no aftertaste.",
    date: "2024-01-19",
    helpful: 9,
    verified: true,
    pros: ["Improved energy", "Easy to swallow", "No aftertaste"],
    cons: [],
  },
]

export function ReviewProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    // Load reviews from localStorage or use initial data
    const savedReviews = localStorage.getItem("healthplus-reviews")
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews))
    } else {
      setReviews(initialReviews)
    }
  }, [])

  useEffect(() => {
    // Save reviews to localStorage
    localStorage.setItem("healthplus-reviews", JSON.stringify(reviews))
  }, [reviews])

  const addReview = (reviewData: Omit<Review, "id" | "date" | "helpful">) => {
    const newReview: Review = {
      ...reviewData,
      id: Math.max(...reviews.map((r) => r.id), 0) + 1,
      date: new Date().toISOString().split("T")[0],
      helpful: 0,
    }
    setReviews([newReview, ...reviews])
  }

  const getProductReviews = (productId: number) => {
    return reviews.filter((review) => review.productId === productId)
  }

  const markHelpful = (reviewId: number) => {
    setReviews(reviews.map((review) => (review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review)))
  }

  const getAverageRating = (productId: number) => {
    const productReviews = getProductReviews(productId)
    if (productReviews.length === 0) return 0
    return productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length
  }

  const getRatingCounts = (productId: number) => {
    const productReviews = getProductReviews(productId)
    return [5, 4, 3, 2, 1].map((rating) => productReviews.filter((review) => review.rating === rating).length)
  }

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview,
        getProductReviews,
        markHelpful,
        getAverageRating,
        getRatingCounts,
      }}
    >
      {children}
    </ReviewContext.Provider>
  )
}

export function useReviews() {
  const context = useContext(ReviewContext)
  if (context === undefined) {
    throw new Error("useReviews must be used within a ReviewProvider")
  }
  return context
}
