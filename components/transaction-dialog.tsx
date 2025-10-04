"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useGoals } from "@/lib/goals-context"

interface TransactionDialogProps {
  goalId: number
  goalTitle: string
}

export function TransactionDialog({ goalId, goalTitle }: TransactionDialogProps) {
  const { addTransaction } = useGoals()
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [type, setType] = useState<"deposit" | "withdrawal">("deposit")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const amountNum = Number.parseFloat(amount)
    if (amountNum > 0) {
      try {
        await addTransaction(goalId, amountNum, type, note)
        setAmount("")
        setNote("")
        setOpen(false)
      } catch (error) {
        console.error("Failed to add transaction:", error)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full bg-transparent">
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>Add a deposit or withdrawal to {goalTitle}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Button
              type="button"
              variant={type === "deposit" ? "default" : "outline"}
              className="flex-1"
              onClick={() => setType("deposit")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Deposit
            </Button>
            <Button
              type="button"
              variant={type === "withdrawal" ? "default" : "outline"}
              className="flex-1"
              onClick={() => setType("withdrawal")}
            >
              <Minus className="mr-2 h-4 w-4" />
              Withdrawal
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Note (optional)</Label>
            <Textarea
              id="note"
              placeholder="Add a note about this transaction..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full">
            Add {type === "deposit" ? "Deposit" : "Withdrawal"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
