import { Users, Award, Clock, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

export default function AboutPage() {
  return (
    <>

      <div className="px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About HealthPlus Pharmacy
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Serving our community with dedication, care, and expertise for over 15 years
            </p>
          </div>

          {/* Story Section */}
          <div className="mb-8 sm:mb-12">
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Our Story</h2>
                <div className="space-y-3 sm:space-y-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  <p>
                    HealthPlus Pharmacy was founded in 2008 with a simple mission: to provide our community with
                    accessible, quality healthcare and personalized service. What started as a small neighborhood
                    pharmacy has grown into a trusted healthcare destination.
                  </p>
                  <p>
                    Our founder, Dr. Sarah Johnson, recognized the need for a pharmacy that truly cares about its
                    customers' wellbeing. With over 20 years of pharmaceutical experience, she established HealthPlus
                    with the vision of creating a place where healthcare meets compassion.
                  </p>
                  <p>
                    Today, we continue to uphold those founding principles while embracing modern healthcare solutions
                    and maintaining the personal touch that sets us apart.
                  </p>
                </div>
              </div>
              <div className="relative order-1 lg:order-2">
                <img
                  src="/images/team.jpg"
                  width={500}
                  height={400}
                  alt="HealthPlus Pharmacy Team"
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="mb-8 sm:mb-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Our Mission</h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              To provide exceptional pharmaceutical care and health services that improve the quality of life for our
              community members. We are committed to ensuring safe, effective, and affordable access to medications
              while delivering personalized care that exceeds expectations.
            </p>
          </div>

          {/* Values Section */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-6 sm:mb-8">
              Our Values
            </h2>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="text-center border-0 shadow-lg dark:bg-zinc-800 dark:border-gray-700">
                <CardContent className="p-4 sm:p-6">
                  <div className="mx-auto mb-3 sm:mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                    <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Compassion</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    We treat every customer with empathy and understanding
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg dark:bg-zinc-800 dark:border-gray-700">
                <CardContent className="p-4 sm:p-6">
                  <div className="mx-auto mb-3 sm:mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                    <Award className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Excellence</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    We maintain the highest standards in everything we do
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg dark:bg-zinc-800 dark:border-gray-700">
                <CardContent className="p-4 sm:p-6">
                  <div className="mx-auto mb-3 sm:mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                    <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Community</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    We are deeply committed to serving our local community
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg dark:bg-zinc-800 dark:border-gray-700">
                <CardContent className="p-4 sm:p-6">
                  <div className="mx-auto mb-3 sm:mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                    <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Reliability</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    You can count on us to be there when you need us most
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center mb-6 sm:mb-8">
              Get In Touch
            </h2>
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              <div className="md:border-r-2 pr-6 border-black/50 dark:border-white/20">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  Store Hours
                </h3>
                <div className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>8:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between font-semibold text-red-600 dark:text-red-400">
                    <span>Emergency Hours:</span>
                    <span>24/7 On-Call</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  Contact Details
                </h3>
                <div className="space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  <div>
                    <strong>Address:</strong>
                    <br />
                    123 Health Street
                    <br />
                    Medical District
                    <br />
                    City, State 12345
                  </div>
                  <div>
                    <strong>Phone:</strong> (555) 123-4567
                  </div>
                  <div>
                    <strong>Emergency:</strong> (555) 123-4568
                  </div>
                  <div>
                    <strong>Email:</strong> info@healthpluspharmacy.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
