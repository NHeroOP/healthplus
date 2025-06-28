"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Bot, AlertTriangle, Pill, Info, Clock, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface FAQ {
  id: number
  question: string
  answer: string
  category: string
  icon: any
}

interface ProductFAQProps {
  productId: number
  productName: string
  productCategory: string
}

// AI-generated FAQ data based on product type
const generateProductFAQs = (productName: string, productCategory: string): FAQ[] => {
  const baseQuestions = [
    {
      id: 1,
      question: `How should I take ${productName}?`,
      answer: `Take ${productName} exactly as directed on the package or as prescribed by your healthcare provider. Follow the recommended dosage and timing instructions. If you have any questions about proper usage, consult with a pharmacist or your doctor.`,
      category: "Usage",
      icon: Pill,
    },
    {
      id: 2,
      question: `What are the side effects of ${productName}?`,
      answer: `Common side effects may vary depending on the individual. Most people tolerate ${productName} well when used as directed. If you experience any unusual symptoms or side effects, discontinue use and consult your healthcare provider immediately.`,
      category: "Safety",
      icon: Shield,
    },
    {
      id: 3,
      question: `How long does it take for ${productName} to work?`,
      answer: `The onset of action for ${productName} can vary depending on the individual and the condition being treated. Some people may notice effects within 30 minutes to 2 hours, while others may need to take it regularly for several days to see full benefits.`,
      category: "Timing",
      icon: Clock,
    },
    {
      id: 4,
      question: `Can I take ${productName} with other medications?`,
      answer: `Before taking ${productName} with other medications, supplements, or herbal products, consult with your pharmacist or healthcare provider. Some combinations may interact and affect how the medications work or increase the risk of side effects.`,
      category: "Interactions",
      icon: Info,
    },
  ]

  // Category-specific questions
  const categorySpecificQuestions: { [key: string]: FAQ[] } = {
    Tablets: [
      {
        id: 5,
        question: `Should I take ${productName} with food?`,
        answer: `${productName} can typically be taken with or without food. However, taking it with food may help reduce stomach upset if you experience any digestive discomfort. Check the package instructions for specific recommendations.`,
        category: "Usage",
        icon: Pill,
      },
      {
        id: 6,
        question: `What if I miss a dose of ${productName}?`,
        answer: `If you miss a dose of ${productName}, take it as soon as you remember. However, if it's almost time for your next dose, skip the missed dose and continue with your regular schedule. Do not double the dose to catch up.`,
        category: "Dosage",
        icon: Clock,
      },
    ],
    Vitamins: [
      {
        id: 5,
        question: `When is the best time to take ${productName}?`,
        answer: `The best time to take ${productName} depends on the type of vitamin. Fat-soluble vitamins are best taken with meals, while water-soluble vitamins can be taken on an empty stomach. Check the label for specific timing recommendations.`,
        category: "Timing",
        icon: Clock,
      },
      {
        id: 6,
        question: `Can I take too much ${productName}?`,
        answer: `Yes, taking excessive amounts of ${productName} can be harmful. Always follow the recommended dosage on the label. If you're taking multiple supplements, make sure you're not exceeding safe limits for any nutrients.`,
        category: "Safety",
        icon: Shield,
      },
    ],
    Syrups: [
      {
        id: 5,
        question: `How should I measure ${productName}?`,
        answer: `Always use the measuring device provided with ${productName} or a proper measuring spoon/cup. Do not use household spoons as they may not provide accurate measurements. Shake well before each use if indicated.`,
        category: "Usage",
        icon: Pill,
      },
      {
        id: 6,
        question: `How should I store ${productName}?`,
        answer: `Store ${productName} according to the label instructions. Most syrups should be stored at room temperature, away from heat and direct light. Some may require refrigeration after opening. Keep the bottle tightly closed.`,
        category: "Storage",
        icon: Info,
      },
    ],
  }

  const specificQuestions = categorySpecificQuestions[productCategory] || []
  return [...baseQuestions, ...specificQuestions]
}

export default function ProductFAQ({ productId, productName, productCategory }: ProductFAQProps) {
  const [expandedItems, setExpandedItems] = useState<number[]>([])
  const [showAll, setShowAll] = useState(false)

  const faqs = generateProductFAQs(productName, productCategory)
  const displayedFAQs = showAll ? faqs : faqs.slice(0, 3)

  const toggleExpanded = (id: number) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-card-foreground">AI-Generated FAQ</CardTitle>
            <p className="text-sm text-muted-foreground">Common questions about {productName}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayedFAQs.map((faq) => {
          const isExpanded = expandedItems.includes(faq.id)
          const IconComponent = faq.icon

          return (
            <div key={faq.id} className="border border-border rounded-lg">
              <button
                onClick={() => toggleExpanded(faq.id)}
                className="w-full p-4 text-left hover:bg-muted/50 transition-colors rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 mt-1">
                      <IconComponent className="h-3 w-3 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-card-foreground text-left">{faq.question}</h4>
                      <Badge variant="outline" className="text-xs mt-1">
                        {faq.category}
                      </Badge>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
              </button>
              {isExpanded && (
                <div className="px-4 pb-4">
                  <div className="ml-9">
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">{faq.answer}</p>
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="h-3 w-3 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-yellow-700 dark:text-yellow-300">
                          <strong>AI-Generated:</strong> This information is for educational purposes only. Always
                          consult with a healthcare professional for personalized medical advice.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {faqs.length > 3 && (
          <div className="text-center pt-2">
            <Button variant="outline" onClick={() => setShowAll(!showAll)} className="bg-transparent">
              {showAll ? "Show Less" : `Show All ${faqs.length} Questions`}
            </Button>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Need More Information?</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                Our qualified pharmacists are available for personalized consultations and detailed product information.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-600 dark:text-blue-300 dark:hover:bg-blue-900/40"
                >
                  Call Pharmacist
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-600 dark:text-blue-300 dark:hover:bg-blue-900/40"
                >
                  Book Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
