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
  ShoppingBag,
  Star,
} from "lucide-react"

// Business type definitions
type BusinessType = "products" | "services" | "both" | null

// Category data structures (same as before but with enhanced styling)
const productCategories = [
  {
    id: "fashion",
    name: "Fashion & Apparel",
    icon: Shirt,
    description: "Clothing, shoes, accessories",
    examples: ["Clothing stores", "Shoe shops", "Jewelry stores"],
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "electronics",
    name: "Electronics & Tech",
    icon: Laptop,
    description: "Gadgets, computers, phones",
    examples: ["Phone stores", "Computer shops", "Gaming stores"],
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "groceries",
    name: "Groceries & Food",
    icon: Apple,
    description: "Fresh produce, packaged foods",
    examples: ["Grocery stores", "Specialty food shops"],
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "automotive",
    name: "Automotive & Parts",
    icon: Car,
    description: "Car parts, accessories",
    examples: ["Auto parts stores", "Car accessory shops"],
    color: "from-gray-500 to-slate-600",
  },
  {
    id: "home-garden",
    name: "Home & Garden",
    icon: Home,
    description: "Furniture, decor, gardening",
    examples: ["Furniture stores", "Garden centers"],
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "health-beauty",
    name: "Health & Beauty",
    icon: Heart,
    description: "Cosmetics, skincare, wellness",
    examples: ["Beauty stores", "Pharmacies"],
    color: "from-red-500 to-pink-600",
  },
  {
    id: "sports-outdoors",
    name: "Sports & Outdoors",
    icon: Dumbbell,
    description: "Sports equipment, outdoor gear",
    examples: ["Sports stores", "Outdoor gear shops"],
    color: "from-teal-500 to-cyan-600",
  },
  {
    id: "books-media",
    name: "Books & Media",
    icon: Book,
    description: "Books, magazines, music",
    examples: ["Bookstores", "Music shops"],
    color: "from-purple-500 to-violet-600",
  },
  {
    id: "pets",
    name: "Pet Supplies",
    icon: PawPrint,
    description: "Pet food, toys, accessories",
    examples: ["Pet stores", "Aquarium shops"],
    color: "from-yellow-500 to-amber-600",
  },
  {
    id: "office",
    name: "Office & Business",
    icon: Briefcase,
    description: "Office supplies, equipment",
    examples: ["Office supply stores", "Business equipment"],
    color: "from-slate-500 to-gray-600",
  },
  {
    id: "arts-crafts",
    name: "Arts & Crafts",
    icon: Palette,
    description: "Art supplies, craft materials",
    examples: ["Art supply stores", "Craft shops"],
    color: "from-indigo-500 to-purple-600",
  },
]

const serviceCategories = [
  {
    id: "delivery",
    name: "Delivery & Logistics",
    icon: Truck,
    description: "Package delivery, courier services",
    examples: ["Courier services", "Package delivery"],
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "repairs",
    name: "Repair & Maintenance",
    icon: Settings,
    description: "Device repairs, maintenance",
    examples: ["Phone repair", "Computer repair"],
    color: "from-gray-500 to-slate-600",
  },
  {
    id: "cleaning",
    name: "Cleaning Services",
    icon: Sparkles,
    description: "Home cleaning, commercial cleaning",
    examples: ["House cleaning", "Office cleaning"],
    color: "from-cyan-500 to-teal-600",
  },
  {
    id: "education",
    name: "Education & Training",
    icon: GraduationCap,
    description: "Tutoring, courses, workshops",
    examples: ["Tutoring services", "Online courses"],
    color: "from-emerald-500 to-green-600",
  },
  {
    id: "photography",
    name: "Photography & Media",
    icon: Camera,
    description: "Photography, videography",
    examples: ["Wedding photography", "Video production"],
    color: "from-purple-500 to-violet-600",
  },
  {
    id: "personal-care",
    name: "Personal Care",
    icon: Scissors,
    description: "Hair, beauty, massage",
    examples: ["Hair salons", "Massage therapy"],
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "consulting",
    name: "Consulting & Professional",
    icon: Briefcase,
    description: "Business consulting, legal",
    examples: ["Business consulting", "Legal services"],
    color: "from-indigo-500 to-blue-600",
  },
  {
    id: "home-services",
    name: "Home Services",
    icon: Home,
    description: "Home improvement, landscaping",
    examples: ["Plumbing", "Electrical work"],
    color: "from-orange-500 to-red-600",
  },
  {
    id: "automotive-services",
    name: "Automotive Services",
    icon: Car,
    description: "Car repair, maintenance",
    examples: ["Auto repair", "Car wash"],
    color: "from-slate-500 to-gray-600",
  },
  {
    id: "health-services",
    name: "Health & Medical",
    icon: Heart,
    description: "Healthcare, therapy",
    examples: ["Telehealth", "Physical therapy"],
    color: "from-red-500 to-pink-600",
  },
  {
    id: "entertainment",
    name: "Entertainment & Events",
    icon: Camera,
    description: "Entertainment services, event planning",
    examples: ["Event planning", "DJ services", "Party entertainment"],
    color: "from-violet-500 to-purple-600",
  },
]

