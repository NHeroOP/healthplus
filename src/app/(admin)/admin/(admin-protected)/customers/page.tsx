"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Search, ChevronLeft, ChevronRight, Mail, Phone, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdminSidebar from "@/components/AdminSidebar"

const customers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    address: "123 Main St, City, State 12345",
    joinDate: "2024-01-15",
    totalPurchases: 15,
    totalSpent: 245.5,
    status: "active",
    lastVisit: "2024-01-25",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(555) 234-5678",
    address: "456 Oak Ave, City, State 12345",
    joinDate: "2023-12-10",
    totalPurchases: 28,
    totalSpent: 420.75,
    status: "active",
    lastVisit: "2024-01-24",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "m.brown@email.com",
    phone: "(555) 345-6789",
    address: "789 Pine St, City, State 12345",
    joinDate: "2023-11-20",
    totalPurchases: 8,
    totalSpent: 125.25,
    status: "inactive",
    lastVisit: "2023-12-15",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "(555) 456-7890",
    address: "321 Elm St, City, State 12345",
    joinDate: "2024-01-05",
    totalPurchases: 22,
    totalSpent: 380.9,
    status: "active",
    lastVisit: "2024-01-26",
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "r.wilson@email.com",
    phone: "(555) 567-8901",
    address: "654 Maple Ave, City, State 12345",
    joinDate: "2023-10-30",
    totalPurchases: 35,
    totalSpent: 675.4,
    status: "vip",
    lastVisit: "2024-01-26",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    email: "lisa.a@email.com",
    phone: "(555) 678-9012",
    address: "987 Cedar St, City, State 12345",
    joinDate: "2023-09-15",
    totalPurchases: 12,
    totalSpent: 195.6,
    status: "active",
    lastVisit: "2024-01-20",
  },
]

const ITEMS_PER_PAGE = 10

export default function AdminCustomersPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn")
    if (adminLoggedIn === "true") {
      setIsAuthenticated(true)
    } else {
      router.push("/admin/login")
    }
  }, [router])

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
      const matchesStatus = statusFilter === "all" || customer.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE)
  const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => c.status === "active").length
  const vipCustomers = customers.filter((c) => c.status === "vip").length
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0)

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customer Management</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage customer information and relationships</p>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Stats Cards */}
          <div className="grid gap-4 sm:gap-6 mb-6 sm:mb-8 grid-cols-2 lg:grid-cols-4">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium dark:text-gray-200">Total Customers</CardTitle>
              </CardHeader>
              <CardContent className="pb-2 sm:pb-4">
                <div className="text-lg sm:text-2xl font-bold dark:text-white">{totalCustomers}</div>
                <p className="text-xs text-muted-foreground dark:text-gray-400">Registered customers</p>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium dark:text-gray-200">Active Customers</CardTitle>
              </CardHeader>
              <CardContent className="pb-2 sm:pb-4">
                <div className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400">
                  {activeCustomers}
                </div>
                <p className="text-xs text-muted-foreground dark:text-gray-400">Recently active</p>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium dark:text-gray-200">VIP Customers</CardTitle>
              </CardHeader>
              <CardContent className="pb-2 sm:pb-4">
                <div className="text-lg sm:text-2xl font-bold text-purple-600 dark:text-purple-400">{vipCustomers}</div>
                <p className="text-xs text-muted-foreground dark:text-gray-400">High-value customers</p>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium dark:text-gray-200">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent className="pb-2 sm:pb-4">
                <div className="text-lg sm:text-2xl font-bold dark:text-white">${totalRevenue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground dark:text-gray-400">From all customers</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="mb-4 sm:mb-6 flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-4 justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-full lg:max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                    <SelectItem value="all" className="dark:text-white">
                      All Customers
                    </SelectItem>
                    <SelectItem value="active" className="dark:text-white">
                      Active
                    </SelectItem>
                    <SelectItem value="inactive" className="dark:text-white">
                      Inactive
                    </SelectItem>
                    <SelectItem value="vip" className="dark:text-white">
                      VIP
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                Showing {paginatedCustomers.length} of {filteredCustomers.length} customers
              </div>
            </div>
          </div>

          {/* Customers Table */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="dark:border-gray-700">
                      <TableHead className="dark:text-gray-200 min-w-[200px]">Customer</TableHead>
                      <TableHead className="dark:text-gray-200 hidden lg:table-cell min-w-[250px]">Contact</TableHead>
                      <TableHead className="dark:text-gray-200 hidden sm:table-cell">Purchases</TableHead>
                      <TableHead className="dark:text-gray-200">Total Spent</TableHead>
                      <TableHead className="dark:text-gray-200">Status</TableHead>
                      <TableHead className="dark:text-gray-200 hidden md:table-cell">Last Visit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedCustomers.map((customer) => (
                      <TableRow key={customer.id} className="dark:border-gray-700">
                        <TableCell className="dark:text-white">
                          <div>
                            <div className="font-medium text-sm sm:text-base">{customer.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                              <Calendar className="h-3 w-3 mr-1" />
                              Joined {customer.joinDate}
                            </div>
                            <div className="lg:hidden mt-2 space-y-1">
                              <div className="flex items-center text-xs">
                                <Mail className="h-3 w-3 mr-1 text-gray-400" />
                                {customer.email}
                              </div>
                              <div className="flex items-center text-xs">
                                <Phone className="h-3 w-3 mr-1 text-gray-400" />
                                {customer.phone}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="dark:text-gray-300 hidden lg:table-cell">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Mail className="h-3 w-3 mr-2 text-gray-400" />
                              {customer.email}
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="h-3 w-3 mr-2 text-gray-400" />
                              {customer.phone}
                            </div>
                            <div className="flex items-start text-sm">
                              <MapPin className="h-3 w-3 mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
                              <span className="text-xs">{customer.address}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="dark:text-gray-300 hidden sm:table-cell text-sm">
                          {customer.totalPurchases}
                        </TableCell>
                        <TableCell className="dark:text-gray-300 text-sm font-medium">
                          ${customer.totalSpent.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              customer.status === "vip"
                                ? "default"
                                : customer.status === "active"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={`text-xs ${
                              customer.status === "vip"
                                ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                : customer.status === "active"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : "dark:border-gray-600 dark:text-gray-300"
                            }`}
                          >
                            {customer.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="dark:text-gray-300 hidden md:table-cell text-sm">
                          {customer.lastVisit}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Pagination - same responsive pattern as products page */}

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="dark:border-gray-600 dark:text-gray-200"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-10 dark:border-gray-600 dark:text-gray-200"
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="dark:border-gray-600 dark:text-gray-200"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </main>
      </div>
    </>
  )
}
