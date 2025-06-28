import Link from "next/link"
import { ArrowRight, Shield, Clock, Users, MapPin, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

export default function HomePage() {
  return (
    <>

      {/* Hero Section */}
      <section className="relative px-4 py-12 sm:py-16 lg:py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900">
                  Your Trusted
                  <span className="text-blue-600"> Healthcare</span>
                  <span className="text-green-600"> Partner</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  HealthPlus Pharmacy has been serving our community for over 15 years, providing quality medicines and
                  personalized healthcare solutions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                  <Link href="/products">
                    Explore Our Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent w-full sm:w-auto"
                >
                  <Link href="/about">Learn About Us</Link>
                </Button>
              </div>
            </div>

            <div className="relative order-first lg:order-last">
              <div className=" rounded-2xl shadow-2xl shadow-blue-300 h-[28rem]">
                <img
                  src="/medicine_img.jpg"
                  alt="HealthPlus Pharmacy Interior"
                  className="h-full w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-12 sm:py-16 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose HealthPlus?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're committed to providing exceptional healthcare services and products to our community.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Assured</h3>
                <p className="text-gray-600">
                  All our medicines are sourced from certified manufacturers and stored under optimal conditions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Always Available</h3>
                <p className="text-gray-600">
                  Open 7 days a week with extended hours to serve you when you need us most.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Care</h3>
                <p className="text-gray-600">
                  Our qualified pharmacists provide personalized consultation and healthcare advice.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="px-4 py-12 sm:py-16 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">Visit Our Store</h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
              We're conveniently located in the heart of the community
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-600">
                123 Health Street
                <br />
                Medical District
                <br />
                City, State 12345
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-600">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">
                (555) 123-4567
                <br />
                Emergency: (555) 123-4568
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">
                info@healthpluspharmacy.com
                <br />
                support@healthpluspharmacy.com
              </p>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
