"use client"

import { CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentMethodsPage() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl text-card-foreground flex items-center">
          <CreditCard className="mr-2 h-5 w-5" />
          Payment Methods
        </CardTitle>
        <p className="text-xs sm:text-sm text-muted-foreground">Manage your saved payment methods</p>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 sm:py-12">
          <CreditCard className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-card-foreground mb-2">No payment methods</h3>
          <p className="text-sm text-muted-foreground mb-4 sm:mb-6">Add a payment method to make checkout faster.</p>
          <Button size="sm">Add Payment Method</Button>
        </div>
      </CardContent>
    </Card>
  )
}
// This page currently displays a message indicating that no payment methods are saved.
// In a future update, it will allow users to add and manage their payment methods.