export function calculateForecastDate(
  current: number,
  target: number,
  transactions: { amount: number; type: string; date: string }[],
): string | null {
  if (current >= target) return null

  // Calculate rolling average of deposits over last 90 days
  const now = new Date()
  const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)

  const recentDeposits = transactions.filter((t) => t.type === "deposit" && new Date(t.date) >= ninetyDaysAgo)

  if (recentDeposits.length === 0) return null

  const totalDeposits = recentDeposits.reduce((sum, t) => sum + t.amount, 0)
  const avgMonthlyContribution = (totalDeposits / 90) * 30

  if (avgMonthlyContribution <= 0) return null

  const remaining = target - current
  const monthsToComplete = remaining / avgMonthlyContribution

  const forecastDate = new Date(now.getTime() + monthsToComplete * 30 * 24 * 60 * 60 * 1000)

  return forecastDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}
