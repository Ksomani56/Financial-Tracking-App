import { Progress } from "@/components/ui/progress"
import { Calendar, TrendingUp } from "lucide-react"
import { TransactionDialog } from "@/components/transaction-dialog"
import { calculateForecastDate } from "@/lib/forecasting"
import { formatCurrencyINR } from "@/lib/utils"
import type { Goal } from "@/lib/goals-context"

interface GoalCardProps {
  goal: Goal
}

export function GoalCard({ goal }: GoalCardProps) {
  const formatCurrency = formatCurrencyINR
  const progress = (goal.current / goal.target) * 100
  const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  const forecastDate = calculateForecastDate(goal.current, goal.target, goal.transactions)

  return (
    <div className="glass-card group rounded-xl p-6 transition-all hover:scale-[1.02] hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="mb-1 font-serif text-xl font-bold text-foreground">{goal.title}</h3>
          <p className="text-sm text-muted-foreground">{goal.category}</p>
        </div>
        <div className={`rounded-lg bg-${goal.color}/20 p-2`}>
          <TrendingUp className={`h-4 w-4 text-${goal.color}`} />
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="font-serif text-2xl font-bold text-foreground">{formatCurrency(goal.current)}</span>
          <span className="text-sm text-muted-foreground">{formatCurrency(goal.target)}</span>
        </div>
        <Progress value={progress} className="h-2 transition-all duration-500 ease-out" />
        <p className="mt-2 text-sm text-muted-foreground">{progress.toFixed(1)}% complete</p>
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{daysLeft} days remaining</span>
        </div>
        {forecastDate && <div className="text-sm text-secondary">Forecast: {forecastDate}</div>}
      </div>

      <TransactionDialog goalId={goal.id} goalTitle={goal.title} />
    </div>
  )
}
