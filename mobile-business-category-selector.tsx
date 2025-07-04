"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Package,
  Wrench,
  Laptop,
  Shirt,
  Apple,
  Car,
  Home,
  Heart,
  Dumbbell,
  Book,
  PawPrint,
  Briefcase,
  Palette,
  Truck,
  Settings,
  Sparkles,
  GraduationCap,
  Camera,
  Scissors,
  Check,
  X,
} from "lucide-react"

// Business type definitions
type BusinessType = "products" | "services" | "both" | null

// Category data structures (same as before)
const productCategories = [
  {
    id: "fashion",
    name: "Fashion & Apparel",
    icon: Shirt,
    description: "Clothing, shoes, accessories",
    examples: ["Clothing stores", "Shoe shops", "Jewelry stores"],
  },
  {
    id: "electronics",
    name: "Electronics & Tech",
    icon: Laptop,
    description: "Gadgets, computers, phones",
    examples: ["Phone stores", "Computer shops", "Gaming stores"],
  },
  {
    id: "groceries",
    name: "Groceries & Food",
    icon: Apple,
    description: "Fresh produce, packaged foods",
    examples: ["Grocery stores", "Specialty food shops"],
  },
  {
    id: "automotive",
    name: "Automotive & Parts",
    icon: Car,
    description: "Car parts, accessories",
    examples: ["Auto parts stores", "Car accessory shops"],
  },
  {
    id: "home-garden",
    name: "Home & Garden",
    icon: Home,
    description: "Furniture, decor, gardening",
    examples: ["Furniture stores", "Garden centers"],
  },
  {
    id: "health-beauty",
    name: "Health & Beauty",
    icon: Heart,
    description: "Cosmetics, skincare, wellness",
    examples: ["Beauty stores", "Pharmacies"],
  },
  {
    id: "sports-outdoors",
    name: "Sports & Outdoors",
    icon: Dumbbell,
    description: "Sports equipment, outdoor gear",
    examples: ["Sports stores", "Outdoor gear shops"],
  },
  {
    id: "books-media",
    name: "Books & Media",
    icon: Book,
    description: "Books, magazines, music",
    examples: ["Bookstores", "Music shops"],
  },
  {
    id: "pets",
    name: "Pet Supplies",
    icon: PawPrint,
    description: "Pet food, toys, accessories",
    examples: ["Pet stores", "Aquarium shops"],
  },
  {
    id: "office",
    name: "Office & Business",
    icon: Briefcase,
    description: "Office supplies, equipment",
    examples: ["Office supply stores", "Business equipment"],
  },
  {
    id: "arts-crafts",
    name: "Arts & Crafts",
    icon: Palette,
    description: "Art supplies, craft materials",
    examples: ["Art supply stores", "Craft shops"],
  },
]

const serviceCategories = [
  {
    id: "delivery",
    name: "Delivery & Logistics",
    icon: Truck,
    description: "Package delivery, courier services",
    examples: ["Courier services", "Package delivery"],
  },
  {
    id: "repairs",
    name: "Repair & Maintenance",
    icon: Settings,
    description: "Device repairs, maintenance",
    examples: ["Phone repair", "Computer repair"],
  },
  {
    id: "cleaning",
    name: "Cleaning Services",
    icon: Sparkles,
    description: "Home cleaning, commercial cleaning",
    examples: ["House cleaning", "Office cleaning"],
  },
  {
    id: "education",
    name: "Education & Training",
    icon: GraduationCap,
    description: "Tutoring, courses, workshops",
    examples: ["Tutoring services", "Online courses"],
  },
  {
    id: "photography",
    name: "Photography & Media",
    icon: Camera,
    description: "Photography, videography",
    examples: ["Wedding photography", "Video production"],
  },
  {
    id: "personal-care",
    name: "Personal Care",
    icon: Scissors,
    description: "Hair, beauty, massage",
    examples: ["Hair salons", "Massage therapy"],
  },
  {
    id: "consulting",
    name: "Consulting & Professional",
    icon: Briefcase,
    description: "Business consulting, legal",
    examples: ["Business consulting", "Legal services"],
  },
  {
    id: "home-services",
    name: "Home Services",
    icon: Home,
    description: "Home improvement, landscaping",
    examples: ["Plumbing", "Electrical work"],
  },
  {
    id: "automotive-services",
    name: "Automotive Services",
    icon: Car,
    description: "Car repair, maintenance",
    examples: ["Auto repair", "Car wash"],
  },
  {
    id: "health-services",
    name: "Health & Medical",
    icon: Heart,
    description: "Healthcare, therapy",
    examples: ["Telehealth", "Physical therapy"],
  },
  {
    id: "entertainment",
    name: "Entertainment & Events",
    icon: Camera,
    description: "Entertainment services, event planning",
    examples: ["Event planning", "DJ services", "Party entertainment"],
  },
]

interface MobileBusinessCategorySelectorProps {
  onSelectionChange: (data: {
    businessType: BusinessType
    selectedCategories: string[]
    categoryDetails: any[]
  }) => void
  initialBusinessType?: BusinessType
  initialCategories?: string[]
}

