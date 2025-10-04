"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useGoals } from "@/lib/goals-context"
import { calculateForecastDate } from "@/lib/forecasting"
import { formatCurrencyINR } from "@/lib/utils"

export function UrgentGoalsCarousel() {
  const { getTopUrgentGoals } = useGoals()
  const formatCurrency = formatCurrencyINR
  const urgentGoals = getTopUrgentGoals()
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % urgentGoals.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + urgentGoals.length) % urgentGoals.length)
  }

  if (urgentGoals.length === 0) {
    return null
  }

  const currentGoal = urgentGoals[currentIndex]
  const progress = (currentGoal.current / currentGoal.target) * 100
  const daysLeft = Math.ceil((new Date(currentGoal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  const forecastDate = calculateForecastDate(currentGoal.current, currentGoal.target, currentGoal.transactions)

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center gap-2">
        <AlertCircle className="h-5 w-5 text-accent" />
        <h2 className="font-serif text-2xl font-bold text-foreground">Top Priority Goals</h2>
      </div>

      <div className="glass-card relative overflow-hidden rounded-2xl p-8">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/10 to-transparent" />

        <div className="relative">
          <div className="mb-2 flex items-center justify-between">
            <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent-foreground">
              Priority #{currentGoal.priority}
            </span>
            <span className="text-sm text-muted-foreground">{currentGoal.category}</span>
          </div>

          <h3 className="mb-4 font-serif text-3xl font-bold text-foreground">{currentGoal.title}</h3>

          <div className="mb-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-sm text-muted-foreground">Progress</p>
              <div className="mb-2">
                <Progress value={progress} className="h-3 transition-all duration-500 ease-out" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl font-bold text-primary">
                  {formatCurrency(currentGoal.current)}
                </span>
                <span className="text-sm text-muted-foreground">of {formatCurrency(currentGoal.target)}</span>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm text-muted-foreground">Time Remaining</p>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl font-bold text-secondary">{daysLeft}</span>
                <span className="text-sm text-muted-foreground">days left</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Target:{" "}
                {new Date(currentGoal.deadline).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              {forecastDate && <p className="mt-2 text-sm text-secondary">Forecast: {forecastDate}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {urgentGoals.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevSlide}
                className="text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextSlide}
                className="text-muted-foreground hover:text-foreground"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
