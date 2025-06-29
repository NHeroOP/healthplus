"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, ChevronDown, ChevronUp, Bot, Pill, AlertTriangle, Info, Heart, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// AI-generated FAQ data for medicines
const faqData = {
  general: [
    {
      id: 1,
      question: "How should I store my medications?",
      answer:
        "Most medications should be stored in a cool, dry place away from direct sunlight and heat. The bathroom medicine cabinet is not ideal due to humidity. Keep medications in their original containers with labels intact. Some medications require refrigeration - check the label or ask your pharmacist.",
      category: "Storage",
      tags: ["storage", "safety", "temperature"],
    },
    {
      id: 2,
      question: "What should I do if I miss a dose?",
      answer:
        "If you miss a dose, take it as soon as you remember. However, if it's almost time for your next dose, skip the missed dose and continue with your regular schedule. Never double up on doses unless specifically instructed by your healthcare provider.",
      category: "Dosage",
      tags: ["missed dose", "timing", "safety"],
    },
    {
      id: 3,
      question: "Can I take expired medications?",
      answer:
        "No, you should not take expired medications. While some may retain potency past their expiration date, others can become less effective or potentially harmful. Dispose of expired medications safely through a pharmacy take-back program.",
      category: "Safety",
      tags: ["expiration", "safety", "disposal"],
    },
    {
      id: 4,
      question: "How do I know if I'm allergic to a medication?",
      answer:
        "Signs of medication allergy can include rash, hives, itching, difficulty breathing, swelling of face/lips/tongue, or severe dizziness. If you experience any of these symptoms, stop taking the medication and seek immediate medical attention. Always inform healthcare providers about known allergies.",
      category: "Allergies",
      tags: ["allergic reaction", "symptoms", "emergency"],
    },
    {
      id: 5,
      question: "Can I drink alcohol while taking medications?",
      answer:
        "Alcohol can interact with many medications, potentially increasing side effects or reducing effectiveness. Some combinations can be dangerous. Always check with your pharmacist or healthcare provider before consuming alcohol while on any medication.",
      category: "Interactions",
      tags: ["alcohol", "interactions", "safety"],
    },
  ],
  painRelief: [
    {
      id: 6,
      question: "What's the difference between paracetamol and ibuprofen?",
      answer:
        "Paracetamol (acetaminophen) is a pain reliever and fever reducer that works on the central nervous system. Ibuprofen is an NSAID that reduces inflammation, pain, and fever. Ibuprofen is better for inflammatory conditions, while paracetamol is gentler on the stomach.",
      category: "Pain Relief",
      tags: ["paracetamol", "ibuprofen", "comparison"],
    },
    {
      id: 7,
      question: "How often can I take paracetamol?",
      answer:
        "Adults can take 500mg-1000mg of paracetamol every 4-6 hours, with a maximum of 4000mg (8 tablets of 500mg) in 24 hours. Never exceed this limit as it can cause serious liver damage. Always read the label and follow dosing instructions.",
      category: "Dosage",
      tags: ["paracetamol", "dosage", "frequency"],
    },
    {
      id: 8,
      question: "Can I take paracetamol and ibuprofen together?",
      answer:
        "Yes, paracetamol and ibuprofen can be taken together as they work differently and don't interact. You can take them at the same time or alternate between them. However, always follow the recommended doses for each medication separately.",
      category: "Combinations",
      tags: ["paracetamol", "ibuprofen", "combination"],
    },
  ],
  vitamins: [
    {
      id: 9,
      question: "When is the best time to take vitamins?",
      answer:
        "Fat-soluble vitamins (A, D, E, K) are best taken with meals containing fat for better absorption. Water-soluble vitamins (B-complex, C) can be taken on an empty stomach. Vitamin D is often better absorbed when taken with the largest meal of the day.",
      category: "Timing",
      tags: ["vitamins", "timing", "absorption"],
    },
    {
      id: 10,
      question: "Can I take too many vitamins?",
      answer:
        "Yes, taking excessive amounts of vitamins can be harmful. Fat-soluble vitamins can accumulate in the body and cause toxicity. Water-soluble vitamins are generally safer but can still cause side effects in large doses. Always follow recommended dosages.",
      category: "Safety",
      tags: ["overdose", "toxicity", "safety"],
    },
    {
      id: 11,
      question: "Do I need vitamin D supplements?",
      answer:
        "Many people have insufficient vitamin D levels, especially those with limited sun exposure. Vitamin D is important for bone health and immune function. A blood test can determine if you need supplementation. Consult your healthcare provider for personalized advice.",
      category: "Supplements",
      tags: ["vitamin D", "deficiency", "testing"],
    },
  ],
  antibiotics: [
    {
      id: 12,
      question: "Why must I finish the entire course of antibiotics?",
      answer:
        "Completing the full antibiotic course ensures all bacteria are eliminated, even if you feel better. Stopping early can lead to antibiotic resistance, where bacteria become harder to treat. This protects both you and the community from resistant infections.",
      category: "Compliance",
      tags: ["antibiotics", "resistance", "completion"],
    },
    {
      id: 13,
      question: "Can I share antibiotics with family members?",
      answer:
        "Never share antibiotics. Each prescription is specifically chosen for the individual's condition, weight, and medical history. Sharing antibiotics can be dangerous and may not treat the other person's condition effectively, potentially causing harm or resistance.",
      category: "Safety",
      tags: ["sharing", "prescription", "safety"],
    },
  ],
}

