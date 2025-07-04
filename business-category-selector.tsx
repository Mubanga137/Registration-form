"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Package,
  Wrench,
  ShoppingBag,
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
  Info,
  Check,
  X,
} from "lucide-react"

// Business type definitions
type BusinessType = "products" | "services" | "both" | null

// Category data structures
const productCategories = [
  {
    id: "fashion",
    name: "Fashion & Apparel",
    icon: Shirt,
    description: "Clothing, shoes, accessories, and fashion items",
    examples: ["Clothing stores", "Shoe shops", "Jewelry stores"],
  },
  {
    id: "electronics",
    name: "Electronics & Technology",
    icon: Laptop,
    description: "Gadgets, computers, phones, and tech accessories",
    examples: ["Phone stores", "Computer shops", "Gaming stores"],
  },
  {
    id: "groceries",
    name: "Groceries & Food",
    icon: Apple,
    description: "Fresh produce, packaged foods, and beverages",
    examples: ["Grocery stores", "Specialty food shops", "Organic markets"],
  },
  {
    id: "automotive",
    name: "Automotive & Parts",
    icon: Car,
    description: "Car parts, accessories, and automotive supplies",
    examples: ["Auto parts stores", "Car accessory shops", "Tire dealers"],
  },
  {
    id: "home-garden",
    name: "Home & Garden",
    icon: Home,
    description: "Furniture, decor, gardening supplies, and home improvement",
    examples: ["Furniture stores", "Garden centers", "Home decor shops"],
  },
  {
    id: "health-beauty",
    name: "Health & Beauty",
    icon: Heart,
    description: "Cosmetics, skincare, wellness, and health products",
    examples: ["Beauty stores", "Pharmacies", "Wellness shops"],
  },
  {
    id: "sports-outdoors",
    name: "Sports & Outdoors",
    icon: Dumbbell,
    description: "Sports equipment, outdoor gear, and fitness products",
    examples: ["Sports stores", "Outdoor gear shops", "Fitness equipment"],
  },
  {
    id: "books-media",
    name: "Books & Media",
    icon: Book,
    description: "Books, magazines, music, movies, and educational materials",
    examples: ["Bookstores", "Music shops", "Educational suppliers"],
  },
  {
    id: "pets",
    name: "Pet Supplies",
    icon: PawPrint,
    description: "Pet food, toys, accessories, and care products",
    examples: ["Pet stores", "Aquarium shops", "Pet grooming supplies"],
  },
  {
    id: "office",
    name: "Office & Business",
    icon: Briefcase,
    description: "Office supplies, business equipment, and stationery",
    examples: ["Office supply stores", "Business equipment", "Stationery shops"],
  },
  {
    id: "arts-crafts",
    name: "Arts & Crafts",
    icon: Palette,
    description: "Art supplies, craft materials, and creative tools",
    examples: ["Art supply stores", "Craft shops", "Hobby stores"],
  },
]

const serviceCategories = [
  {
    id: "delivery",
    name: "Delivery & Logistics",
    icon: Truck,
    description: "Package delivery, courier services, and logistics",
    examples: ["Courier services", "Package delivery", "Moving services"],
  },
  {
    id: "repairs",
    name: "Repair & Maintenance",
    icon: Settings,
    description: "Device repairs, maintenance, and technical services",
    examples: ["Phone repair", "Computer repair", "Appliance service"],
  },
  {
    id: "cleaning",
    name: "Cleaning Services",
    icon: Sparkles,
    description: "Home cleaning, commercial cleaning, and specialized cleaning",
    examples: ["House cleaning", "Office cleaning", "Carpet cleaning"],
  },
  {
    id: "education",
    name: "Education & Training",
    icon: GraduationCap,
    description: "Tutoring, courses, workshops, and educational services",
    examples: ["Tutoring services", "Online courses", "Skill training"],
  },
  {
    id: "photography",
    name: "Photography & Media",
    icon: Camera,
    description: "Photography, videography, and media production services",
    examples: ["Wedding photography", "Video production", "Photo editing"],
  },
  {
    id: "personal-care",
    name: "Personal Care & Wellness",
    icon: Scissors,
    description: "Hair, beauty, massage, and personal wellness services",
    examples: ["Hair salons", "Massage therapy", "Beauty treatments"],
  },
  {
    id: "consulting",
    name: "Consulting & Professional",
    icon: Briefcase,
    description: "Business consulting, legal, accounting, and professional services",
    examples: ["Business consulting", "Legal services", "Accounting"],
  },
  {
    id: "home-services",
    name: "Home Services",
    icon: Home,
    description: "Home improvement, landscaping, and household services",
    examples: ["Plumbing", "Electrical work", "Landscaping"],
  },
  {
    id: "automotive-services",
    name: "Automotive Services",
    icon: Car,
    description: "Car repair, maintenance, and automotive services",
    examples: ["Auto repair", "Car wash", "Oil change"],
  },
  {
    id: "health-services",
    name: "Health & Medical",
    icon: Heart,
    description: "Healthcare, therapy, and medical services",
    examples: ["Telehealth", "Physical therapy", "Medical consultations"],
  },
  {
    id: "entertainment",
    name: "Entertainment & Events",
    icon: Camera,
    description: "Entertainment services, event planning, and recreational activities",
    examples: ["Event planning", "DJ services", "Party entertainment", "Live performances"],
  },
]

interface BusinessCategorySelectorProps {
  onSelectionChange: (data: {
    businessType: BusinessType
    selectedCategories: string[]
    categoryDetails: any[]
  }) => void
  initialBusinessType?: BusinessType
  initialCategories?: string[]
}

