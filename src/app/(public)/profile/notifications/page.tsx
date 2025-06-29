"use client"

import { Bell } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function NotificationsPage() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl text-card-foreground flex items-center">
          <Bell className="mr-2 h-5 w-5" />
          Notification Preferences
        </CardTitle>
        <p className="text-xs sm:text-sm text-muted-foreground">Choose what notifications you'd like to receive</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Alert>
            <Bell className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Notification preferences will be available in a future update.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  )
}
// This page is a placeholder for future notification settings.
// Currently, it displays a message indicating that notification preferences will be available in a future update.