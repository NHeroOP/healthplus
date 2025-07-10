"use client"

import { Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SecurityPage() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl text-card-foreground flex items-center">
          <Shield className="mr-2 h-5 w-5" />
          Security Settings
        </CardTitle>
        <p className="text-xs sm:text-sm text-muted-foreground">Manage your account security</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Security settings including password change and two-factor authentication will be available in a future
              update.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  )
}
// This page is a placeholder for future security settings.
// Currently, it displays a message indicating that security features like password change and two-factor authentication will