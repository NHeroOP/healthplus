"use client"

import { useState, useEffect } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/store/Auth"

export default function PersonalInfoPage() {
  const { user, updateProfile } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    dateOfBirth: "",
    emergencyContact: "",
  })


  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        dateOfBirth: "",
        emergencyContact: "",
      })
    }
  }, [user])

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSave = () => {
    updateProfile(formData)
    setIsEditing(false)
  }

  if (!user) return null

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <CardTitle className="text-lg sm:text-xl text-card-foreground">Personal Information</CardTitle>
        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          size="sm"
        >
          {isEditing ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          ) : (
            "Edit"
          )}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-card-foreground text-sm">First Name</Label>
            <Input
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              disabled={!isEditing}
              className="bg-background border-input text-sm"
            />
          </div>
          <div>
            <Label className="text-card-foreground text-sm">Last Name</Label>
            <Input
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              disabled={!isEditing}
              className="bg-background border-input text-sm"
            />
          </div>
        </div>

        <div>
          <Label className="text-card-foreground text-sm">Email</Label>
          <Input
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            disabled={!isEditing}
            className="bg-background border-input text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-card-foreground text-sm">Phone</Label>
            <Input
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              disabled={!isEditing}
              className="bg-background border-input text-sm"
            />
          </div>
          <div>
            <Label className="text-card-foreground text-sm">Emergency Contact</Label>
            <Input
              value={formData.emergencyContact}
              onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
              disabled={!isEditing}
              placeholder="(555) 123-4567"
              className="bg-background border-input text-sm"
            />
          </div>
        </div>

        <div>
          <Label className="text-card-foreground text-sm">Address</Label>
          <Input
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            disabled={!isEditing}
            className="bg-background border-input text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-card-foreground text-sm">City</Label>
            <Input
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              disabled={!isEditing}
              className="bg-background border-input text-sm"
            />
          </div>
          <div>
            <Label className="text-card-foreground text-sm">State</Label>
            <Input
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              disabled={!isEditing}
              className="bg-background border-input text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> 
          <div>
            <Label className="text-card-foreground text-sm">ZIP Code</Label>
            <Input
              value={formData.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              disabled={!isEditing}
              className="bg-background border-input text-sm"
            />
          </div>

          <div>
            <Label className="text-card-foreground text-sm">Date of Birth</Label>
            <Input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              disabled={!isEditing}
              className="bg-background border-input text-sm"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
