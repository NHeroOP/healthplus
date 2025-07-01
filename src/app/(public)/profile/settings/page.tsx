"use client";

import { useState } from "react";
import { Settings, Sun, Moon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/Auth";
import { useTheme } from "next-themes";
import axios from "axios";

export default function SettingsPage() {
  const { user } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const toggleTheme = () => {
    setTheme(() => theme === 'light' ? 'dark' : 'light')
  }

  const handleLogout = async() => {
    const { data } = await axios.get("/api/auth/logout")

    if (data.success) {
      router.replace("/login")
    }
  }

  const handleDeleteAccount = () => {
    // In a real app, this would call an API to delete the account
    console.log("Account deletion requested");
    setShowDeleteDialog(false);
    handleLogout();
    router.push("/");
  };

  if (!user) return null;

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl text-card-foreground flex items-center">
          <Settings className="mr-2 h-5 w-5" />
          Account Settings
        </CardTitle>
        <p className="text-xs sm:text-sm text-muted-foreground">
          General account preferences
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div>
              <h4 className="text-sm sm:text-base font-medium text-card-foreground">
                Theme
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Choose your preferred theme
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="bg-transparent w-full sm:w-auto"
            >
              {theme === "light" ? (
                <>
                  <Moon className="mr-2 h-4 w-4" />
                  Switch to Dark
                </>
              ) : (
                <>
                  <Sun className="mr-2 h-4 w-4" />
                  Switch to Light
                </>
              )}
            </Button>
          </div>

          <Separator />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div>
              <h4 className="text-sm sm:text-base font-medium text-card-foreground">
                Account Status
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Member since {user.joinDate ? new Date(user.joinDate).toLocaleDateString() : "N/A"}
              </p>
            </div>
            <Badge variant="secondary" className="text-xs w-fit">
              Active
            </Badge>
          </div>

          <Separator />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div>
              <h4 className="text-sm sm:text-base font-medium text-red-600">
                Danger Zone
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Permanently delete your account
              </p>
            </div>
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Delete Account</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to permanently delete your account?
                    This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteDialog(false)}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    className="w-full sm:w-auto"
                  >
                    Delete Account
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
