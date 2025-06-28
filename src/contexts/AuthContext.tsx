"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  dateOfBirth?: string
  emergencyContact?: string
  allergies?: string[]
  medications?: string[]
  joinDate: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: any) => Promise<boolean>
  logout: () => void
  updateProfile: (userData: Partial<User>) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo
const mockUsers: (User & { password: string })[] = [
  {
    id: 1,
    email: "john.doe@email.com",
    password: "password123",
    firstName: "John",
    lastName: "Doe",
    phone: "(555) 123-4567",
    address: "123 Main St",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    dateOfBirth: "1990-01-15",
    emergencyContact: "(555) 987-6543",
    allergies: ["Penicillin", "Shellfish"],
    medications: ["Lisinopril 10mg"],
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    email: "jane.smith@email.com",
    password: "password123",
    firstName: "Jane",
    lastName: "Smith",
    phone: "(555) 234-5678",
    joinDate: "2024-02-01",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem("healthplus-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email === email && u.password === password)
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("healthplus-user", JSON.stringify(userWithoutPassword))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const register = async (userData: any): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === userData.email)
    if (existingUser) {
      setIsLoading(false)
      return false
    }

    const newUser: User = {
      id: mockUsers.length + 1,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      joinDate: new Date().toISOString().split("T")[0],
    }

    // Add to mock users (in real app, this would be API call)
    mockUsers.push({ ...newUser, password: userData.password })

    setUser(newUser)
    localStorage.setItem("healthplus-user", JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("healthplus-user")
  }

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("healthplus-user", JSON.stringify(updatedUser))

      // Update in mock users array
      const userIndex = mockUsers.findIndex((u) => u.id === user.id)
      if (userIndex !== -1) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData }
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
