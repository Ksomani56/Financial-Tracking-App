import { DashboardHeader } from "@/components/dashboard-header"
import { UrgentGoalsCarousel } from "@/components/urgent-goals-carousel"
import { GoalsGrid } from "@/components/goals-grid"
import { StatsOverview } from "@/components/stats-overview"

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <DashboardHeader />
        <StatsOverview />
        <UrgentGoalsCarousel />
        <GoalsGrid />
      </div>
    </main>
  )
}
