import { z } from "zod";

export const usernameValidation = z
  .string()
  .max(16, "Username must not exceed 16 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters")

export const signupSchema = z.object({
  firstName: usernameValidation,
  lastName: usernameValidation,
  phone: z.string().min(10, {message: "Phone number must be atleast 10 digits long"}),
  email: z.string().email({message: "Invalid email"}),
  password: z.string().min(6, {message: "Password must be atleast 6 characters long"}),
  confirmPassword: z.string().min(6, { message: "Password must be atleast 6 characters long" }),
  agreeToTerms: z.boolean().refine(val => val, {
    message: "You must agree to the terms and conditions",
  }),
})