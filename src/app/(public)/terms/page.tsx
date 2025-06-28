import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, FileText, AlertTriangle } from "lucide-react"

export default function TermsPage() {
  return (
    <>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: December 28, 2024</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                1. Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                By accessing and using HealthPlus Pharmacy's website and services, you accept and agree to be bound by
                the terms and provision of this agreement. If you do not agree to abide by the above, please do not use
                this service.
              </p>
              <p className="text-muted-foreground">
                These terms apply to all visitors, users, and others who access or use our service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Description of Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                HealthPlus Pharmacy provides online pharmaceutical services including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Prescription medication dispensing</li>
                <li>Over-the-counter medication sales</li>
                <li>Health and wellness products</li>
                <li>Pharmaceutical consultation services</li>
                <li>Medication management tools</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. User Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                To access certain features of our service, you must create an account. You are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Providing accurate and complete information</li>
                <li>Updating your information when necessary</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                4. Medical Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <p className="text-amber-800 dark:text-amber-200 font-medium mb-2">Important Medical Information</p>
                <p className="text-amber-700 dark:text-amber-300 text-sm">
                  The information provided on this website is for educational purposes only and is not intended to
                  replace professional medical advice, diagnosis, or treatment. Always consult with a qualified
                  healthcare provider before making any decisions about your health or medications.
                </p>
              </div>
              <p className="text-muted-foreground">
                HealthPlus Pharmacy does not provide medical advice. Our pharmacists can provide information about
                medications, but this should not be considered a substitute for professional medical consultation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Prescription Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">For prescription medications:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>A valid prescription from a licensed healthcare provider is required</li>
                <li>Prescriptions must be current and not expired</li>
                <li>We reserve the right to verify prescriptions with the prescribing physician</li>
                <li>Controlled substances are subject to additional verification requirements</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Payment and Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Payment terms and conditions:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Payment is required at the time of order</li>
                <li>Prices are subject to change without notice</li>
                <li>Insurance claims will be processed according to your plan benefits</li>
                <li>Refunds are subject to our return policy</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Privacy and Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Your privacy is important to us. Our collection and use of personal information is governed by our
                Privacy Policy, which is incorporated into these terms by reference.
              </p>
              <p className="text-muted-foreground">
                We comply with HIPAA regulations and maintain strict confidentiality of your health information.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Prohibited Uses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">You may not use our service:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>
                  To violate any international, federal, provincial, or state regulations, rules, laws, or local
                  ordinances
                </li>
                <li>
                  To infringe upon or violate our intellectual property rights or the intellectual property rights of
                  others
                </li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                HealthPlus Pharmacy shall not be liable for any indirect, incidental, special, consequential, or
                punitive damages, including without limitation, loss of profits, data, use, goodwill, or other
                intangible losses, resulting from your use of the service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We reserve the right to modify or replace these terms at any time. If a revision is material, we will
                try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>11. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="font-medium">HealthPlus Pharmacy</p>
                <p className="text-muted-foreground">123 Health Street</p>
                <p className="text-muted-foreground">Medical District, City, State 12345</p>
                <p className="text-muted-foreground">Phone: (555) 123-4567</p>
                <p className="text-muted-foreground">Email: legal@healthpluspharmacy.com</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

    </>
  )
}