const categories = [
  { id: "general", name: "General", icon: Info, color: "blue" },
  { id: "painRelief", name: "Pain Relief", icon: Pill, color: "green" },
  { id: "vitamins", name: "Vitamins", icon: Heart, color: "purple" },
  { id: "antibiotics", name: "Antibiotics", icon: Shield, color: "red" },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedItems, setExpandedItems] = useState<number[]>([])
  const [activeCategory, setActiveCategory] = useState("general")

  const allFAQs = Object.values(faqData).flat()

  const filteredFAQs = searchTerm
    ? allFAQs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    : faqData[activeCategory as keyof typeof faqData]

  const toggleExpanded = (id: number) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.icon : Info
  }

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.color : "blue"
  }

  return (
    <>

      <div className="px-2 py-4 sm:px-4 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-4 sm:mb-6 text-sm">
            <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Back to Home
          </Link>

          <div className="mb-6 sm:mb-8 text-center">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary mr-2 sm:mr-3">
                <Bot className="h-4 w-4 sm:h-6 sm:w-6 text-primary-foreground" />
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Medicine FAQ</h1>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
              AI-generated answers to frequently asked questions about medicines, dosages, and health safety. Always
              consult with healthcare professionals for personalized medical advice.
            </p>
          </div>

          {/* Search */}
          <Card className="border-border bg-card mb-6 sm:mb-8">
            <CardContent className="p-3 sm:p-6">
              <div className="relative">
                <Search className="absolute left-2 sm:left-3 top-1/2 h-3 w-3 sm:h-4 sm:w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search FAQ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 sm:pl-10 bg-background border-input text-sm"
                />
              </div>
              {searchTerm && (
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                  Found {filteredFAQs.length} result{filteredFAQs.length !== 1 ? "s" : ""} for "{searchTerm}"
                </p>
              )}
            </CardContent>
          </Card>

          {/* Categories or Search Results */}
          {!searchTerm ? (
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-muted mb-6 sm:mb-8 h-auto p-1">
                {categories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 py-2 px-1 sm:px-3 text-xs sm:text-sm"
                    >
                      <IconComponent className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="truncate">{category.name}</span>
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <div className="space-y-3 sm:space-y-4">
                    {faqData[category.id as keyof typeof faqData].map((faq) => {
                      const IconComponent = getCategoryIcon(category.id)
                      const isExpanded = expandedItems.includes(faq.id)

                      return (
                        <Card key={faq.id} className="border-border bg-card">
                          <CardHeader
                            className="cursor-pointer hover:bg-muted/50 transition-colors p-3 sm:p-6"
                            onClick={() => toggleExpanded(faq.id)}
                          >
                            <div className="flex items-start justify-between gap-2 sm:gap-4">
                              <div className="flex items-start space-x-2 sm:space-x-3 flex-1 min-w-0">
                                <div
                                  className={`flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-${getCategoryColor(category.id)}-100 dark:bg-${getCategoryColor(category.id)}-900 flex-shrink-0`}
                                >
                                  <IconComponent
                                    className={`h-3 w-3 sm:h-4 sm:w-4 text-${getCategoryColor(category.id)}-600 dark:text-${getCategoryColor(category.id)}-400`}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <CardTitle className="text-card-foreground text-left text-sm sm:text-base leading-tight">
                                    {faq.question}
                                  </CardTitle>
                                  <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                                    <Badge variant="outline" className="text-xs px-1 py-0">
                                      {faq.category}
                                    </Badge>
                                    {faq.tags.slice(0, 2).map((tag) => (
                                      <Badge key={tag} variant="secondary" className="text-xs px-1 py-0">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="flex-shrink-0">
                                {isExpanded ? (
                                  <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                                )}
                              </div>
                            </div>
                          </CardHeader>
                          {isExpanded && (
                            <CardContent className="pt-0 p-3 sm:p-6 sm:pt-0">
                              <div className="ml-8 sm:ml-11">
                                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                                  {faq.answer}
                                </p>
                                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                  <div className="flex items-start space-x-2">
                                    <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-xs text-yellow-700 dark:text-yellow-300 leading-tight">
                                      <strong>Disclaimer:</strong> This information is AI-generated and for educational
                                      purposes only. Always consult with a healthcare professional or pharmacist for
                                      personalized medical advice.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      )
                    })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            /* Search Results */
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Search Results</h2>
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq) => {
                  const isExpanded = expandedItems.includes(faq.id)
                  const categoryData = categories.find((cat) =>
                    faqData[cat.id as keyof typeof faqData].some((item) => item.id === faq.id),
                  )
                  const IconComponent = categoryData?.icon || Info

                  return (
                    <Card key={faq.id} className="border-border bg-card">
                      <CardHeader
                        className="cursor-pointer hover:bg-muted/50 transition-colors p-3 sm:p-6"
                        onClick={() => toggleExpanded(faq.id)}
                      >
                        <div className="flex items-start justify-between gap-2 sm:gap-4">
                          <div className="flex items-start space-x-2 sm:space-x-3 flex-1 min-w-0">
                            <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                              <IconComponent className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-card-foreground text-left text-sm sm:text-base leading-tight">
                                {faq.question}
                              </CardTitle>
                              <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                                <Badge variant="outline" className="text-xs px-1 py-0">
                                  {faq.category}
                                </Badge>
                                {faq.tags.slice(0, 2).map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs px-1 py-0">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      {isExpanded && (
                        <CardContent className="pt-0 p-3 sm:p-6 sm:pt-0">
                          <div className="ml-8 sm:ml-11">
                            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{faq.answer}</p>
                            <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                              <div className="flex items-start space-x-2">
                                <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-yellow-700 dark:text-yellow-300 leading-tight">
                                  <strong>Disclaimer:</strong> This information is AI-generated and for educational
                                  purposes only. Always consult with a healthcare professional or pharmacist for
                                  personalized medical advice.
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  )
                })
              ) : (
                <Card className="border-border bg-card text-center py-8 sm:py-12">
                  <CardContent className="p-4 sm:p-6">
                    <Search className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mb-3 sm:mb-4" />
                    <h3 className="text-base sm:text-lg font-medium text-card-foreground mb-2">No results found</h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                      Try searching with different keywords or browse our categories above.
                    </p>
                    <Button variant="outline" onClick={() => setSearchTerm("")} className="bg-transparent text-sm">
                      Clear Search
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Contact Section */}
          <Card className="border-border bg-card mt-8 sm:mt-12">
            <CardContent className="p-4 sm:p-6 text-center">
              <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-2">Still have questions?</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4">
                Our qualified pharmacists are here to help with personalized advice and consultations.
              </p>
              <div className="flex flex-col gap-2 sm:gap-4 sm:flex-row justify-center">
                <Button variant="outline" className="bg-transparent text-sm" size="sm">
                  Call (555) 123-4567
                </Button>
                <Button variant="outline" className="bg-transparent text-sm" size="sm">
                  Visit Our Store
                </Button>
                <Button size="sm">Book Consultation</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

    </>
  )
}
