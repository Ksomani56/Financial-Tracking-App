"use client"

import { GoalCard } from "@/components/goal-card"
import { useGoals } from "@/lib/goals-context"
import { SearchFilter } from "@/components/search-filter"

export function GoalsGrid() {
  const { goals, searchQuery, categoryFilter } = useGoals()

  const filteredGoals = goals.filter((goal) => {
    const matchesSearch =
      goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      goal.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || goal.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div>
      <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">All Goals</h2>
      <SearchFilter />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGoals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
      {filteredGoals.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">No goals found matching your filters.</div>
      )}
    </div>
  )
}
