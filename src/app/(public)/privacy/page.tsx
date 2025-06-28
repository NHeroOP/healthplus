import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, Database, UserCheck } from "lucide-react"

export default function PrivacyPage() {
  return (
    <>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: December 28, 2024</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                1. Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We collect information you provide directly to us, such as when you create an account, make a purchase,
                or contact us for support.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Personal Information</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Name, email address, phone number</li>
                    <li>Billing and shipping addresses</li>
                    <li>Date of birth and gender</li>
                    <li>Insurance information</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Health Information</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Prescription information</li>
                    <li>Medical conditions and allergies</li>
                    <li>Medication history</li>
                    <li>Healthcare provider information</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Technical Information</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Usage data and preferences</li>
                    <li>Cookies and similar technologies</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                2. How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We use the information we collect to provide, maintain, and improve our services:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Process and fulfill your medication orders</li>
                <li>Verify prescriptions with healthcare providers</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send important notifications about your orders and account</li>
                <li>Improve our website and services</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Detect and prevent fraud or unauthorized access</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                3. HIPAA Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-blue-800 dark:text-blue-200 font-medium mb-2">Protected Health Information (PHI)</p>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  As a healthcare provider, we are required to comply with the Health Insurance Portability and
                  Accountability Act (HIPAA). We maintain strict safeguards to protect your health information.
                </p>
              </div>

              <p className="text-muted-foreground">
                Your health information is protected and will only be used or disclosed as permitted by HIPAA
                regulations and as described in our Notice of Privacy Practices.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Information Sharing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">We may share your information in the following circumstances:</p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Healthcare Operations</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>With your healthcare providers for prescription verification</li>
                    <li>With insurance companies for claims processing</li>
                    <li>With pharmacy benefit managers as required</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Service Providers</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Payment processors for transaction processing</li>
                    <li>Shipping companies for order delivery</li>
                    <li>Technology providers who help us operate our services</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Legal Requirements</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>When required by law or regulation</li>
                    <li>To protect the rights and safety of our customers and staff</li>
                    <li>In response to valid legal requests</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                5. Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and employee training</li>
                <li>Secure data centers and backup systems</li>
                <li>Incident response and breach notification procedures</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Access and review your personal information</li>
                <li>Request corrections to inaccurate information</li>
                <li>Request deletion of your account and data</li>
                <li>Opt out of marketing communications</li>
                <li>Request a copy of your data</li>
                <li>File a complaint with regulatory authorities</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We use cookies and similar technologies to enhance your experience:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Essential cookies for website functionality</li>
                <li>Analytics cookies to understand usage patterns</li>
                <li>Preference cookies to remember your settings</li>
                <li>Marketing cookies for relevant advertisements</li>
              </ul>
              <p className="text-muted-foreground">You can control cookie settings through your browser preferences.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We retain your information for as long as necessary to provide our services and comply with legal
                obligations:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Account information: Until account deletion</li>
                <li>Prescription records: As required by state and federal law</li>
                <li>Transaction records: 7 years for tax and audit purposes</li>
                <li>Marketing data: Until you opt out or request deletion</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our services are not intended for children under 13. We do not knowingly collect personal information
                from children under 13. If we become aware that we have collected such information, we will take steps
                to delete it promptly.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We may update this privacy policy from time to time. We will notify you of any material changes by
                posting the new policy on our website and updating the "Last updated" date.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>11. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                If you have questions about this privacy policy or our privacy practices, please contact us:
              </p>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="font-medium">Privacy Officer</p>
                <p className="text-muted-foreground">HealthPlus Pharmacy</p>
                <p className="text-muted-foreground">123 Health Street</p>
                <p className="text-muted-foreground">Medical District, City, State 12345</p>
                <p className="text-muted-foreground">Phone: (555) 123-4567</p>
                <p className="text-muted-foreground">Email: privacy@healthpluspharmacy.com</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

    </>
  )
}
