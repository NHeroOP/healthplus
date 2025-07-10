"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Pill } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/store/Auth"

export default function HealthInfoPage() {
  const { user, updateProfile } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    allergies: [] as string[],
    medications: [] as string[],
  })
  const [newAllergy, setNewAllergy] = useState("")
  const [newMedication, setNewMedication] = useState("")

  useEffect(() => {
    if (user) {
      setFormData({
        allergies: [],
        medications: [],
      })
    }
  }, [user])

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

  const handleSave = () => {
    updateProfile(formData)
    setIsEditing(false)
  }

  if (!user) return null

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle className="text-lg sm:text-xl text-card-foreground flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Health Information
          </CardTitle>
          <p className="text-xs sm:text-sm text-muted-foreground">
            This information helps us provide better care and avoid potential complications.
          </p>
        </div>
        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          size="sm"
        >
          {isEditing ? "Save Changes" : "Edit"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Allergies */}
        <div>
          <Label className="text-card-foreground text-sm sm:text-base">Allergies</Label>
          <div className="mt-2 space-y-2">
            <div className="flex flex-wrap gap-2">
              {formData.allergies.map((allergy, index) => (
                <Badge
                  key={index}
                  variant="destructive"
                  className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs"
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
                <span className="text-muted-foreground text-xs sm:text-sm">No allergies recorded</span>
              )}
            </div>
            {isEditing && (
              <div className="flex gap-2">
                <Input
                  placeholder="Add allergy"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addAllergy()}
                  className="bg-background border-input text-sm"
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
          <Label className="text-card-foreground text-sm sm:text-base">Current Medications</Label>
          <div className="mt-2 space-y-2">
            <div className="flex flex-wrap gap-2">
              {formData.medications.map((medication, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs"
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
                <span className="text-muted-foreground text-xs sm:text-sm">No medications recorded</span>
              )}
            </div>
            {isEditing && (
              <div className="flex gap-2">
                <Input
                  placeholder="Add medication"
                  value={newMedication}
                  onChange={(e) => setNewMedication(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addMedication()}
                  className="bg-background border-input text-sm"
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
  )
}
