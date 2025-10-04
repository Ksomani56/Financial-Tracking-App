"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react"

export type NotificationType = "deadline" | "completed" | "reminder" | "info"

export interface AppNotification {
  id: string
  type: NotificationType
  title: string
  message: string
  createdAt: string
  read: boolean
}

interface NotificationsContextType {
  notifications: AppNotification[]
  markRead: (id: string, read?: boolean) => void
  remove: (id: string) => void
  push: (n: Omit<AppNotification, "id" | "createdAt" | "read"> & { read?: boolean }) => void
  clear: () => void
}

const STORAGE_KEY = "financial-tracker:notifications"

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const loaded = useRef(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setNotifications(JSON.parse(raw))
    } catch {
      // ignore
    }
    loaded.current = true
  }, [])

  useEffect(() => {
    if (!loaded.current) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications))
    } catch {
      // ignore
    }
  }, [notifications])

  const markRead = useCallback((id: string, read: boolean = true) => {
    setNotifications((list) => list.map((n) => (n.id === id ? { ...n, read } : n)))
  }, [])

  const remove = useCallback((id: string) => {
    setNotifications((list) => list.filter((n) => n.id !== id))
  }, [])

  const push = useCallback(
    (n: Omit<AppNotification, "id" | "createdAt" | "read"> & { read?: boolean }) => {
      const id = `n_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
      const createdAt = new Date().toISOString()
      const next: AppNotification = { id, createdAt, read: n.read ?? false, ...n }
      setNotifications((list) => [next, ...list])
    },
    [],
  )

  const clear = useCallback(() => setNotifications([]), [])

  const value = useMemo<NotificationsContextType>(
    () => ({ notifications, markRead, remove, push, clear }),
    [notifications, markRead, remove, push, clear],
  )

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext)
  if (!ctx) throw new Error("useNotifications must be used within NotificationsProvider")
  return ctx
}


