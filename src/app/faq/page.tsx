"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, ChevronDown, ChevronUp, Bot, Pill, AlertTriangle, Info, Heart, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

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
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mr-3">
                <Bot className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Medicine FAQ</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AI-generated answers to frequently asked questions about medicines, dosages, and health safety. Always
              consult with healthcare professionals for personalized medical advice.
            </p>
          </div>

          {/* Search */}
          <Card className="border-border bg-card mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search FAQ... (e.g., 'paracetamol dosage', 'vitamin D', 'allergic reaction')"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background border-input"
                />
              </div>
              {searchTerm && (
                <p className="text-sm text-muted-foreground mt-2">
                  Found {filteredFAQs.length} result{filteredFAQs.length !== 1 ? "s" : ""} for "{searchTerm}"
                </p>
              )}
            </CardContent>
          </Card>

          {/* Categories or Search Results */}
          {!searchTerm ? (
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-muted mb-8">
                {categories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-2">
                      <IconComponent className="h-4 w-4" />
                      <span className="hidden sm:inline">{category.name}</span>
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <div className="space-y-4">
                    {faqData[category.id as keyof typeof faqData].map((faq) => {
                      const IconComponent = getCategoryIcon(category.id)
                      const isExpanded = expandedItems.includes(faq.id)

                      return (
                        <Card key={faq.id} className="border-border bg-card">
                          <CardHeader
                            className="cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={() => toggleExpanded(faq.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-start space-x-3">
                                <div
                                  className={`flex h-8 w-8 items-center justify-center rounded-full bg-${getCategoryColor(category.id)}-100 dark:bg-${getCategoryColor(category.id)}-900`}
                                >
                                  <IconComponent
                                    className={`h-4 w-4 text-${getCategoryColor(category.id)}-600 dark:text-${getCategoryColor(category.id)}-400`}
                                  />
                                </div>
                                <div className="flex-1">
                                  <CardTitle className="text-card-foreground text-left">{faq.question}</CardTitle>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    <Badge variant="outline" className="text-xs">
                                      {faq.category}
                                    </Badge>
                                    {faq.tags.slice(0, 2).map((tag) => (
                                      <Badge key={tag} variant="secondary" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              {isExpanded ? (
                                <ChevronUp className="h-5 w-5 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>
                          </CardHeader>
                          {isExpanded && (
                            <CardContent className="pt-0">
                              <div className="ml-11">
                                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                  <div className="flex items-start space-x-2">
                                    <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-xs text-yellow-700 dark:text-yellow-300">
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
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground mb-4">Search Results</h2>
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
                        className="cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => toggleExpanded(faq.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                              <IconComponent className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-card-foreground text-left">{faq.question}</CardTitle>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {faq.category}
                                </Badge>
                                {faq.tags.slice(0, 2).map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </CardHeader>
                      {isExpanded && (
                        <CardContent className="pt-0">
                          <div className="ml-11">
                            <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                              <div className="flex items-start space-x-2">
                                <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-yellow-700 dark:text-yellow-300">
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
                <Card className="border-border bg-card text-center py-12">
                  <CardContent>
                    <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-card-foreground mb-2">No results found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try searching with different keywords or browse our categories above.
                    </p>
                    <Button variant="outline" onClick={() => setSearchTerm("")} className="bg-transparent">
                      Clear Search
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Contact Section */}
          <Card className="border-border bg-card mt-12">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-4">
                Our qualified pharmacists are here to help with personalized advice and consultations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="bg-transparent">
                  Call (555) 123-4567
                </Button>
                <Button variant="outline" className="bg-transparent">
                  Visit Our Store
                </Button>
                <Button>Book Consultation</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
