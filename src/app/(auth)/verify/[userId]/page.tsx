"use client"

import React, { useState } from 'react'
import "./verify.css"

import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { toast } from 'sonner'


export default function Verify() {
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)

  const { userId } = useParams()
  const router = useRouter()
  const handleSubmit = async(e: any) => {
    e.preventDefault()

    if (otp.length !== 6) {
      toast.error("Uh oh! Invalid OTP.", {
        description: "Please enter a valid 6-digit code to verify your email.",
        action: {
          label: "Try again",
          onClick: () => console.log("Try Again")
        },
      })
    }

    setLoading(true)
    try {
      const { data } = await axios.post(`/api/auth/verify`, { id: userId, otp })

      if (data.success) {
        router.push("/login")
        toast.success("Verified Successfully!", {
          description: data.message,
        })
      }
    } catch (err: any) {
      toast.error("Uh oh! Something went wrong.",{
        description: err.response.data.message,
        action: {
          label: "Try again",
          onClick: () => console.log("Try Again")
        },
      })
    }
    
    setOtp("")
    setLoading(false)
  }

  return (

    <section className="flex justify-center items-center h-screen bg-[#f1f1f1] dark:bg-[#212121]">
      <form onSubmit={handleSubmit} className={`${loading && "cursor-not-allowed"}`}>
        <Card className="mx-auto max-w-sm">
          <CardHeader className="mb-2" >
            <CardTitle className="text-xl">Verify Email</CardTitle>
            <CardDescription>
              Enter 6-Digit Code sent on your email to verify
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <InputOTP 
                maxLength={6} 
                placeholder="Enter your code" 
                value={otp} 
                onChange={(value) => setOtp(value)} 
                disabled={loading}
                required
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              <Button type="submit" disabled={loading} className="w-full flex gap-4">
                Verify Email {loading && <span className="loading loading-spinner loading-md" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form> 
    </section>
  )
}