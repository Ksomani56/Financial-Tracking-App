"use client"

import { TrendingUp, Target, IndianRupee, Calendar } from "lucide-react"
import { useGoals } from "@/lib/goals-context"
import { formatCurrencyINR } from "@/lib/utils"

export function StatsOverview() {
  const { goals } = useGoals()
  const formatCurrency = formatCurrencyINR

  const totalSaved = goals.reduce((sum, goal) => sum + goal.current, 0)
  const activeGoals = goals.length
  const urgentGoals = goals.filter((goal) => {
    const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return daysLeft < 90 && goal.current < goal.target
  }).length
  const avgCompletion = goals.reduce((sum, goal) => sum + (goal.current / goal.target) * 100, 0) / goals.length
  const avgTimeline = Math.ceil(
    goals.reduce((sum, goal) => {
      const months = Math.ceil(
        (new Date(goal.deadline).getTime() - new Date(goal.createdAt).getTime()) / (1000 * 60 * 60 * 24 * 30),
      )
      return sum + months
    }, 0) / goals.length,
  )

  const stats = [
    {
      label: "Total Saved",
      value: `${formatCurrency(totalSaved)}`,
      change: "+12.5%",
      icon: IndianRupee,
      color: "text-primary",
    },
    {
      label: "Active Goals",
      value: activeGoals.toString(),
      change: urgentGoals > 0 ? `${urgentGoals} urgent` : "On track",
      icon: Target,
      color: "text-secondary",
    },
    {
      label: "Completion Rate",
      value: `${avgCompletion.toFixed(0)}%`,
      change: "+5.2%",
      icon: TrendingUp,
      color: "text-accent",
    },
    {
      label: "Avg. Timeline",
      value: `${avgTimeline} mo`,
      change: "On track",
      icon: Calendar,
      color: "text-chart-5",
    },
  ]

  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="glass-card rounded-xl p-6 transition-all hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-2 font-serif text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.change}</p>
            </div>
            <div className={`rounded-lg bg-muted/50 p-3 ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