export default function BusinessCategorySelector({
  onSelectionChange,
  initialBusinessType = null,
  initialCategories = [],
}: BusinessCategorySelectorProps) {
  const [businessType, setBusinessType] = useState<BusinessType>(initialBusinessType)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories)
  const [errors, setErrors] = useState<string[]>([])

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
    setSelectedCategories([]) // Reset categories when business type changes
    setErrors([])

    // Notify parent of business type change
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

      // Update parent component immediately with new selection
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

  // Validate selection
  const validateSelection = () => {
    const newErrors: string[] = []

    if (!businessType) {
      newErrors.push("Please select your business type")
    }

    if (businessType && selectedCategories.length === 0) {
      newErrors.push("Please select at least one category")
    }

    if (businessType === "both" && selectedCategories.length < 2) {
      newErrors.push("When selecting 'Both', please choose categories from both products and services")
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  // Update parent component when selection changes

  const availableCategories = getAvailableCategories()

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Business Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              What does your business offer?
            </CardTitle>
            <CardDescription>Select the type of business you operate to see relevant categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Products Option */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      businessType === "products" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleBusinessTypeChange("products")}
                  >
                    <CardContent className="p-6 text-center">
                      <Package className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                      <h3 className="font-semibold mb-2">Products</h3>
                      <p className="text-sm text-gray-600">Physical items you sell</p>
                      {businessType === "products" && <Check className="h-5 w-5 text-green-600 mx-auto mt-2" />}
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Choose this if you sell physical products like clothing, electronics, food, etc.</p>
                </TooltipContent>
              </Tooltip>

              {/* Services Option */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      businessType === "services" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleBusinessTypeChange("services")}
                  >
                    <CardContent className="p-6 text-center">
                      <Wrench className="h-8 w-8 mx-auto mb-3 text-green-600" />
                      <h3 className="font-semibold mb-2">Services</h3>
                      <p className="text-sm text-gray-600">Services you provide</p>
                      {businessType === "services" && <Check className="h-5 w-5 text-green-600 mx-auto mt-2" />}
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Choose this if you provide services like repairs, cleaning, consulting, etc.</p>
                </TooltipContent>
              </Tooltip>

              {/* Both Option */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      businessType === "both" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleBusinessTypeChange("both")}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="flex justify-center mb-3">
                        <Package className="h-6 w-6 text-blue-600" />
                        <Wrench className="h-6 w-6 text-green-600 ml-1" />
                      </div>
                      <h3 className="font-semibold mb-2">Both</h3>
                      <p className="text-sm text-gray-600">Products and services</p>
                      {businessType === "both" && <Check className="h-5 w-5 text-green-600 mx-auto mt-2" />}
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Choose this if you offer both physical products and services</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardContent>
        </Card>

        {/* Category Selection */}
        {businessType && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Select Your Categories
                {businessType === "both" && (
                  <Badge variant="secondary" className="ml-2">
                    Multi-select enabled
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                {businessType === "products" && "Choose the product categories that best describe your business"}
                {businessType === "services" && "Choose the service categories that best describe your business"}
                {businessType === "both" &&
                  "Choose categories from both products and services that describe your business"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableCategories.map((category) => {
                    const Icon = category.icon
                    const isSelected = selectedCategories.includes(category.id)
                    const isProductCategory = productCategories.some((cat) => cat.id === category.id)

                    return (
                      <Tooltip key={category.id}>
                        <TooltipTrigger asChild>
                          <Card
                            className={`cursor-pointer transition-all hover:shadow-md ${
                              isSelected ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
                            }`}
                            onClick={() => handleCategoryToggle(category.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <div className="flex-shrink-0">
                                  <Icon
                                    className={`h-6 w-6 ${isProductCategory ? "text-blue-600" : "text-green-600"}`}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium text-sm leading-tight">{category.name}</h4>
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
                                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{category.description}</p>
                                  {isSelected && (
                                    <div className="flex items-center gap-1 mt-2">
                                      <Check className="h-4 w-4 text-green-600" />
                                      <span className="text-xs text-green-600 font-medium">Selected</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="max-w-xs">
                          <div className="space-y-2">
                            <p className="font-medium">{category.name}</p>
                            <p className="text-sm">{category.description}</p>
                            <div>
                              <p className="text-xs font-medium mb-1">Examples:</p>
                              <ul className="text-xs space-y-0.5">
                                {category.examples.map((example, idx) => (
                                  <li key={idx}>• {example}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    )
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        {/* Selected Categories Summary */}
        {selectedCategories.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                Your Selection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">Business Type:</Label>
                  <Badge variant="outline" className="ml-2 capitalize">
                    {businessType}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Categories ({selectedCategories.length}):</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCategories.map((categoryId) => {
                      const category = availableCategories.find((cat) => cat.id === categoryId)
                      const isProductCategory = productCategories.some((cat) => cat.id === categoryId)

                      return category ? (
                        <Badge
                          key={categoryId}
                          variant="secondary"
                          className={`${
                            isProductCategory
                              ? "bg-blue-100 text-blue-800 border-blue-200"
                              : "bg-green-100 text-green-800 border-green-200"
                          }`}
                        >
                          {category.name}
                          <button
                            onClick={() => handleCategoryToggle(categoryId)}
                            className="ml-2 hover:bg-red-100 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ) : null
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Validation Errors */}
        {errors.length > 0 && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800 mb-1">Please complete your selection:</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    {errors.map((error, idx) => (
                      <li key={idx}>• {error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Validation Button */}
        <Button
          onClick={validateSelection}
          className="w-full"
          disabled={!businessType || selectedCategories.length === 0}
        >
          Validate Selection
        </Button>
      </div>
    </TooltipProvider>
  )
}
