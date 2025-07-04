"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Star, Sparkles, ArrowRight, Mail, Calendar, Users, TrendingUp, X } from "lucide-react"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  businessName: string
}

export function SuccessModal({ isOpen, onClose, businessName }: SuccessModalProps) {
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    if (isOpen) {
      const timer1 = setTimeout(() => setAnimationStep(1), 300)
      const timer2 = setTimeout(() => setAnimationStep(2), 800)
      const timer3 = setTimeout(() => setAnimationStep(3), 1300)
      const timer4 = setTimeout(() => setAnimationStep(4), 1800)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
        clearTimeout(timer4)
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <Card className="relative w-full max-w-md border-0 shadow-2xl rounded-3xl bg-white overflow-hidden animate-in zoom-in-95 duration-500">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 h-8 w-8 p-0 rounded-full hover:bg-slate-100"
        >
          <X className="h-4 w-4" />
        </Button>

        <CardContent className="p-0">
          {/* Header Section */}
          <div className="relative bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 px-8 pt-12 pb-8 text-center overflow-hidden">
            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-4 left-4 animate-bounce delay-100">
                <Star className="h-4 w-4 text-white/60" />
              </div>
              <div className="absolute top-8 right-8 animate-bounce delay-300">
                <Sparkles className="h-5 w-5 text-white/60" />
              </div>
              <div className="absolute bottom-4 left-8 animate-bounce delay-500">
                <Star className="h-3 w-3 text-white/60" />
              </div>
              <div className="absolute bottom-8 right-4 animate-bounce delay-700">
                <Sparkles className="h-4 w-4 text-white/60" />
              </div>
            </div>

            {/* Success Icon */}
            <div className="relative mb-6">
              <div
                className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-700 ${
                  animationStep >= 1 ? "scale-100 rotate-0" : "scale-0 rotate-180"
                }`}
              >
                <CheckCircle className="h-12 w-12 text-emerald-500" />
              </div>

              {/* Pulse Rings */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${animationStep >= 2 ? "opacity-100" : "opacity-0"}`}
              >
                <div className="absolute h-20 w-20 rounded-full bg-white/20 animate-ping" />
                <div className="absolute h-24 w-24 rounded-full bg-white/10 animate-ping animation-delay-200" />
              </div>
            </div>

            {/* Success Message */}
            <div
              className={`transition-all duration-500 ${animationStep >= 1 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            >
              <h2 className="text-2xl font-bold text-white mb-2">🎉 Welcome to LINKA!</h2>
              <p className="text-white/90 font-medium">
                {businessName ? `${businessName} has been` : "Your business has been"} successfully registered
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="px-8 py-8">
            {/* What's Next */}
            <div
              className={`mb-8 transition-all duration-500 delay-300 ${animationStep >= 2 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            >
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
                What happens next?
              </h3>

              <div className="space-y-4">
                <div
                  className={`flex items-start gap-3 transition-all duration-300 ${animationStep >= 3 ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
                    <Mail className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">Email Verification</p>
                    <p className="text-xs text-slate-600">Check your inbox for a verification email</p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-3 transition-all duration-300 delay-100 ${animationStep >= 3 ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 flex-shrink-0">
                    <Calendar className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">Account Review</p>
                    <p className="text-xs text-slate-600">We'll review your documents within 24-48 hours</p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-3 transition-all duration-300 delay-200 ${animationStep >= 3 ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 flex-shrink-0">
                    <Users className="h-4 w-4 text-violet-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">Start Selling</p>
                    <p className="text-xs text-slate-600">Begin adding products and connecting with customers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className={`space-y-3 transition-all duration-500 delay-500 ${animationStep >= 4 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            >
              <Button
                className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-2xl font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-200"
                onClick={() => {
                  // Navigate to dashboard or next step
                  console.log("Navigate to dashboard")
                  onClose()
                }}
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                className="w-full h-12 rounded-2xl font-semibold border-slate-200 hover:bg-slate-50 transition-all duration-200 bg-transparent"
                onClick={onClose}
              >
                I'll do this later
              </Button>
            </div>

            {/* Footer Message */}
            <div
              className={`mt-6 text-center transition-all duration-500 delay-700 ${animationStep >= 4 ? "opacity-100" : "opacity-0"}`}
            >
              <p className="text-xs text-slate-500">Need help? Contact our support team anytime</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
