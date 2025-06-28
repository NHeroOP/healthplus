"use client";

import { useState } from "react";
import { Star, ThumbsUp, CheckCircle, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "../contexts/AuthContext";
import { useReviews } from "../contexts/ReviewContext";
import ReviewModal from "./ReviewModal";

interface ProductReviewsProps {
  productId: number;
  productName: string;
}

export default function ProductReviews({
  productId,
  productName,
}: ProductReviewsProps) {
  const { user } = useAuth();
  const { getProductReviews, markHelpful, getAverageRating, getRatingCounts } =
    useReviews();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [showAllReviews, setShowAllReviews] = useState(false);

  const reviews = getProductReviews(productId);
  const averageRating = getAverageRating(productId);
  const ratingCounts = getRatingCounts(productId);

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      case "helpful":
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const displayedReviews = showAllReviews
    ? sortedReviews
    : sortedReviews.slice(0, 3);

  const handleWriteReview = () => {
    if (!user) {
      // Redirect to login or show login modal
      window.location.href = "/login";
      return;
    }
    setIsReviewModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-card-foreground">
                Customer Reviews
              </CardTitle>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(averageRating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium text-card-foreground">
                  {averageRating > 0
                    ? averageRating.toFixed(1)
                    : "No ratings yet"}
                </span>
                <span className="text-muted-foreground">
                  ({reviews.length} reviews)
                </span>
              </div>
            </div>
            <Button
              onClick={handleWriteReview}
              className="bg-primary hover:bg-primary/90"
            >
              Write a Review
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {reviews.length > 0 && (
            <>
              {/* Rating Breakdown */}
              <div className="space-y-2">
                <h4 className="font-medium text-card-foreground">
                  Rating Breakdown
                </h4>
                {[5, 4, 3, 2, 1].map((rating, index) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground w-8">
                      {rating}
                    </span>
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${
                            reviews.length > 0
                              ? (ratingCounts[index] / reviews.length) * 100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">
                      {ratingCounts[index]}
                    </span>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Sort Options */}
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-card-foreground">
                  Reviews ({reviews.length})
                </h4>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-background border-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="highest">Highest Rated</SelectItem>
                    <SelectItem value="lowest">Lowest Rated</SelectItem>
                    <SelectItem value="helpful">Most Helpful</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {displayedReviews.map((review) => (
                  <div
                    key={review.id}
                    className="space-y-3 p-4 border border-border rounded-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {review.userName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-card-foreground">
                              {review.userName}
                            </span>
                            {review.verified && (
                              <Badge
                                variant="secondary"
                                className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-card-foreground mb-2">
                        {review.title}
                      </h5>
                      <p className="text-muted-foreground text-sm">
                        {review.comment}
                      </p>
                    </div>

                    {/* Pros and Cons */}
                    {(review.pros && review.pros.length > 0) ||
                    (review.cons && review.cons.length > 0) ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {review.pros && review.pros.length > 0 && (
                          <div>
                            <h6 className="text-sm font-medium text-green-700 dark:text-green-300 mb-2 flex items-center">
                              <Plus className="h-3 w-3 mr-1" />
                              Pros
                            </h6>
                            <div className="space-y-1">
                              {review.pros.map((pro, index) => (
                                <div
                                  key={index}
                                  className="text-sm text-muted-foreground flex items-start"
                                >
                                  <span className="text-green-600 mr-2">•</span>
                                  {pro}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {review.cons && review.cons.length > 0 && (
                          <div>
                            <h6 className="text-sm font-medium text-red-700 dark:text-red-300 mb-2 flex items-center">
                              <Minus className="h-3 w-3 mr-1" />
                              Cons
                            </h6>
                            <div className="space-y-1">
                              {review.cons.map((con, index) => (
                                <div
                                  key={index}
                                  className="text-sm text-muted-foreground flex items-start"
                                >
                                  <span className="text-red-600 mr-2">•</span>
                                  {con}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : null}

                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => markHelpful(review.id)}
                        className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>Helpful ({review.helpful})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Show More/Less Button */}
              {reviews.length > 3 && (
                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="bg-transparent"
                  >
                    {showAllReviews
                      ? "Show Less"
                      : `Show All ${reviews.length} Reviews`}
                  </Button>
                </div>
              )}
            </>
          )}

          {reviews.length === 0 && (
            <div className="text-center py-8">
              <Star className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h4 className="font-medium text-card-foreground mb-2">
                No reviews yet
              </h4>
              <p className="text-muted-foreground mb-4">
                Be the first to review this product!
              </p>
              <Button
                onClick={handleWriteReview}
                className="bg-primary hover:bg-primary/90"
              >
                Write the First Review
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <ReviewModal
        productId={productId}
        productName={productName}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </div>
  );
}
