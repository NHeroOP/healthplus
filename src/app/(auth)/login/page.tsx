"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { ArrowLeft, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react"

import { loginSchema } from "@/schemas/loginSchema"
import axios from "axios"
import Footer from "@/components/Footer"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/store/Auth"

import { signIn } from "next-auth/react"


export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const { setUser } = useAuthStore()

  const router = useRouter()




  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "john.doe@email.com",
      password: "password123",
    },
  })

  const onSubmit = async(data: z.infer<typeof loginSchema>) => {
    if (data.identifier === "" || data.password === "") { 
      return;
    }

    setIsLoading(true)

    try {
      const res = await signIn("credentials", {
        redirect: false,
        ...data
      })
      

      if (!res?.error) {
        router.push("/")
        toast.success("Login Success!", {
          description: "You have successfully logged in",
        })
      }
      else {
        setError(res?.error || "Login failed")
        toast.error("Uh oh! Something went wrong.", {
          description: "Please check your credentials and try again",
          action: {
            label: "Try again",
            onClick: () => console.log("Try Again")
          },
        })
      }
    } catch (err: any) {
      console.log(err.message);
      
      toast.error("Uh oh! Something went wrong.", {
        description: "Please check your credentials and try again",
        action: {
          label: "Try again",
          onClick: () => console.log("Try Again")
        },
      })
    }

    setIsLoading(false)
  }

  return (
    <>

      <div className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <Link href="/" className="inline-flex md:hidden items-center text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <Card className="border-border bg-card shadow-lg">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-card-foreground">Welcome Back</CardTitle>
              <p className="text-muted-foreground">Sign in to your HealthPlus account</p>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <FormField
                      name="identifier"
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
                                placeholder="Enter your password"
                                className="pl-10 bg-background border-input"
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

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </Form>

              <Button onClick={() => signIn("google")} variant="outline" className="w-full mt-4">
                SignIn with Google
              </Button>

              <div className="mt-6 text-center space-y-4">
                <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80">
                  Forgot your password?
                </Link>

                <div className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-primary hover:text-primary/80 font-medium">
                    Sign up here
                  </Link>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Demo Account:
                    <br />
                    Email: john.doe@email.com
                    <br />
                    Password: password123
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </>
  )
}