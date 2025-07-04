"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Building2,
  FileText,
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  Camera,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Phone,
  Mail,
  User,
  Home,
  Lock,
  Trash2,
} from "lucide-react"
import MobileBusinessCategorySelector from "./mobile-business-category-selector"

type BusinessType = "products" | "services" | "both" | null

interface FormData {
  businessName: string
  businessEmail: string
  businessType: BusinessType
  selectedCategories: string[]
  categoryDetails: any[]
  businessDescription: string
  phoneNumber: string
  streetAddress: string
  city: string
  state: string
  zipCode: string
  country: string
  documents: File[] | null
  password: string
  confirmPassword: string
}

interface ValidationState {
  [key: string]: {
    isValid: boolean
    message: string
  }
}

export default function Component() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    businessEmail: "",
    businessType: null,
    selectedCategories: [],
    categoryDetails: [],
    businessDescription: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    documents: null,
    password: "",
    confirmPassword: "",
  })

  const [validation, setValidation] = useState<ValidationState>({})

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  // Real-time validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return {
      isValid: emailRegex.test(email),
      message: emailRegex.test(email) ? "Valid email address" : "Please enter a valid email address",
    }
  }

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    return {
      isValid: phoneRegex.test(phone.replace(/\D/g, "")),
      message: phoneRegex.test(phone.replace(/\D/g, "")) ? "Valid phone number" : "Please enter a valid phone number",
    }
  }

  const validatePassword = (password: string) => {
    const hasLength = password.length >= 8
    const hasNumber = /\d/.test(password)
    const hasLetter = /[a-zA-Z]/.test(password)
    const isValid = hasLength && hasNumber && hasLetter

    return {
      isValid,
      message: isValid ? "Strong password" : "Password must be at least 8 characters with letters and numbers",
    }
  }

  const validateConfirmPassword = (password: string, confirmPassword: string) => {
    return {
      isValid: password === confirmPassword && password.length > 0,
      message: password === confirmPassword && password.length > 0 ? "Passwords match" : "Passwords do not match",
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Real-time validation
    let validationResult = { isValid: true, message: "" }

    switch (field) {
      case "businessEmail":
        validationResult = validateEmail(value)
        break
      case "phoneNumber":
        validationResult = validatePhone(value)
        break
      case "password":
        validationResult = validatePassword(value)
        // Also revalidate confirm password if it exists
        if (formData.confirmPassword) {
          setValidation((prev) => ({
            ...prev,
            confirmPassword: validateConfirmPassword(value, formData.confirmPassword),
          }))
        }
        break
      case "confirmPassword":
        validationResult = validateConfirmPassword(formData.password, value)
        break
      case "businessName":
        validationResult = {
          isValid: value.length >= 2,
          message: value.length >= 2 ? "Valid business name" : "Business name must be at least 2 characters",
        }
        break
    }

    setValidation((prev) => ({
      ...prev,
      [field]: validationResult,
    }))
  }

  const handleCategorySelection = useCallback(
    (data: {
      businessType: BusinessType
      selectedCategories: string[]
      categoryDetails: any[]
    }) => {
      setFormData((prev) => ({
        ...prev,
        businessType: data.businessType,
        selectedCategories: data.selectedCategories,
        categoryDetails: data.categoryDetails,
      }))
    },
    [],
  )

  const handleFileUpload = async (files: FileList | null, source: "file" | "camera" = "file") => {
    if (!files || files.length === 0) return

    setIsUploading(true)

    // Simulate upload delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newFiles = Array.from(files)
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents ? [...prev.documents, ...newFiles] : newFiles,
    }))

    setIsUploading(false)
  }

  const removeDocument = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents ? prev.documents.filter((_, i) => i !== index) : null,
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      // Scroll to top on mobile
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const isStepComplete = (step: number) => {
    if (step === 1) {
      return (
        formData.businessName &&
        formData.businessEmail &&
        validation.businessName?.isValid &&
        validation.businessEmail?.isValid
      )
    }
    if (step === 2) {
      return formData.businessType && formData.selectedCategories.length > 0
    }
    if (step === 3) {
      return (
        formData.phoneNumber &&
        formData.streetAddress &&
        formData.city &&
        formData.state &&
        validation.phoneNumber?.isValid
      )
    }
    if (step === 4) {
      return (
        formData.password &&
        formData.confirmPassword &&
        formData.documents &&
        validation.password?.isValid &&
        validation.confirmPassword?.isValid
      )
    }
    return false
  }

  const getValidationIcon = (field: string) => {
    const fieldValidation = validation[field]
    if (!fieldValidation) return null

    return fieldValidation.isValid ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <AlertCircle className="h-5 w-5 text-red-500" />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Join LINKA</h1>
                <p className="text-sm text-gray-600">
                  Step {currentStep} of {totalSteps}
                </p>
              </div>
            </div>
            {currentStep > 1 && (
              <Button variant="ghost" size="sm" onClick={prevStep} className="h-10 w-10 p-0">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Form Content */}
      <div className="px-4 py-6">
        <div className="mx-auto max-w-md">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl">Business Information</CardTitle>
                <CardDescription>Tell us about your business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName" className="text-base font-medium">
                    Business Name *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="businessName"
                      placeholder="Enter your business name"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange("businessName", e.target.value)}
                      className="pl-10 pr-12 h-12 text-base"
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {getValidationIcon("businessName")}
                    </div>
                  </div>
                  {validation.businessName && (
                    <p className={`text-sm ${validation.businessName.isValid ? "text-green-600" : "text-red-600"}`}>
                      {validation.businessName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessEmail" className="text-base font-medium">
                    Business Email *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="businessEmail"
                      type="email"
                      placeholder="business@example.com"
                      value={formData.businessEmail}
                      onChange={(e) => handleInputChange("businessEmail", e.target.value)}
                      className="pl-10 pr-12 h-12 text-base"
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {getValidationIcon("businessEmail")}
                    </div>
                  </div>
                  {validation.businessEmail && (
                    <p className={`text-sm ${validation.businessEmail.isValid ? "text-green-600" : "text-red-600"}`}>
                      {validation.businessEmail.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessDescription" className="text-base font-medium">
                    Business Description
                  </Label>
                  <Textarea
                    id="businessDescription"
                    placeholder="Briefly describe your business and what makes it unique"
                    value={formData.businessDescription}
                    onChange={(e) => handleInputChange("businessDescription", e.target.value)}
                    className="min-h-[100px] text-base resize-none"
                  />
                  <p className="text-sm text-gray-500">{formData.businessDescription.length}/500 characters</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Business Categories */}
          {currentStep === 2 && (
            <MobileBusinessCategorySelector
              onSelectionChange={handleCategorySelection}
              initialBusinessType={formData.businessType}
              initialCategories={formData.selectedCategories}
            />
          )}

          {/* Step 3: Contact & Location */}
          {currentStep === 3 && (
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl">Contact & Location</CardTitle>
                <CardDescription>Where can customers find you?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-base font-medium">
                    Phone Number *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      className="pl-10 pr-12 h-12 text-base"
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {getValidationIcon("phoneNumber")}
                    </div>
                  </div>
                  {validation.phoneNumber && (
                    <p className={`text-sm ${validation.phoneNumber.isValid ? "text-green-600" : "text-red-600"}`}>
                      {validation.phoneNumber.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="streetAddress" className="text-base font-medium">
                    Street Address *
                  </Label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="streetAddress"
                      placeholder="123 Main Street"
                      value={formData.streetAddress}
                      onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                      className="pl-10 h-12 text-base"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-base font-medium">
                      City *
                    </Label>
                    <Input
                      id="city"
                      placeholder="New York"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="h-12 text-base"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-base font-medium">
                      State *
                    </Label>
                    <Input
                      id="state"
                      placeholder="NY"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      className="h-12 text-base"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zipCode" className="text-base font-medium">
                      ZIP Code
                    </Label>
                    <Input
                      id="zipCode"
                      placeholder="10001"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-base font-medium">
                      Country
                    </Label>
                    <Input
                      id="country"
                      placeholder="United States"
                      value={formData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      className="h-12 text-base"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Documents & Security */}
          {currentStep === 4 && (
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl">Documents & Security</CardTitle>
                <CardDescription>Complete your registration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Document Upload */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Registration Documents *</Label>

                  {/* Upload Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-16 flex-col gap-2 bg-transparent"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      <Upload className="h-6 w-6" />
                      <span className="text-sm">Upload Files</span>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-16 flex-col gap-2 bg-transparent"
                      onClick={() => cameraInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      <Camera className="h-6 w-6" />
                      <span className="text-sm">Take Photo</span>
                    </Button>
                  </div>

                  {/* Hidden File Inputs */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files, "file")}
                  />
                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files, "camera")}
                  />

                  {/* Upload Status */}
                  {isUploading && (
                    <Alert>
                      <Upload className="h-4 w-4 animate-spin" />
                      <AlertDescription>Uploading documents...</AlertDescription>
                    </Alert>
                  )}

                  {/* Uploaded Files */}
                  {formData.documents && formData.documents.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-green-600">
                        {formData.documents.length} document(s) uploaded
                      </p>
                      {formData.documents.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium truncate">{file.name}</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDocument(index)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-sm text-gray-500">
                    Upload business license, tax ID, or incorporation documents (PDF, JPG, PNG)
                  </p>
                </div>

                {/* Password Fields */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base font-medium">
                    Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="pl-10 pr-20 h-12 text-base"
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                      {getValidationIcon("password")}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  {validation.password && (
                    <p className={`text-sm ${validation.password.isValid ? "text-green-600" : "text-red-600"}`}>
                      {validation.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-base font-medium">
                    Confirm Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="pl-10 pr-20 h-12 text-base"
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                      {getValidationIcon("confirmPassword")}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  {validation.confirmPassword && (
                    <p className={`text-sm ${validation.confirmPassword.isValid ? "text-green-600" : "text-red-600"}`}>
                      {validation.confirmPassword.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="mt-8 pb-8">
            {currentStep < totalSteps ? (
              <Button
                onClick={nextStep}
                disabled={!isStepComplete(currentStep)}
                className="w-full h-14 text-lg font-semibold"
                size="lg"
              >
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isStepComplete(currentStep)}
                className="w-full h-14 text-lg font-semibold bg-green-600 hover:bg-green-700"
                size="lg"
              >
                Complete Registration
                <Check className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-6 text-center">
        <p className="text-sm text-gray-500">
          By registering, you agree to LINKA's{" "}
          <a href="#" className="text-blue-600 underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}
