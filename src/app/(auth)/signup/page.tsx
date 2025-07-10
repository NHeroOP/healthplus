"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { signupSchema } from "@/schemas/signupSchema"
import axios from "axios"
import { toast } from "sonner"

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "NHero",
      lastName: "Noob",
      email: "fakenhero01@gmail.com",
      phone: "+17142846631",
      password: "test123",
      confirmPassword: "test123",
      agreeToTerms: true,
    },
  })

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    console.log("hello", data)
    if (data.firstName === "" || data.lastName === "" || data.email === "" || data.password === "") { 
      console.log("im here now")
      return;
    }

    setIsLoading(true)

    try {
      const {data: respData} = await axios.post("/api/auth/signup", data)

      if (!respData?.error && respData?.success) {
        toast.success("Register Success!", {
          description: "You have successfully registered, Redirecting pls wait..",
        })
        router.replace(`/verify/${respData.data.id}`)
      }
      else {
        setError(respData?.message || "An error occurred while registering")
        toast.error("Uh oh! Something went wrong.",{
          description: respData.message || "Please check your credentials and try again",
          action: {
            label: "Try again",
            onClick: () => console.log("Try Again")
          },
        })
      }
    } catch (err: any) {
      setError(err?.message || "An error occurred while registering")
      
      toast.error("Uh oh! Something went wrong.", {
        description: err?.message || "Please check your credentials and try again",
        action: {
          label: "Try again",
          onClick: () => console.log("Try Again")
        },
      })
    }
    finally {
      setShowPassword(false)
      setShowConfirmPassword(false)
      setError("")
    }

    setIsLoading(false)
  }


  return (
    <>

      <div className="px-4 py-8 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="mx-auto max-w-md">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <Card className="border-border bg-card shadow-lg">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-card-foreground">Create Account</CardTitle>
              <p className="text-muted-foreground">Join HealthPlus for a better healthcare experience</p>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FormField
                        name="firstName"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-card-foreground">First Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                  type="text"
                                  placeholder="First Name"
                                  className="pl-10 bg-background border-input"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <FormField
                        name="lastName"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-card-foreground">Last Name</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Last Name"
                                className="bg-background border-input"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <FormField
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-card-foreground">Email Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                type="email"
                                placeholder="Enter your email"
                                className="pl-10 bg-background border-input"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <FormField
                      name="phone"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-card-foreground">Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                type="text"
                                placeholder="(555) 123-4567"
                                className="pl-10 bg-background border-input"
                                autoComplete="off"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <FormField
                      name="password"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-card-foreground">Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                className="pl-10 pr-10 bg-background border-input"
                                autoComplete="off"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <FormField
                      name="confirmPassword"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-card-foreground">Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                className="pl-10 pr-10 bg-background border-input"
                                autoComplete="off"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                              >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-x-2">
                    <FormField
                      name="agreeToTerms"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) => (
                                checked ? field.onChange(true) : field.onChange(false)
                              )}
                            />
                          </FormControl>
                          <FormLabel className="text-sm text-muted-foreground">
                             I agree to the{" "}
                            <Link href="/terms" className="text-primary hover:text-primary/80">
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-primary hover:text-primary/80">
                              Privacy Policy
                            </Link>
                          </FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center">
                <div className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:text-primary/80 font-medium">
                    Sign in here
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

    </>
  )
}
