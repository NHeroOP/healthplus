import Link from "next/link"
import { Pill, MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-zinc-100 dark:bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-10 grid gap-8 sm:grid-cols-3 md:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-3 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                <Pill className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-black dark:text-white">HealthPlus</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              Your trusted local pharmacy, serving the community with quality healthcare products and personalized
              service since 2008.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-800 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-800 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/faq" className="dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-800 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/about" className="dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-800 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-800 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-800 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-800 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility"
                  className="dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-800 transition-colors"
                >
                  Accessibility
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-800 transition-colors"
                >
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-800 text-sm">
                  123 Health Street
                  <br />
                  Medical District
                  <br />
                  City, State 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-800 text-sm">(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-800 text-sm">info@healthplus.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-800 text-sm">
                  <div>Mon-Fri: 8AM-9PM</div>
                  <div>Sat: 9AM-8PM</div>
                  <div>Sun: 10AM-6PM</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-4 border-t border-black/50 dark:border-white/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex p-2 items-center justify-center rounded-full bg-blue-600">
                  <Pill className="h-6 w-6 text-white" />
                </div>
              </Link>
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} HealthPlus Pharmacy. All rights reserved.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-800 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-800 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-800 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
