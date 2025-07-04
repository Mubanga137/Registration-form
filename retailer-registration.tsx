"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, Building2, MapPin, FileText, Lock, ArrowLeft, ArrowRight, Check } from "lucide-react"

const businessCategories = [
  "Fashion & Apparel",
  "Electronics & Technology",
  "Home & Garden",
  "Health & Beauty",
  "Sports & Outdoors",
  "Books & Media",
  "Food & Beverages",
  "Automotive",
  "Arts & Crafts",
  "Jewelry & Accessories",
  "Pet Supplies",
  "Office Supplies",
  "Other",
]

export default function Component() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    businessName: "",
    businessEmail: "",
    phoneNumber: "",
    businessCategory: "",
    businessDescription: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    documents: null as File[] | null,
    password: "",
    confirmPassword: "",
  })

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      setFormData((prev) => ({ ...prev, documents: Array.from(files) }))
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const getStepIcon = (step: number) => {
    if (step < currentStep) return <Check className="h-4 w-4" />
    if (step === 1) return <Building2 className="h-4 w-4" />
    if (step === 2) return <MapPin className="h-4 w-4" />
    if (step === 3) return <Lock className="h-4 w-4" />
  }

  const isStepComplete = (step: number) => {
    if (step === 1) {
      return formData.businessName && formData.businessEmail && formData.businessCategory
    }
    if (step === 2) {
      return formData.phoneNumber && formData.streetAddress && formData.city && formData.state
    }
    if (step === 3) {
      return formData.password && formData.confirmPassword && formData.documents
    }
    return false
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Join LINKA</h1>
          <p className="text-gray-600">Register your business and start selling today</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="mb-4 flex justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    step <= currentStep
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {getStepIcon(step)}
                </div>
                {step < totalSteps && (
                  <div className={`h-1 w-full ${step < currentStep ? "bg-blue-600" : "bg-gray-300"}`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {currentStep === 1 && (
                <>
                  <Building2 className="h-5 w-5" />
                  Business Information
                </>
              )}
              {currentStep === 2 && (
                <>
                  <MapPin className="h-5 w-5" />
                  Contact & Location
                </>
              )}
              {currentStep === 3 && (
                <>
                  <FileText className="h-5 w-5" />
                  Documents & Security
                </>
              )}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Tell us about your business"}
              {currentStep === 2 && "Where can customers find you?"}
              {currentStep === 3 && "Complete your registration"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Business Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      placeholder="Enter your business name"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange("businessName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessEmail">Business Email *</Label>
                    <Input
                      id="businessEmail"
                      type="email"
                      placeholder="business@example.com"
                      value={formData.businessEmail}
                      onChange={(e) => handleInputChange("businessEmail", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessCategory">Business Category *</Label>
                    <Select
                      value={formData.businessCategory}
                      onValueChange={(value) => handleInputChange("businessCategory", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your business category" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessDescription">Business Description</Label>
                    <Textarea
                      id="businessDescription"
                      placeholder="Briefly describe your business and products"
                      value={formData.businessDescription}
                      onChange={(e) => handleInputChange("businessDescription", e.target.value)}
                      className="min-h-[100px]"
                    />
                    <p className="text-sm text-gray-500">This will help customers understand what you offer</p>
                  </div>
                </div>
              )}

              {/* Step 2: Contact & Location */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="streetAddress">Street Address *</Label>
                    <Input
                      id="streetAddress"
                      placeholder="123 Main Street"
                      value={formData.streetAddress}
                      onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="New York"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province *</Label>
                      <Input
                        id="state"
                        placeholder="NY"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                      <Input
                        id="zipCode"
                        placeholder="10001"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        placeholder="United States"
                        value={formData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Documents & Security */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="documents">Registration Documents *</Label>
                    <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <Label htmlFor="documents" className="cursor-pointer">
                          <span className="text-blue-600 hover:text-blue-500">Click to upload</span> or drag and drop
                        </Label>
                        <Input
                          id="documents"
                          type="file"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e.target.files)}
                        />
                      </div>
                      <p className="text-sm text-gray-500">Business license, tax ID, or incorporation documents</p>
                      <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB each</p>
                    </div>
                    {formData.documents && (
                      <div className="mt-2">
                        <p className="text-sm font-medium">Uploaded files:</p>
                        <div className="mt-1 space-y-1">
                          {formData.documents.map((file, index) => (
                            <Badge key={index} variant="secondary" className="mr-2">
                              {file.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                    />
                    <p className="text-sm text-gray-500">Must be at least 8 characters with letters and numbers</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepComplete(currentStep)}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={!isStepComplete(currentStep)} className="flex items-center gap-2">
                    Complete Registration
                    <Check className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            By registering, you agree to LINKA's{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
