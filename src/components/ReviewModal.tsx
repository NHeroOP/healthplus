"use client";

import type React from "react";

import { useState } from "react";
import { Star, Plus, Minus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useReviews } from "../contexts/ReviewContext";
import { useAuthStore } from "@/store/Auth";

interface ReviewModalProps {
  productId: number;
  productName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewModal({
  productId,
  productName,
  isOpen,
  onClose,
}: ReviewModalProps) {
  const { user } = useAuthStore();
  const { addReview } = useReviews();
  const [formData, setFormData] = useState({
    rating: 5,
    title: "",
    comment: "",
    pros: [""],
    cons: [""],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);

    try {
      // Filter out empty pros and cons
      const filteredPros = formData.pros.filter((pro) => pro.trim() !== "");
      const filteredCons = formData.cons.filter((con) => con.trim() !== "");

      addReview({
        productId,
        userId: Number(user.id),
        userName: `${user.firstName} ${user.lastName.charAt(0)}.`,
        rating: formData.rating,
        title: formData.title,
        comment: formData.comment,
        verified: true,
        pros: filteredPros.length > 0 ? filteredPros : undefined,
        cons: filteredCons.length > 0 ? filteredCons : undefined,
      });

      // Reset form
      setFormData({
        rating: 5,
        title: "",
        comment: "",
        pros: [""],
        cons: [""],
      });

      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addProsCons = (type: "pros" | "cons") => {
    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], ""],
    }));
  };

  const removeProsCons = (type: "pros" | "cons", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const updateProsCons = (
    type: "pros" | "cons",
    index: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].map((item, i) => (i === index ? value : item)),
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Write a Review for {productName}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <Label className="text-foreground">Overall Rating</Label>
            <Select
              value={formData.rating.toString()}
              onValueChange={(value) =>
                setFormData({ ...formData, rating: Number.parseInt(value) })
              }
            >
              <SelectTrigger className="w-full bg-background border-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <SelectItem key={rating} value={rating.toString()}>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-yellow-400 fill-current"
                          />
                        ))}
                        {[...Array(5 - rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-gray-300" />
                        ))}
                      </div>
                      <span>
                        {rating} star{rating !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div>
            <Label className="text-foreground">Review Title</Label>
            <Input
              placeholder="Summarize your experience..."
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="bg-background border-input"
              required
            />
          </div>

          {/* Comment */}
          <div>
            <Label className="text-foreground">Your Review</Label>
            <Textarea
              placeholder="Share your detailed experience with this product..."
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
              className="bg-background border-input min-h-[120px]"
              required
            />
          </div>

          {/* Pros */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-foreground">Pros (Optional)</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addProsCons("pros")}
                className="bg-transparent"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Pro
              </Button>
            </div>
            <div className="space-y-2">
              {formData.pros.map((pro, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    placeholder="What did you like about this product?"
                    value={pro}
                    onChange={(e) =>
                      updateProsCons("pros", index, e.target.value)
                    }
                    className="bg-background border-input"
                  />
                  {formData.pros.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeProsCons("pros", index)}
                      className="bg-transparent"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Cons */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-foreground">Cons (Optional)</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addProsCons("cons")}
                className="bg-transparent"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Con
              </Button>
            </div>
            <div className="space-y-2">
              {formData.cons.map((con, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    placeholder="What could be improved?"
                    value={con}
                    onChange={(e) =>
                      updateProsCons("cons", index, e.target.value)
                    }
                    className="bg-background border-input"
                  />
                  {formData.cons.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeProsCons("cons", index)}
                      className="bg-transparent"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Photo Upload Placeholder */}
          <div>
            <Label className="text-foreground">Photos (Coming Soon)</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Photo upload feature coming soon
              </p>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            >
              Verified Purchase
            </Badge>
            <span className="text-sm text-green-700 dark:text-green-300">
              This review will be marked as a verified purchase
            </span>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                !formData.title.trim() ||
                !formData.comment.trim()
              }
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
