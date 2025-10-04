"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { useNotifications } from "@/lib/notifications-context"
import { getDb } from "@/lib/firebase"
// Firestore imports are kept type-only to avoid hard dependency before install
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { QuerySnapshot, DocumentData } from "firebase/firestore"

export interface Transaction {
  id: string
  amount: number
  type: "deposit" | "withdrawal"
  date: string
  note?: string
}

export interface Goal {
  id: number
  title: string
  target: number
  current: number
  deadline: string
  category: string
  color: string
  priority: number
  transactions: Transaction[]
  createdAt: string
}

interface GoalsContextType {
  goals: Goal[]
  addGoal: (goal: Omit<Goal, "id" | "current" | "createdAt" | "transactions">) => void
  addTransaction: (goalId: number, amount: number, type: "deposit" | "withdrawal", note?: string) => void
  getTopUrgentGoals: () => Goal[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  categoryFilter: string
  setCategoryFilter: (category: string) => void
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined)

const initialGoals: Goal[] = []

export function GoalsProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>(initialGoals)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const { push } = useNotifications()

  useEffect(() => {
    let unsub: (() => void) | undefined
    ;(async () => {
      try {
        const db = await getDb()
        if (!db) {
          console.warn("Firebase not initialized - using empty goals")
          return
        }
        const { collection, onSnapshot, orderBy, query } = await import("firebase/firestore")
        const q = query(collection(db, "goals"), orderBy("createdAt", "desc"))
        unsub = onSnapshot(q, (snap: QuerySnapshot<DocumentData>) => {
          console.log("Firestore snapshot:", snap.docs.length, "goals")
          const loaded: Goal[] = snap.docs.map((d) => {
            const data = d.data() as any
            return {
              id: Number(data.id ?? 0),
              title: data.title,
              target: data.target,
              current: data.current ?? 0,
              deadline: data.deadline,
              category: data.category,
              color: data.color ?? "primary",
              priority: data.priority ?? 3,
              createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
              transactions: (data.transactions ?? []).map((t: any) => ({
                id: t.id,
                amount: t.amount,
                type: t.type,
                date: t.date,
                note: t.note,
              })),
            }
          })
          setGoals(loaded)
        }, (error) => {
          console.error("Firestore error:", error)
        })
      } catch (error) {
        console.error("Firebase connection error:", error)
      }
    })()
    return () => {
      if (unsub) unsub()
    }
  }, [])

  const addGoal: GoalsContextType["addGoal"] = async (goalInput) => {
    try {
      const db = await getDb()
      if (!db) {
        console.error("Firebase not initialized - cannot add goal")
        return
      }
      const { addDoc, collection, serverTimestamp } = await import("firebase/firestore")
      const next = {
        id: Date.now(),
        title: goalInput.title,
        target: goalInput.target,
        current: 0,
        deadline: goalInput.deadline,
        category: goalInput.category,
        color: goalInput.color ?? "primary",
        priority: goalInput.priority,
        transactions: [],
        createdAt: serverTimestamp(),
      }
      console.log("Adding goal to Firestore:", next)
      await addDoc(collection(db, "goals"), next)
      push({ type: "info", title: "New goal added", message: goalInput.title })
    } catch (error) {
      console.error("Error adding goal:", error)
    }
  }

  const addTransaction = (goalId: number, amount: number, type: "deposit" | "withdrawal", note?: string) => {
    const tx: Transaction = { id: `t${Date.now()}`, amount, type, date: new Date().toISOString(), note }
    setGoals((prev) =>
      prev.map((g) =>
        g.id === goalId
          ? {
              ...g,
              current: Math.max(0, Math.min(type === "deposit" ? g.current + amount : g.current - amount, g.target)),
              transactions: [...g.transactions, tx],
            }
          : g,
      ),
    )
  }

  const calculateUrgency = (goal: Goal): number => {
    const remaining = goal.target - goal.current
    const normalizedRemaining = remaining / goal.target

    const now = new Date().getTime()
    const deadline = new Date(goal.deadline).getTime()
    const timeLeft = Math.max(0, deadline - now)
    const totalTime = deadline - new Date(goal.createdAt).getTime()
    const normalizedTimeLeft = timeLeft / totalTime

    const priorityScore = 1 / goal.priority

    // Weights from PRD
    const w1 = 0.4 // remaining amount weight
    const w2 = 0.4 // time left weight
    const w3 = 0.2 // priority weight

    return w1 * normalizedRemaining + w2 * (1 - normalizedTimeLeft) + w3 * priorityScore
  }

  const getTopUrgentGoals = (): Goal[] => {
    return [...goals].sort((a, b) => calculateUrgency(b) - calculateUrgency(a)).slice(0, 3)
  }

  const value = useMemo<GoalsContextType>(
    () => ({
      goals,
      addGoal,
      addTransaction,
      getTopUrgentGoals,
      searchQuery,
      setSearchQuery,
      categoryFilter,
      setCategoryFilter,
    }),
    [goals, searchQuery, categoryFilter],
  )

  return (
    <GoalsContext.Provider
      value={value}
    >
      {children}
    </GoalsContext.Provider>
  )
}

export function useGoals() {
  const context = useContext(GoalsContext)
  if (context === undefined) {
    throw new Error("useGoals must be used within a GoalsProvider")
  }
  return context
}
