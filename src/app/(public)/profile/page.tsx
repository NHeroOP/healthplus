"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, User, Phone, MapPin, Calendar, AlertTriangle, Pill, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { useAuth } from "@/contexts/AuthContext"

export default function ProfilePage() {
  const { user, updateProfile, isLoading } = useAuth()
  const router = useRouter()
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
    allergies: [] as string[],
    medications: [] as string[],
  })
  const [newAllergy, setNewAllergy] = useState("")
  const [newMedication, setNewMedication] = useState("")

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      city: user.city || "",
      state: user.state || "",
      zipCode: user.zipCode || "",
      dateOfBirth: user.dateOfBirth || "",
      emergencyContact: user.emergencyContact || "",
      allergies: user.allergies || [],
      medications: user.medications || [],
    })
  }, [user, router])

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSave = () => {
    updateProfile(formData)
    setIsEditing(false)
  }

  const addAllergy = () => {
    if (newAllergy.trim() && !formData.allergies.includes(newAllergy.trim())) {
      setFormData({
        ...formData,
        allergies: [...formData.allergies, newAllergy.trim()],
      })
      setNewAllergy("")
    }
  }

  const removeAllergy = (allergy: string) => {
    setFormData({
      ...formData,
      allergies: formData.allergies.filter((a) => a !== allergy),
    })
  }

  const addMedication = () => {
    if (newMedication.trim() && !formData.medications.includes(newMedication.trim())) {
      setFormData({
        ...formData,
        medications: [...formData.medications, newMedication.trim()],
      })
      setNewMedication("")
    }
  }

  const removeMedication = (medication: string) => {
    setFormData({
      ...formData,
      medications: formData.medications.filter((m) => m !== medication),
    })
  }

  if (!user) {
    return null
  }

  return (
    <>

      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Profile</h1>
            <p className="text-muted-foreground">Manage your account information and health details</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Profile Overview */}
            <div className="lg:col-span-1">
              <Card className="border-border bg-card">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary">
                    <User className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-card-foreground">
                    {user.firstName} {user.lastName}
                  </CardTitle>
                  <p className="text-muted-foreground">{user.email}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Member since {new Date(user.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center text-sm">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{user.phone}</span>
                    </div>
                  )}
                  {user.address && (
                    <div className="flex items-start text-sm">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="text-muted-foreground">
                        {user.address}
                        {user.city && (
                          <>
                            <br />
                            {user.city}, {user.state} {user.zipCode}
                          </>
                        )}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card className="border-border bg-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-card-foreground">Personal Information</CardTitle>
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-card-foreground">First Name</Label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        disabled={!isEditing}
                        className="bg-background border-input"
                      />
                    </div>
                    <div>
                      <Label className="text-card-foreground">Last Name</Label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        disabled={!isEditing}
                        className="bg-background border-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-card-foreground">Email</Label>
                      <Input
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        disabled={!isEditing}
                        className="bg-background border-input"
                      />
                    </div>
                    <div>
                      <Label className="text-card-foreground">Phone</Label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        disabled={!isEditing}
                        className="bg-background border-input"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-card-foreground">Address</Label>
                    <Input
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      disabled={!isEditing}
                      className="bg-background border-input"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-card-foreground">City</Label>
                      <Input
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        disabled={!isEditing}
                        className="bg-background border-input"
                      />
                    </div>
                    <div>
                      <Label className="text-card-foreground">State</Label>
                      <Input
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        disabled={!isEditing}
                        className="bg-background border-input"
                      />
                    </div>
                    <div>
                      <Label className="text-card-foreground">ZIP Code</Label>
                      <Input
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        disabled={!isEditing}
                        className="bg-background border-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-card-foreground">Date of Birth</Label>
                      <Input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        disabled={!isEditing}
                        className="bg-background border-input"
                      />
                    </div>
                    <div>
                      <Label className="text-card-foreground">Emergency Contact</Label>
                      <Input
                        value={formData.emergencyContact}
                        onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                        disabled={!isEditing}
                        placeholder="(555) 123-4567"
                        className="bg-background border-input"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Health Information */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-card-foreground flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Health Information
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    This information helps us provide better care and avoid potential complications.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Allergies */}
                  <div>
                    <Label className="text-card-foreground">Allergies</Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {formData.allergies.map((allergy, index) => (
                          <Badge
                            key={index}
                            variant="destructive"
                            className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          >
                            {allergy}
                            {isEditing && (
                              <button onClick={() => removeAllergy(allergy)} className="ml-2 hover:text-red-600">
                                ×
                              </button>
                            )}
                          </Badge>
                        ))}
                        {formData.allergies.length === 0 && (
                          <span className="text-muted-foreground text-sm">No allergies recorded</span>
                        )}
                      </div>
                      {isEditing && (
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add allergy"
                            value={newAllergy}
                            onChange={(e) => setNewAllergy(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && addAllergy()}
                            className="bg-background border-input"
                          />
                          <Button onClick={addAllergy} size="sm">
                            Add
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Current Medications */}
                  <div>
                    <Label className="text-card-foreground">Current Medications</Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {formData.medications.map((medication, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          >
                            <Pill className="mr-1 h-3 w-3" />
                            {medication}
                            {isEditing && (
                              <button onClick={() => removeMedication(medication)} className="ml-2 hover:text-blue-600">
                                ×
                              </button>
                            )}
                          </Badge>
                        ))}
                        {formData.medications.length === 0 && (
                          <span className="text-muted-foreground text-sm">No medications recorded</span>
                        )}
                      </div>
                      {isEditing && (
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add medication"
                            value={newMedication}
                            onChange={(e) => setNewMedication(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && addMedication()}
                            className="bg-background border-input"
                          />
                          <Button onClick={addMedication} size="sm">
                            Add
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
