import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accessibility, Eye, Ear, Hand, Brain } from "lucide-react"

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Accessibility className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Accessibility Statement</h1>
          <p className="text-muted-foreground">Our commitment to digital accessibility</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Our Commitment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                HealthPlus Pharmacy is committed to ensuring digital accessibility for people with disabilities. We are
                continually improving the user experience for everyone and applying the relevant accessibility
                standards.
              </p>
              <p className="text-muted-foreground">
                We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards to ensure
                our website is accessible to all users, including those with disabilities.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accessibility Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Visual Accessibility</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• High contrast color schemes</li>
                      <li>• Scalable text and images</li>
                      <li>• Alternative text for images</li>
                      <li>• Clear visual hierarchy</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Ear className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Audio Accessibility</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Screen reader compatibility</li>
                      <li>• Audio descriptions available</li>
                      <li>• No auto-playing audio</li>
                      <li>• Clear audio controls</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Hand className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Motor Accessibility</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Keyboard navigation support</li>
                      <li>• Large clickable areas</li>
                      <li>• No time-sensitive actions</li>
                      <li>• Voice control compatibility</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <Brain className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Cognitive Accessibility</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Simple, clear language</li>
                      <li>• Consistent navigation</li>
                      <li>• Error prevention and correction</li>
                      <li>• Multiple ways to find content</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technical Standards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Our website is designed to be compatible with:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Screen readers (JAWS, NVDA, VoiceOver, TalkBack)</li>
                <li>Voice recognition software (Dragon NaturallySpeaking)</li>
                <li>Keyboard-only navigation</li>
                <li>Browser zoom up to 200%</li>
                <li>High contrast mode</li>
                <li>Reduced motion preferences</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Keyboard Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Our website can be fully navigated using only a keyboard:</p>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="grid gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Tab</span>
                    <span className="text-muted-foreground">Move to next interactive element</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Shift + Tab</span>
                    <span className="text-muted-foreground">Move to previous interactive element</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Enter/Space</span>
                    <span className="text-muted-foreground">Activate buttons and links</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Arrow Keys</span>
                    <span className="text-muted-foreground">Navigate within menus and lists</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Escape</span>
                    <span className="text-muted-foreground">Close modals and menus</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Browser and Assistive Technology Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Our website is tested and optimized for:</p>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Browsers</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Chrome (latest 2 versions)</li>
                    <li>• Firefox (latest 2 versions)</li>
                    <li>• Safari (latest 2 versions)</li>
                    <li>• Edge (latest 2 versions)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Screen Readers</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• JAWS (Windows)</li>
                    <li>• NVDA (Windows)</li>
                    <li>• VoiceOver (macOS/iOS)</li>
                    <li>• TalkBack (Android)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Known Issues and Limitations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We are continuously working to improve accessibility. Currently known issues include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Some third-party embedded content may not be fully accessible</li>
                <li>PDF documents are being updated to meet accessibility standards</li>
                <li>Some complex data tables may require additional navigation instructions</li>
              </ul>
              <p className="text-muted-foreground">
                We are actively working to address these issues in future updates.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feedback and Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We welcome your feedback on the accessibility of our website. If you encounter any accessibility
                barriers or have suggestions for improvement, please contact us:
              </p>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="font-medium">Accessibility Coordinator</p>
                <p className="text-muted-foreground">HealthPlus Pharmacy</p>
                <p className="text-muted-foreground">Phone: (555) 123-4567</p>
                <p className="text-muted-foreground">Email: accessibility@healthpluspharmacy.com</p>
                <p className="text-muted-foreground">We aim to respond within 2 business days</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alternative Access Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                If you have difficulty accessing our website, we offer alternative ways to access our services:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Phone orders and consultations: (555) 123-4567</li>
                <li>In-person assistance at our pharmacy location</li>
                <li>Large print materials available upon request</li>
                <li>Braille materials available upon request</li>
                <li>Sign language interpretation services available</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ongoing Efforts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">We are committed to continuous improvement of our accessibility:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Regular accessibility audits and testing</li>
                <li>Staff training on accessibility best practices</li>
                <li>User testing with people with disabilities</li>
                <li>Staying current with accessibility standards and guidelines</li>
                <li>Incorporating accessibility into our development process</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
