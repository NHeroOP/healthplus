"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Save, Bell, Shield, Globe, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import AdminSidebar from "@/components/AdminSidebar"

export default function AdminSettingsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [settings, setSettings] = useState({
    // Store Information
    storeName: "HealthPlus Pharmacy",
    storeAddress: "123 Health Street, Medical District, City, State 12345",
    storePhone: "(555) 123-4567",
    storeEmail: "info@healthpluspharmacy.com",
    storeDescription: "Your trusted local pharmacy serving the community since 2008.",

    // Business Hours
    mondayFriday: "8:00 AM - 9:00 PM",
    saturday: "9:00 AM - 8:00 PM",
    sunday: "10:00 AM - 6:00 PM",

    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    lowStockAlerts: true,
    orderNotifications: true,

    // System Settings
    currency: "USD",
    timezone: "America/New_York",
    language: "en",

    // Security
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
  })

  const router = useRouter()

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn")
    if (adminLoggedIn === "true") {
      setIsAuthenticated(true)
    } else {
      router.push("/admin/login")
    }
  }, [router])

  const handleSave = () => {
    // In a real app, this would save to a backend
    localStorage.setItem("pharmacySettings", JSON.stringify(settings))
    alert("Settings saved successfully!")
  }

  const handleInputChange = (field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
          <div className="px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
              <p className="text-gray-600 dark:text-gray-300">Manage your pharmacy settings and preferences</p>
            </div>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {/* Store Information */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="flex items-center dark:text-white text-lg sm:text-xl">
                  <Store className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Store Information
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="dark:text-gray-200 text-sm">Store Name</Label>
                    <Input
                      value={settings.storeName}
                      onChange={(e) => handleInputChange("storeName", e.target.value)}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-1"
                    />
                  </div>
                  <div>
                    <Label className="dark:text-gray-200 text-sm">Phone Number</Label>
                    <Input
                      value={settings.storePhone}
                      onChange={(e) => handleInputChange("storePhone", e.target.value)}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label className="dark:text-gray-200 text-sm">Email Address</Label>
                  <Input
                    type="email"
                    value={settings.storeEmail}
                    onChange={(e) => handleInputChange("storeEmail", e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-1"
                  />
                </div>

                <div>
                  <Label className="dark:text-gray-200 text-sm">Address</Label>
                  <Textarea
                    value={settings.storeAddress}
                    onChange={(e) => handleInputChange("storeAddress", e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-1"
                    rows={3}
                  />
                </div>

                <div>
                  <Label className="dark:text-gray-200 text-sm">Store Description</Label>
                  <Textarea
                    value={settings.storeDescription}
                    onChange={(e) => handleInputChange("storeDescription", e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-1"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="dark:text-white text-lg sm:text-xl">Business Hours</CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 space-y-4">
                <div>
                  <Label className="dark:text-gray-200 text-sm">Monday - Friday</Label>
                  <Input
                    value={settings.mondayFriday}
                    onChange={(e) => handleInputChange("mondayFriday", e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="dark:text-gray-200 text-sm">Saturday</Label>
                  <Input
                    value={settings.saturday}
                    onChange={(e) => handleInputChange("saturday", e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="dark:text-gray-200 text-sm">Sunday</Label>
                  <Input
                    value={settings.sunday}
                    onChange={(e) => handleInputChange("sunday", e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="flex items-center dark:text-white text-lg sm:text-xl">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="dark:text-gray-200 text-sm">Email Notifications</Label>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
                  />
                </div>

                <Separator className="dark:border-gray-700" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="dark:text-gray-200 text-sm">SMS Notifications</Label>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Receive notifications via SMS</p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => handleInputChange("smsNotifications", checked)}
                  />
                </div>

                <Separator className="dark:border-gray-700" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="dark:text-gray-200 text-sm">Low Stock Alerts</Label>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Get notified when products are running low
                    </p>
                  </div>
                  <Switch
                    checked={settings.lowStockAlerts}
                    onCheckedChange={(checked) => handleInputChange("lowStockAlerts", checked)}
                  />
                </div>

                <Separator className="dark:border-gray-700" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="dark:text-gray-200 text-sm">Order Notifications</Label>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Get notified about new orders</p>
                  </div>
                  <Switch
                    checked={settings.orderNotifications}
                    onCheckedChange={(checked) => handleInputChange("orderNotifications", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* System Settings */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="flex items-center dark:text-white text-lg sm:text-xl">
                  <Globe className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  System Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label className="dark:text-gray-200 text-sm">Currency</Label>
                    <Select value={settings.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                      <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                        <SelectItem value="USD" className="dark:text-white">
                          USD ($)
                        </SelectItem>
                        <SelectItem value="EUR" className="dark:text-white">
                          EUR (€)
                        </SelectItem>
                        <SelectItem value="GBP" className="dark:text-white">
                          GBP (£)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="dark:text-gray-200 text-sm">Timezone</Label>
                    <Select value={settings.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
                      <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                        <SelectItem value="America/New_York" className="dark:text-white">
                          Eastern Time
                        </SelectItem>
                        <SelectItem value="America/Chicago" className="dark:text-white">
                          Central Time
                        </SelectItem>
                        <SelectItem value="America/Denver" className="dark:text-white">
                          Mountain Time
                        </SelectItem>
                        <SelectItem value="America/Los_Angeles" className="dark:text-white">
                          Pacific Time
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="dark:text-gray-200 text-sm">Language</Label>
                    <Select value={settings.language} onValueChange={(value) => handleInputChange("language", value)}>
                      <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                        <SelectItem value="en" className="dark:text-white">
                          English
                        </SelectItem>
                        <SelectItem value="es" className="dark:text-white">
                          Spanish
                        </SelectItem>
                        <SelectItem value="fr" className="dark:text-white">
                          French
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="flex items-center dark:text-white text-lg sm:text-xl">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="dark:text-gray-200 text-sm">Two-Factor Authentication</Label>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => handleInputChange("twoFactorAuth", checked)}
                  />
                </div>

                <Separator className="dark:border-gray-700" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="dark:text-gray-200 text-sm">Session Timeout (minutes)</Label>
                    <Input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleInputChange("sessionTimeout", e.target.value)}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-1"
                    />
                  </div>
                  <div>
                    <Label className="dark:text-gray-200 text-sm">Password Expiry (days)</Label>
                    <Input
                      type="number"
                      value={settings.passwordExpiry}
                      onChange={(e) => handleInputChange("passwordExpiry", e.target.value)}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  )
}