export default function MobileBusinessCategorySelector({
  onSelectionChange,
  initialBusinessType = null,
  initialCategories = [],
}: MobileBusinessCategorySelectorProps) {
  const [businessType, setBusinessType] = useState<BusinessType>(initialBusinessType)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories)

  // Get available categories based on business type
  const getAvailableCategories = () => {
    switch (businessType) {
      case "products":
        return productCategories
      case "services":
        return serviceCategories
      case "both":
        return [...productCategories, ...serviceCategories]
      default:
        return []
    }
  }

  // Handle business type selection
  const handleBusinessTypeChange = (type: BusinessType) => {
    setBusinessType(type)
    setSelectedCategories([])

    onSelectionChange({
      businessType: type,
      selectedCategories: [],
      categoryDetails: [],
    })
  }

  // Handle category selection
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) => {
      const isSelected = prev.includes(categoryId)
      const newSelection = isSelected ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]

      if (businessType) {
        const allCategories = [...productCategories, ...serviceCategories]
        const categoryDetails = newSelection.map((id) => allCategories.find((cat) => cat.id === id)).filter(Boolean)

        onSelectionChange({
          businessType,
          selectedCategories: newSelection,
          categoryDetails,
        })
      }

      return newSelection
    })
  }

  const availableCategories = getAvailableCategories()

  return (
    <div className="space-y-6">
      {/* Business Type Selection */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl">Business Categories</CardTitle>
          <CardDescription>What does your business offer?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {/* Products Option */}
            <Card
              className={`cursor-pointer transition-all active:scale-95 ${
                businessType === "products" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
              }`}
              onClick={() => handleBusinessTypeChange("products")}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Package className="h-8 w-8 text-blue-600 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-base">Products</h3>
                    <p className="text-sm text-gray-600">Physical items you sell</p>
                  </div>
                  {businessType === "products" && <Check className="h-6 w-6 text-green-600" />}
                </div>
              </CardContent>
            </Card>

            {/* Services Option */}
            <Card
              className={`cursor-pointer transition-all active:scale-95 ${
                businessType === "services" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
              }`}
              onClick={() => handleBusinessTypeChange("services")}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Wrench className="h-8 w-8 text-green-600 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-base">Services</h3>
                    <p className="text-sm text-gray-600">Services you provide</p>
                  </div>
                  {businessType === "services" && <Check className="h-6 w-6 text-green-600" />}
                </div>
              </CardContent>
            </Card>

            {/* Both Option */}
            <Card
              className={`cursor-pointer transition-all active:scale-95 ${
                businessType === "both" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
              }`}
              onClick={() => handleBusinessTypeChange("both")}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex flex-shrink-0">
                    <Package className="h-6 w-6 text-blue-600" />
                    <Wrench className="h-6 w-6 text-green-600 ml-1" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base">Both</h3>
                    <p className="text-sm text-gray-600">Products and services</p>
                  </div>
                  {businessType === "both" && <Check className="h-6 w-6 text-green-600" />}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Category Selection */}
      {businessType && (
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              Select Categories
              {businessType === "both" && (
                <Badge variant="secondary" className="text-xs">
                  Multi-select
                </Badge>
              )}
            </CardTitle>
            <CardDescription>Choose categories that describe your business</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80 w-full">
              <div className="space-y-3">
                {availableCategories.map((category) => {
                  const Icon = category.icon
                  const isSelected = selectedCategories.includes(category.id)
                  const isProductCategory = productCategories.some((cat) => cat.id === category.id)

                  return (
                    <Card
                      key={category.id}
                      className={`cursor-pointer transition-all active:scale-95 ${
                        isSelected ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleCategoryToggle(category.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Icon
                            className={`h-6 w-6 flex-shrink-0 ${isProductCategory ? "text-blue-600" : "text-green-600"}`}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-base">{category.name}</h4>
                              {businessType === "both" && (
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${
                                    isProductCategory
                                      ? "border-blue-200 text-blue-700"
                                      : "border-green-200 text-green-700"
                                  }`}
                                >
                                  {isProductCategory ? "Product" : "Service"}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {category.examples.slice(0, 2).map((example, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {example}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          {isSelected && <Check className="h-6 w-6 text-green-600 flex-shrink-0" />}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Selected Categories Summary */}
      {selectedCategories.length > 0 && (
        <Card className="border-0 shadow-lg bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-green-800">
              <Check className="h-5 w-5" />
              Your Selection ({selectedCategories.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((categoryId) => {
                const category = availableCategories.find((cat) => cat.id === categoryId)
                const isProductCategory = productCategories.some((cat) => cat.id === categoryId)

                return category ? (
                  <Badge
                    key={categoryId}
                    variant="secondary"
                    className={`text-sm py-1 px-3 ${
                      isProductCategory
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : "bg-green-100 text-green-800 border-green-200"
                    }`}
                  >
                    {category.name}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCategoryToggle(categoryId)
                      }}
                      className="ml-2 hover:bg-red-100 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ) : null
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
