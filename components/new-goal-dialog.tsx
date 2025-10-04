"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGoals } from "@/lib/goals-context"

export function NewGoalDialog() {
  const { addGoal } = useGoals()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [target, setTarget] = useState("")
  const [deadline, setDeadline] = useState("")
  const [category, setCategory] = useState("General")
  const [priority, setPriority] = useState("3")

  const valid = title.trim().length > 0 && Number(target) > 0 && deadline

  const handleSubmit = () => {
    if (!valid) return
    addGoal({
      title: title.trim(),
      target: Number(target),
      deadline,
      category,
      priority: Number(priority),
      color: "primary",
    })
    setOpen(false)
    setTitle("")
    setTarget("")
    setDeadline("")
    setCategory("General")
    setPriority("3")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">New Goal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Goal</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Emergency Fund" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="target">Target Amount</Label>
            <Input id="target" type="number" min="0" step="0.01" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="0.00" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="deadline">Deadline</Label>
            <Input id="deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Category</Label>
            <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
          </div>
          <div className="grid gap-2">
            <Label>Priority</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((p) => (
                  <SelectItem key={p} value={String(p)}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button disabled={!valid} onClick={handleSubmit} className="w-full">
            Create Goal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


