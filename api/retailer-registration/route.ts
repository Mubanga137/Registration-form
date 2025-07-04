import { type NextRequest, NextResponse } from "next/server"

// Validation schemas
const businessTypeSchema = ["products", "services", "both"]

const validateCategoryData = (data: any) => {
  const errors: string[] = []

  // Validate business type
  if (!data.businessType || !businessTypeSchema.includes(data.businessType)) {
    errors.push("Invalid business type")
  }

  // Validate categories
  if (!data.selectedCategories || !Array.isArray(data.selectedCategories) || data.selectedCategories.length === 0) {
    errors.push("At least one category must be selected")
  }

  // Validate "both" selection has mixed categories
  if (data.businessType === "both") {
    const hasProducts = data.categoryDetails.some((cat: any) => cat.type === "product")
    const hasServices = data.categoryDetails.some((cat: any) => cat.type === "service")

    if (!hasProducts || !hasServices) {
      errors.push('When selecting "Both", you must choose categories from both products and services')
    }
  }

  return errors
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate category data
    const categoryErrors = validateCategoryData(data.businessCategories)
    if (categoryErrors.length > 0) {
      return NextResponse.json({ error: "Validation failed", details: categoryErrors }, { status: 400 })
    }

    // Structure data for database storage
    const retailerData = {
      businessName: data.businessName,
      businessEmail: data.businessEmail,
      businessDescription: data.businessDescription,
      phoneNumber: data.phoneNumber,
      address: {
        street: data.streetAddress,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
      },
      businessCategories: {
        type: data.businessCategories.type,
        categories: data.businessCategories.categories,
        details: data.businessCategories.details,
      },
      // Analytics-friendly structure
      analytics: {
        businessType: data.businessCategories.type,
        primaryCategories: data.businessCategories.categories,
        categoryCount: data.businessCategories.categories.length,
        hasProducts: data.businessCategories.details.some((cat: any) => cat.type === "product"),
        hasServices: data.businessCategories.details.some((cat: any) => cat.type === "service"),
        registrationDate: new Date().toISOString(),
      },
      createdAt: new Date().toISOString(),
      status: "pending_verification",
    }

    // Here you would save to your database
    console.log("Retailer registration data:", retailerData)

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Registration submitted successfully",
      retailerId: "temp_id_" + Date.now(), // Replace with actual ID from database
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
