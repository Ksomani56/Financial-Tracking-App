import { Button } from "@/components/ui/button"
import { Plus, Bell, Settings } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { NewGoalDialog } from "@/components/new-goal-dialog"

export function DashboardHeader() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Financial Goals</h1>
        <p className="mt-2 text-lg text-muted-foreground">Track your journey to financial freedom</p>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Link href="/notifications" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Link>
        </Button>
        <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Link href="/settings" aria-label="Settings">
            <Settings className="h-5 w-5" />
          </Link>
        </Button>
        <NewGoalDialog />
      </div>
    </header>
  )
}
