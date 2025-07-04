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
  Star,
  Shield,
} from "lucide-react"
import ProfessionalBusinessCategorySelector from "./professional-business-category-selector"
import { Confetti } from "./confetti-animation"
import { SuccessModal } from "./success-modal"

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
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
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
      message: emailRegex.test(email) ? "Perfect! Valid email address" : "Please enter a valid email address",
    }
  }

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    return {
      isValid: phoneRegex.test(phone.replace(/\D/g, "")),
      message: phoneRegex.test(phone.replace(/\D/g, ""))
        ? "Great! Valid phone number"
        : "Please enter a valid phone number",
    }
  }

  const validatePassword = (password: string) => {
    const hasLength = password.length >= 8
    const hasNumber = /\d/.test(password)
    const hasLetter = /[a-zA-Z]/.test(password)
    const isValid = hasLength && hasNumber && hasLetter

    return {
      isValid,
      message: isValid
        ? "Excellent! Strong password"
        : "Password must be at least 8 characters with letters and numbers",
    }
  }

  const validateConfirmPassword = (password: string, confirmPassword: string) => {
    return {
      isValid: password === confirmPassword && password.length > 0,
      message:
        password === confirmPassword && password.length > 0 ? "Perfect! Passwords match" : "Passwords do not match",
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
          message: value.length >= 2 ? "Great! Valid business name" : "Business name must be at least 2 characters",
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
    await new Promise((resolve) => setTimeout(resolve, 1500))

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
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Form submitted:", formData)
    setIsSubmitting(false)
    setShowSuccess(true)
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
      <CheckCircle className="h-5 w-5 text-emerald-500" />
    ) : (
      <AlertCircle className="h-5 w-5 text-rose-500" />
    )
  }

  const stepTitles = ["Business Information", "Business Categories", "Contact & Location", "Documents & Security"]

  const stepDescriptions = [
    "Tell us about your business",
    "Help us understand what you offer",
    "Where can customers find you?",
    "Complete your registration",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Professional Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg shadow-blue-500/25">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full flex items-center justify-center">
                  <Star className="h-2.5 w-2.5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Join LINKA
                </h1>
                <p className="text-sm font-medium text-slate-600">
                  Step {currentStep} of {totalSteps} • {stepTitles[currentStep - 1]}
                </p>
              </div>
            </div>
            {currentStep > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={prevStep}
                className="h-11 w-11 p-0 rounded-xl hover:bg-slate-100 transition-all duration-200"
              >
                <ArrowLeft className="h-5 w-5 text-slate-600" />
              </Button>
            )}
          </div>
          <div className="relative">
            <Progress value={progress} className="h-2 bg-slate-200/60 rounded-full overflow-hidden" />
            <div
              className="absolute top-0 left-0 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="px-6 py-8">
        <div className="mx-auto max-w-md">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-3xl bg-white/70 backdrop-blur-sm">
              <CardHeader className="text-center pb-6 pt-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
                  <User className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  {stepTitles[0]}
                </CardTitle>
                <CardDescription className="text-base text-slate-600 font-medium">
                  {stepDescriptions[0]}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 px-8 pb-8">
                <div className="space-y-3">
                  <Label htmlFor="businessName" className="text-base font-semibold text-slate-800">
                    Business Name *
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <Input
                      id="businessName"
                      placeholder="Enter your business name"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange("businessName", e.target.value)}
                      className="pl-12 pr-14 h-14 text-base rounded-2xl border-slate-200 bg-white/80 backdrop-blur-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 shadow-sm"
                      required
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      {getValidationIcon("businessName")}
                    </div>
                  </div>
                  {validation.businessName && (
                    <p
                      className={`text-sm font-medium ${validation.businessName.isValid ? "text-emerald-600" : "text-rose-600"}`}
                    >
                      {validation.businessName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="businessEmail" className="text-base font-semibold text-slate-800">
                    Business Email *
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <Input
                      id="businessEmail"
                      type="email"
                      placeholder="business@example.com"
                      value={formData.businessEmail}
                      onChange={(e) => handleInputChange("businessEmail", e.target.value)}
                      className="pl-12 pr-14 h-14 text-base rounded-2xl border-slate-200 bg-white/80 backdrop-blur-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 shadow-sm"
                      required
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      {getValidationIcon("businessEmail")}
                    </div>
                  </div>
                  {validation.businessEmail && (
                    <p
                      className={`text-sm font-medium ${validation.businessEmail.isValid ? "text-emerald-600" : "text-rose-600"}`}
                    >
                      {validation.businessEmail.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="businessDescription" className="text-base font-semibold text-slate-800">
                    Business Description
                  </Label>
                  <Textarea
                    id="businessDescription"
                    placeholder="Briefly describe your business and what makes it unique"
                    value={formData.businessDescription}
                    onChange={(e) => handleInputChange("businessDescription", e.target.value)}
                    className="min-h-[120px] text-base resize-none rounded-2xl border-slate-200 bg-white/80 backdrop-blur-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 shadow-sm"
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-slate-500">Optional but recommended</p>
                    <p className="text-sm font-medium text-slate-600">{formData.businessDescription.length}/500</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Business Categories */}
          {currentStep === 2 && (
            <ProfessionalBusinessCategorySelector
              onSelectionChange={handleCategorySelection}
              initialBusinessType={formData.businessType}
              initialCategories={formData.selectedCategories}
            />
          )}

          {/* Step 3: Contact & Location */}
          {currentStep === 3 && (
            <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-3xl bg-white/70 backdrop-blur-sm">
              <CardHeader className="text-center pb-6 pt-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25">
                  <Home className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  {stepTitles[2]}
                </CardTitle>
                <CardDescription className="text-base text-slate-600 font-medium">
                  {stepDescriptions[2]}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 px-8 pb-8">
                <div className="space-y-3">
                  <Label htmlFor="phoneNumber" className="text-base font-semibold text-slate-800">
                    Phone Number *
                  </Label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      className="pl-12 pr-14 h-14 text-base rounded-2xl border-slate-200 bg-white/80 backdrop-blur-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 shadow-sm"
                      required
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      {getValidationIcon("phoneNumber")}
                    </div>
                  </div>
                  {validation.phoneNumber && (
                    <p
                      className={`text-sm font-medium ${validation.phoneNumber.isValid ? "text-emerald-600" : "text-rose-600"}`}
                    >
                      {validation.phoneNumber.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="streetAddress" className="text-base font-semibold text-slate-800">
                    Street Address *
                  </Label>
                  <div className="relative group">
                    <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                    <Input
                      id="streetAddress"
                      placeholder="123 Main Street"
                      value={formData.streetAddress}
                      onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                      className="pl-12 h-14 text-base rounded-2xl border-slate-200 bg-white/80 backdrop-blur-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 shadow-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="city" className="text-base font-semibold text-slate-800">
                      City *
                    </Label>
                    <Input
                      id="city"
                      placeholder="New York"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="h-14 text-base rounded-2xl border-slate-200 bg-white/80 backdrop-blur-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 shadow-sm"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="state" className="text-base font-semibold text-slate-800">
                      State *
                    </Label>
                    <Input
                      id="state"
                      placeholder="NY"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      className="h-14 text-base rounded-2xl border-slate-200 bg-white/80 backdrop-blur-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 shadow-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="zipCode" className="text-base font-semibold text-slate-800">
                      ZIP Code
                    </Label>
                    <Input
                      id="zipCode"
                      placeholder="10001"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      className="h-14 text-base rounded-2xl border-slate-200 bg-white/80 backdrop-blur-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 shadow-sm"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="country" className="text-base font-semibold text-slate-800">
                      Country
                    </Label>
                    <Input
                      id="country"
                      placeholder="United States"
                      value={formData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      className="h-14 text-base rounded-2xl border-slate-200 bg-white/80 backdrop-blur-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 shadow-sm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Documents & Security */}
          {currentStep === 4 && (
            <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-3xl bg-white/70 backdrop-blur-sm">
              <CardHeader className="text-center pb-6 pt-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  {stepTitles[3]}
                </CardTitle>
                <CardDescription className="text-base text-slate-600 font-medium">
                  {stepDescriptions[3]}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 px-8 pb-8">
                {/* Document Upload */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold text-slate-800">Registration Documents *</Label>

                  {/* Upload Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-20 flex-col gap-3 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      <Upload className="h-7 w-7 text-blue-600" />
                      <span className="text-sm font-semibold text-blue-700">Upload Files</span>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-20 flex-col gap-3 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 hover:from-emerald-100 hover:to-teal-100 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md"
                      onClick={() => cameraInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      <Camera className="h-7 w-7 text-emerald-600" />
                      <span className="text-sm font-semibold text-emerald-700">Take Photo</span>
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
                    <Alert className="border-blue-200 bg-blue-50 rounded-2xl">
                      <Upload className="h-5 w-5 animate-spin text-blue-600" />
                      <AlertDescription className="text-blue-800 font-medium">
                        Uploading documents securely...
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Uploaded Files */}
                  {formData.documents && formData.documents.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-emerald-700 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        {formData.documents.length} document(s) uploaded successfully
                      </p>
                      {formData.documents.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                              <FileText className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-emerald-800 truncate block max-w-[180px]">
                                {file.name}
                              </span>
                              <span className="text-xs text-emerald-600">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </span>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDocument(index)}
                            className="h-10 w-10 p-0 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <strong>Required:</strong> Business license, tax ID, or incorporation documents (PDF, JPG, PNG up to
                    10MB each)
                  </p>
                </div>

                {/* Password Fields */}
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-base font-semibold text-slate-800">
                    Password *
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="pl-12 pr-20 h-14 text-base rounded-2xl border-slate-200 bg-white/80 backdrop-blur-sm focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 shadow-sm"
                      required
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                      {getValidationIcon("password")}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-slate-100 rounded-lg"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-slate-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-slate-500" />
                        )}
                      </Button>
                    </div>
                  </div>
                  {validation.password && (
                    <p
                      className={`text-sm font-medium ${validation.password.isValid ? "text-emerald-600" : "text-rose-600"}`}
                    >
                      {validation.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="confirmPassword" className="text-base font-semibold text-slate-800">
                    Confirm Password *
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="pl-12 pr-20 h-14 text-base rounded-2xl border-slate-200 bg-white/80 backdrop-blur-sm focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 shadow-sm"
                      required
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                      {getValidationIcon("confirmPassword")}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-slate-100 rounded-lg"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-slate-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-slate-500" />
                        )}
                      </Button>
                    </div>
                  </div>
                  {validation.confirmPassword && (
                    <p
                      className={`text-sm font-medium ${validation.confirmPassword.isValid ? "text-emerald-600" : "text-rose-600"}`}
                    >
                      {validation.confirmPassword.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="mt-10 pb-8">
            {currentStep < totalSteps ? (
              <Button
                onClick={nextStep}
                disabled={!isStepComplete(currentStep)}
                className="w-full h-16 text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                Continue to Next Step
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isStepComplete(currentStep) || isSubmitting}
                className="w-full h-16 text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3" />
                    Processing Registration...
                  </>
                ) : (
                  <>
                    Complete Registration
                    <Check className="ml-3 h-5 w-5" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Professional Footer */}
      <div className="px-6 pb-8 text-center">
        <div className="mx-auto max-w-md p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-600 leading-relaxed">
            By registering, you agree to LINKA's{" "}
            <a href="#" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Privacy Policy
            </a>
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
            <Shield className="h-3 w-3" />
            <span>Your data is encrypted and secure</span>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} businessName={formData.businessName} />

      {/* Confetti Animation */}
      {showSuccess && <Confetti />}
    </div>
  )
}