interface ProfessionalBusinessCategorySelectorProps {
  onSelectionChange: (data: {
    businessType: BusinessType
    selectedCategories: string[]
    categoryDetails: any[]
  }) => void
  initialBusinessType?: BusinessType
  initialCategories?: string[]
}

export default function ProfessionalBusinessCategorySelector({
  onSelectionChange,
  initialBusinessType = null,
  initialCategories = [],
}: ProfessionalBusinessCategorySelectorProps) {
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
    <div className="space-y-8">
      {/* Business Type Selection */}
      <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-3xl bg-white/70 backdrop-blur-sm">
        <CardHeader className="text-center pb-6 pt-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/25">
            <ShoppingBag className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Business Categories
          </CardTitle>
          <CardDescription className="text-base text-slate-600 font-medium">
            What does your business offer?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-8 pb-8">
          <div className="grid grid-cols-1 gap-4">
            {/* Products Option */}
            <Card
              className={`cursor-pointer transition-all duration-200 active:scale-95 rounded-2xl ${
                businessType === "products"
                  ? "ring-2 ring-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg shadow-blue-500/20"
                  : "hover:bg-slate-50 hover:shadow-md bg-white/80 backdrop-blur-sm"
              }`}
              onClick={() => handleBusinessTypeChange("products")}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      businessType === "products"
                        ? "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25"
                        : "bg-gradient-to-br from-blue-100 to-indigo-100"
                    }`}
                  >
                    <Package className={`h-6 w-6 ${businessType === "products" ? "text-white" : "text-blue-600"}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-800">Products</h3>
                    <p className="text-sm text-slate-600 font-medium">Physical items you sell to customers</p>
                  </div>
                  {businessType === "products" && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 shadow-sm">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Services Option */}
            <Card
              className={`cursor-pointer transition-all duration-200 active:scale-95 rounded-2xl ${
                businessType === "services"
                  ? "ring-2 ring-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-lg shadow-emerald-500/20"
                  : "hover:bg-slate-50 hover:shadow-md bg-white/80 backdrop-blur-sm"
              }`}
              onClick={() => handleBusinessTypeChange("services")}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      businessType === "services"
                        ? "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25"
                        : "bg-gradient-to-br from-emerald-100 to-teal-100"
                    }`}
                  >
                    <Wrench className={`h-6 w-6 ${businessType === "services" ? "text-white" : "text-emerald-600"}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-800">Services</h3>
                    <p className="text-sm text-slate-600 font-medium">Professional services you provide</p>
                  </div>
                  {businessType === "services" && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 shadow-sm">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Both Option */}
            <Card
              className={`cursor-pointer transition-all duration-200 active:scale-95 rounded-2xl ${
                businessType === "both"
                  ? "ring-2 ring-violet-500 bg-gradient-to-br from-violet-50 to-purple-50 shadow-lg shadow-violet-500/20"
                  : "hover:bg-slate-50 hover:shadow-md bg-white/80 backdrop-blur-sm"
              }`}
              onClick={() => handleBusinessTypeChange("both")}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      businessType === "both"
                        ? "bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25"
                        : "bg-gradient-to-br from-violet-100 to-purple-100"
                    }`}
                  >
                    <div className="flex">
                      <Package className={`h-4 w-4 ${businessType === "both" ? "text-white" : "text-violet-600"}`} />
                      <Wrench
                        className={`h-4 w-4 ml-1 ${businessType === "both" ? "text-white" : "text-violet-600"}`}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-800">Both</h3>
                    <p className="text-sm text-slate-600 font-medium">Products and services combined</p>
                  </div>
                  {businessType === "both" && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 shadow-sm">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Category Selection */}
      {businessType && (
        <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-3xl bg-white/70 backdrop-blur-sm">
          <CardHeader className="pb-6 pt-8 px-8">
            <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <Star className="h-6 w-6 text-amber-500" />
              Select Categories
              {businessType === "both" && (
                <Badge
                  variant="secondary"
                  className="text-xs font-semibold bg-violet-100 text-violet-700 border-violet-200"
                >
                  Multi-select enabled
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="text-base text-slate-600 font-medium">
              Choose categories that best describe your business
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <ScrollArea className="h-80 w-full">
              <div className="space-y-4">
                {availableCategories.map((category) => {
                  const Icon = category.icon
                  const isSelected = selectedCategories.includes(category.id)
                  const isProductCategory = productCategories.some((cat) => cat.id === category.id)

                  return (
                    <Card
                      key={category.id}
                      className={`cursor-pointer transition-all duration-200 active:scale-95 rounded-2xl ${
                        isSelected
                          ? "ring-2 ring-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg shadow-blue-500/20"
                          : "hover:bg-slate-50 hover:shadow-md bg-white/80 backdrop-blur-sm"
                      }`}
                      onClick={() => handleCategoryToggle(category.id)}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${category.color} shadow-lg`}
                          >
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-bold text-base text-slate-800">{category.name}</h4>
                              {businessType === "both" && (
                                <Badge
                                  variant="outline"
                                  className={`text-xs font-semibold ${
                                    isProductCategory
                                      ? "border-blue-200 text-blue-700 bg-blue-50"
                                      : "border-emerald-200 text-emerald-700 bg-emerald-50"
                                  }`}
                                >
                                  {isProductCategory ? "Product" : "Service"}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-slate-600 font-medium mb-3">{category.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {category.examples.slice(0, 2).map((example, idx) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className="text-xs bg-slate-100 text-slate-600 border-slate-200"
                                >
                                  {example}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          {isSelected && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 shadow-sm">
                              <Check className="h-5 w-5 text-white" />
                            </div>
                          )}
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
        <Card className="border-0 shadow-xl shadow-emerald-200/50 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50">
          <CardHeader className="pb-4 pt-6 px-8">
            <CardTitle className="text-lg font-bold text-emerald-800 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 shadow-sm">
                <Check className="h-5 w-5 text-white" />
              </div>
              Your Selection ({selectedCategories.length} categories)
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-6">
            <div className="flex flex-wrap gap-3">
              {selectedCategories.map((categoryId) => {
                const category = availableCategories.find((cat) => cat.id === categoryId)
                const isProductCategory = productCategories.some((cat) => cat.id === categoryId)

                return category ? (
                  <Badge
                    key={categoryId}
                    variant="secondary"
                    className={`text-sm py-2 px-4 font-semibold rounded-xl shadow-sm ${
                      isProductCategory
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : "bg-emerald-100 text-emerald-800 border-emerald-200"
                    }`}
                  >
                    {category.name}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCategoryToggle(categoryId)
                      }}
                      className="ml-2 hover:bg-red-100 rounded-full p-1 transition-colors"
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
